import json
from pathlib import Path
import tempfile
import unittest

from gallery_descriptions import approved_metadata, load_descriptions
from build_mcretro_r2_catalogues import build_photos


class OwnerReviewedDescriptionTests(unittest.TestCase):
    def setUp(self):
        tmp = tempfile.TemporaryDirectory()
        self.addCleanup(tmp.cleanup)
        self.root = Path(tmp.name)
        self.original = self.root / 'original'
        self.converted = self.root / 'converted'
        self.stage = self.root / 'stage'
        self.original.mkdir()
        self.converted.mkdir()
        image = self.original / 'consoles/sega/saturn/IMG_0005.jpg'
        image.parent.mkdir(parents=True)
        image.write_bytes(b'jpeg')
        for sub in ('full', 'thumbs'):
            copy = self.converted / sub / 'consoles/sega/saturn/IMG_0005.jpg.jxl'
            copy.parent.mkdir(parents=True)
            copy.write_bytes(b'\xff\x0a' + b'0' * 20)

    def test_only_approved_descriptions_are_emitted(self):
        rel = 'consoles/sega/saturn/IMG_0005.jpg'
        sidecar = self.stage / 'reviews/photo-descriptions.json'
        sidecar.parent.mkdir(parents=True, exist_ok=True)
        sidecar.write_text(json.dumps({
            'schema_version': 1,
            'photos': {
                rel: {
                    'caption': 'Saturn main board', 'caption_approved': True,
                    'scene_description': 'A console motherboard on a bench',
                    'scene_description_approved': True,
                    'components': ['315-5764', 'BIOS ROM'], 'components_approved': True,
                    'search_terms': ['motherboard', 'service'], 'search_terms_approved': True,
                    'alt': 'Unverified photo contents', 'alt_approved': False,
                    'date_taken': '2014-05-09', 'date_taken_approved': False,
                }
            }
        }), encoding='utf-8')
        reviewed = load_descriptions(sidecar, required=True)
        summary = build_photos(self.original, self.converted, self.stage, descriptions=reviewed)
        self.assertEqual(summary['approved_captions'], 1)
        self.assertEqual(summary['approved_scenes'], 1)
        self.assertEqual(summary['approved_components'], 1)
        self.assertEqual(summary['approved_alt_texts'], 0)
        data = json.loads((self.stage / 'photo-gallery/albums.generated.json').read_text())
        photo = data['photos'][0]
        self.assertEqual(photo['caption'], 'Saturn main board')
        self.assertEqual(photo['components'], ['315-5764', 'BIOS ROM'])
        self.assertEqual(photo['scene_description'], 'A console motherboard on a bench')
        self.assertEqual(photo['search_terms'], ['motherboard', 'service'])
        self.assertEqual(photo['alt'], '')
        self.assertIsNone(photo['date_taken'])
        public_text = json.dumps(photo)
        self.assertNotIn('Unverified photo contents', public_text)
        self.assertNotIn('2014-05-09', public_text)
        self.assertTrue(sidecar.is_file(), 'Review source should be left untouched')

    def test_unapproved_guesses_never_exported(self):
        data = approved_metadata({
            'caption': 'Wrong CPU', 'caption_approved': False,
            'components': ['Wrong 68040'], 'components_approved': False,
            'scene_description': 'Unverified motherboard', 'scene_description_approved': False,
            'search_terms': ['unconfirmed term'], 'search_terms_approved': False,
        })
        self.assertEqual(data['caption'], '')
        self.assertEqual(data['components'], [])
        self.assertEqual(data['scene_description'], '')
        self.assertEqual(data['search_terms'], [])

    def test_bad_approved_content_fails_closed(self):
        with self.assertRaisesRegex(ValueError, 'Approved components'):
            approved_metadata({'components': [''], 'components_approved': True})
        with self.assertRaisesRegex(ValueError, 'Approved alt'):
            approved_metadata({'alt': '', 'alt_approved': True})
        with self.assertRaisesRegex(ValueError, 'date_taken'):
            approved_metadata({'date_taken': 'sometime in 2012', 'date_taken_approved': True})

    def test_bad_photo_key_and_absent_explicit_sidecar_rejected(self):
        source = self.root / 'details.json'
        source.write_text(json.dumps({'schema_version':1,'photos':{'../private.jpg':{}}}))
        with self.assertRaises(ValueError):
            load_descriptions(source)
        with self.assertRaisesRegex(ValueError, 'not found'):
            load_descriptions(self.root / 'not-here.json', required=True)


if __name__ == '__main__':
    unittest.main()
