import unittest
from test_base import TestBase, tokens


class DataTest(TestBase):
    # * >> Import csv route
    def import_unexisting_csv(self):
        response = self.client.get(
            f'/data/import/csv/{tokens.working_dir}/Datedasd.csv')
        json_data = response.get_json()
        self.assertBasics(response, json_data)
        self.assertFalse(json_data[tokens.success])

    def import_existing_csv(self):
        response = self.client.get(
            f'/data/import/csv/{tokens.working_dir}/Date.csv')
        json_data = response.get_json()
        self.assertBasics(response, json_data)
        self.assertTrue(json_data[tokens.success])

    def test_import_csv(self):
        self.import_unexisting_csv()
        self.import_existing_csv()

    # * >> Export csv route
    def export_csv_directory_does_not_exist(self):
        response = self.client.get(
            f'/data/export/csv/name/DateExported.csv/path/{tokens.working_dir}/non-existing/wdkjdjkjw')
        json_data = response.get_json()
        self.assertBasics(response, json_data)
        self.assertFalse(json_data[tokens.success])

    def export_csv_nothing_to_save(self):
        response = self.client.get(
            f'/data/export/csv/name/DateExported.csv/path/{tokens.working_dir}')
        json_data = response.get_json()
        self.assertBasics(response, json_data)
        self.assertFalse(json_data[tokens.success])

    def export_csv(self):
        self.readDataFrame()
        response = self.client.get(
            f'/data/export/csv/name/DateExported.csv/path/{tokens.working_dir}')
        json_data = response.get_json()
        self.assertBasics(response, json_data)
        self.assertTrue(json_data[tokens.success])

    def test_export_csv(self):
        self.export_csv_directory_does_not_exist()
        self.export_csv_nothing_to_save()
        self.export_csv()


if __name__ == '__main__':
    unittest.main()
