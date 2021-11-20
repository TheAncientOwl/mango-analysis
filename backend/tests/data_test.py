import unittest

import pandas

import server_data as sv
import server
app = server.app

working_dir = 'C:/Users/TheAncientOwl/Code/data-analysis-tool/backend'
success = 'success'
message = 'message'
app_json = 'application/json'


class DataTest(unittest.TestCase):
    def test_import_csv(self):
        tester = app.test_client(self)

        # unexisting csv file
        response = tester.get(
            f'/data/import/csv/{working_dir}/Datedasd.csv')
        json_data = response.get_json()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content_type, app_json)
        self.assertTrue(success in json_data)
        self.assertTrue(message in json_data)
        self.assertFalse(json_data[success])

        # existing csv file
        response = tester.get(
            f'/data/import/csv/{working_dir}/Date.csv')
        json_data = response.get_json()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content_type, app_json)
        self.assertTrue(success in json_data)
        self.assertTrue(message in json_data)
        self.assertTrue(json_data[success])

    def test_export_csv(self):
        tester = app.test_client(self)

        # directory does not exist
        response = tester.get(
            f'/data/export/csv/name/DateExported.csv/path/{working_dir}/non-existing/wdkjdjkjw')
        json_data = response.get_json()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content_type, app_json)
        self.assertTrue(success in json_data)
        self.assertTrue(message in json_data)
        self.assertFalse(json_data[success])

        # nothing to save
        response = tester.get(
            f'/data/export/csv/name/DateExported.csv/path/{working_dir}')
        json_data = response.get_json()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content_type, app_json)
        self.assertTrue(success in json_data)
        self.assertTrue(message in json_data)
        self.assertFalse(json_data[success])

        # save the data
        sv.dataFrame = pandas.read_csv(f'{working_dir}/Date.csv')
        response = tester.get(
            f'/data/export/csv/name/DateExported.csv/path/{working_dir}')
        json_data = response.get_json()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content_type, app_json)
        self.assertTrue(success in json_data)
        self.assertTrue(message in json_data)
        self.assertTrue(json_data[success])


if __name__ == '__main__':
    unittest.main()
