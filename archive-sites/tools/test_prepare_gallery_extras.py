import hashlib
from pathlib import Path
import tempfile
import unittest

from prepare_gallery_extras import assert_directories, discover, prepare_gif


class GalleryExtrasTests(unittest.TestCase):
    def setUp(self):
        temp = tempfile.TemporaryDirectory()
        self.addCleanup(temp.cleanup)
        self.root = Path(temp.name)
        self.original = self.root / 'originals'
        self.converted = self.root / 'converted'
        self.original.mkdir()
        self.converted.mkdir()

    def test_discovery_and_gif_copy_preserve_original_bytes(self):
        anim = self.original/'projects/project-yampad/animated.gif'
        anim.parent.mkdir(parents=True)
        anim.write_bytes(b'GIF89a' + b'1234567890abcdef')
        ds = self.original/'consoles/nds/capture.bmp'
        ds.parent.mkdir(parents=True)
        ds.write_bytes(b'BM' + b'0' * 30)
        (self.original / '.DS_Store').write_bytes(b'0')
        (self.original / 'link.gif').symlink_to(anim)
        assert_directories(self.original, self.converted)
        discovered = list(discover(self.original))
        self.assertEqual({p.suffix for p, _ in discovered}, {'.bmp', '.gif'})
        before = hashlib.sha256(anim.read_bytes()).digest()
        report = prepare_gif(anim, 'projects/project-yampad/animated.gif', self.converted)
        self.assertIn('copied', report)
        copied = self.converted/'full/projects/project-yampad/animated.gif'
        self.assertEqual(copied.read_bytes(), anim.read_bytes())
        self.assertEqual(hashlib.sha256(anim.read_bytes()).digest(), before)
        self.assertIn('already copied', prepare_gif(anim, 'projects/project-yampad/animated.gif', self.converted))

    def test_nested_output_rejected(self):
        with self.assertRaises(ValueError):
            assert_directories(self.original, self.original/'converted')


if __name__ == '__main__':
    unittest.main()
