import unittest

from gallery_keys import public_photo_paths


class PublicGalleryKeysTests(unittest.TestCase):
    def test_unique_names_get_jxl_extension_only(self):
        mapping = public_photo_paths([
            'accessories/minipro/img_0835.jpg', 'nested/a.png', 'elsewhere/screenshot.bmp',
            'projects/yampad/animated.gif'])
        self.assertEqual(mapping['accessories/minipro/img_0835.jpg'],
                         'accessories/minipro/img_0835.jxl')
        self.assertEqual(mapping['nested/a.png'], 'nested/a.jxl')
        self.assertEqual(mapping['elsewhere/screenshot.bmp'], 'elsewhere/screenshot.jxl')
        self.assertEqual(mapping['projects/yampad/animated.gif'],
                         'projects/yampad/animated.gif')

    def test_same_stem_originals_cannot_overwrite_each_other(self):
        keys = ['saturn/IMG_0001.jpg', 'saturn/IMG_0001.png',
                'saturn/IMG_0001.jpeg']
        one = public_photo_paths(keys)
        two = public_photo_paths(list(reversed(keys)))
        self.assertEqual(one, two)
        self.assertEqual(len(set(one.values())), 3)
        self.assertTrue(all(key.startswith('saturn/IMG_0001-') and key.endswith('.jxl')
                            for key in one.values()))
        self.assertTrue(all('.jpg.jxl' not in key for key in one.values()))

    def test_case_insensitive_collisions_are_disambiguated(self):
        results = public_photo_paths(['album/SCAN.JPG', 'album/scan.png'])
        self.assertEqual(len({x.casefold() for x in results.values()}), 2)

    def test_bad_original_paths_are_rejected(self):
        for key in ('/etc/passwd', '../evil.jpg', 'folder//pic.jpg',
                    'folder/x#y.jpg', 'folder/x\0y.jpg', 'folder/x\\y.jpg',
                    'folder/\n.jpg'):
            with self.subTest(key=key), self.assertRaises(ValueError):
                public_photo_paths([key])

    def test_duplicate_original_path_is_rejected(self):
        with self.assertRaises(ValueError):
            public_photo_paths(['a.jpg', 'a.jpg'])


if __name__ == '__main__':
    unittest.main()
