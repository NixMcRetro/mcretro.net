"""Package boundary regressions using the actual reviewed website candidate."""
import hashlib
import importlib.util
import json
from pathlib import Path
import shutil
import tempfile
import unittest

SPEC = importlib.util.spec_from_file_location('vrampage_package', Path(__file__).with_name('vrampage-package.py'))
PACKAGE = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(PACKAGE)


class PackageBoundaryTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.site = self.root / 'site'
        shutil.copytree('homepages/vrampage-md', self.site)
        self.pin = Path('.github/vrampage-release.json')

    def test_approved_package_passes(self):
        self.assertEqual(PACKAGE.verify(self.site, self.pin), 17)

    def test_unknown_rom_is_rejected(self):
        (self.site / 'demo/unapproved-commercial.bin').write_bytes(b'unknown cartridge')
        with self.assertRaisesRegex(ValueError, 'unexpected website files'):
            PACKAGE.verify(self.site, self.pin)

    def test_altered_approved_rom_is_rejected(self):
        manifest = json.loads((self.site / 'cartridges.json').read_text())
        (self.site / manifest['cartridges'][0]['path']).write_bytes(b'changed cartridge')
        with self.assertRaisesRegex(ValueError, 'Cartridge identity mismatch'):
            PACKAGE.verify(self.site, self.pin)

    def test_changed_source_and_self_declared_digest_do_not_override_reviewed_pin(self):
        info_path = self.site / 'build-info.json'
        info = json.loads(info_path.read_text())
        source = self.site / info['source_archive']['path']
        data = source.read_bytes() + b'altered source'
        source.write_bytes(data)
        info['source_archive']['sha256'] = hashlib.sha256(data).hexdigest()
        info_path.write_text(json.dumps(info))
        with self.assertRaisesRegex(ValueError, 'reviewed SHA-256'):
            PACKAGE.verify(self.site, self.pin)

    def test_missing_runtime_is_rejected(self):
        (self.site / 'core/genplus.wasm').unlink()
        with self.assertRaisesRegex(ValueError, 'Missing or unexpected website files'):
            PACKAGE.verify(self.site, self.pin)

    def test_changed_app_and_rewritten_checksums_do_not_override_reviewed_pin(self):
        app = self.site / 'app.js'
        app.write_bytes(app.read_bytes() + b'\n// altered application\n')
        sums = self.site / 'SHA256SUMS.txt'
        lines = [hashlib.sha256(app.read_bytes()).hexdigest() + '  app.js'
                 if line.endswith('  app.js') else line for line in sums.read_text().splitlines()]
        sums.write_text('\n'.join(lines) + '\n')
        with self.assertRaisesRegex(ValueError, 'checksums differ from reviewed pin'):
            PACKAGE.verify(self.site, self.pin)

    def test_symlink_is_rejected(self):
        target = self.site / 'style.css'
        saved = self.root / 'style.css'
        target.rename(saved)
        target.symlink_to(saved)
        with self.assertRaisesRegex(ValueError, 'Symlink'):
            PACKAGE.verify(self.site, self.pin)


if __name__ == '__main__':
    unittest.main(verbosity=2)
