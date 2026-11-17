import unittest
from gallery_naming import build_name_review, format_segment, load_rules


class FolderNameTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.rules = load_rules()

    def test_root_label_is_title_case(self):
        self.assertEqual(format_segment('', self.rules)[0], 'All Photographs')

    def test_exact_owner_example(self):
        labels, records = build_name_review([
            'accessories',
            'accessories/hp-l1706-17-inch-lcd-colour-monitor-px849a',
            'accessories/hp-l1706-17-inch-lcd-colour-monitor-px849a/serial-cnk7040y04',
        ], self.rules)
        self.assertEqual(labels['accessories'], 'Accessories')
        self.assertEqual(labels['accessories/hp-l1706-17-inch-lcd-colour-monitor-px849a'],
                         'HP L1706 17-inch LCD Colour Monitor PX849A')
        self.assertEqual(labels['accessories/hp-l1706-17-inch-lcd-colour-monitor-px849a/serial-cnk7040y04'],
                         'Serial CNK7040Y04')
        self.assertEqual(len(records), 3)
        self.assertTrue(all(r['owner_approved'] == 'NO' for r in records))

    def test_hardware_and_exception_labels(self):
        examples = {
            'computers/accessories/ibm-model-m-keyboard': 'IBM Model M Keyboard',
            'accessories/eeprom-programmers': 'EEPROM Programmers',
            'consoles/nintendo/nintendo-ds-is-nitro-capture': 'Nintendo DS IS-NITRO-CAPTURE',
            'consoles/sega/mega-drive/model-1': 'Model 1',
            'consoles/sega/mega-cd': 'Mega-CD',
            'projects/project-x0xb0x-1.0 adafruit edition': 'Project x0xb0x 1.0 Adafruit Edition',
            'consoles/sony/playstation-1': 'PlayStation 1',
        }
        for path, expected in examples.items():
            with self.subTest(path=path):
                self.assertEqual(format_segment(path, self.rules)[0], expected)

    def test_unrecognised_technical_codes_are_flagged(self):
        display, review, reason = format_segment('computers/mystery-q41v9', self.rules)
        self.assertEqual(display, 'Mystery Q41V9')
        self.assertTrue(review)
        self.assertIn('technical', reason)
        self.assertEqual(format_segment('consoles/serial-no_serial', self.rules)[0],
                         'Serial not recorded')

    def test_no_path_mutation(self):
        paths = ['consoles', 'consoles/sega', 'consoles/sega/mega-drive']
        labels, _ = build_name_review(paths, self.rules)
        self.assertEqual(set(labels), set(paths))
        self.assertEqual(labels['consoles/sega'], 'Sega')


if __name__ == '__main__':
    unittest.main()
