"""Exercise live-byte and MIME checks against a real local HTTP server."""
from contextlib import redirect_stdout
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import importlib.util
import io
from pathlib import Path
import shutil
import tempfile
import threading
import unittest

SPEC = importlib.util.spec_from_file_location('vrampage_live', Path(__file__).with_name('vrampage-live.py'))
LIVE = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(LIVE)


class LiveChecks(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.source = Path('homepages/vrampage-md')
        self.hosted = Path(self.temp.name) / 'published'
        shutil.copytree(self.source, self.hosted)

    def check(self, wrong_mime=False):
        class Handler(SimpleHTTPRequestHandler):
            def log_message(self, *_args):
                pass

            def guess_type(self, path):
                return 'text/plain' if wrong_mime and path.endswith('.wasm') else super().guess_type(path)

        with ThreadingHTTPServer(('127.0.0.1', 0), partial(Handler, directory=self.hosted)) as server:
            threading.Thread(target=server.serve_forever, daemon=True).start()
            try:
                with redirect_stdout(io.StringIO()):
                    LIVE.verify(f'http://127.0.0.1:{server.server_port}', self.source)
            finally:
                server.shutdown()

    def test_exact_published_package_passes(self):
        self.check()

    def test_stale_runtime_bytes_fail(self):
        (self.hosted / 'app.js').write_bytes(b'previous app')
        with self.assertRaisesRegex(ValueError, 'Live file differs'):
            self.check()

    def test_wrong_wasm_mime_type_fails(self):
        with self.assertRaisesRegex(ValueError, 'MIME type'):
            self.check(wrong_mime=True)


if __name__ == '__main__':
    unittest.main(verbosity=2)
