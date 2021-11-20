import unittest

import server as sv


class DataTest(unittest.TestCase):
    def test_import_csv(self):
        tester = sv.app.test_client(self)

        # test unexisting csv file
        response = tester.get(
            "/data/import/csv/C:/Users/TheAncientOwl/Code/data-analysis-tool/backend/Datedasd.csv")
        json_data = response.get_json()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content_type, "application/json")
        self.assertTrue('success' in json_data)
        self.assertTrue('message' in json_data)
        self.assertEqual(False, json_data['success'])

        # test existing csv file
        response = tester.get(
            "/data/import/csv/C:/Users/TheAncientOwl/Code/data-analysis-tool/backend/Date.csv")
        json_data = response.get_json()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content_type, "application/json")
        self.assertTrue('success' in json_data)
        self.assertTrue('message' in json_data)
        self.assertEqual(True, json_data['success'])


if __name__ == "__main__":
    unittest.main()
