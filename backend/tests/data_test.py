from test_base import *


class DataTest(TestBase):
    def test_import_csv(self):
        # unexisting csv file
        response = self.client.get(
            f'/data/import/csv/{tokens.working_dir}/Datedasd.csv')
        json_data = response.get_json()
        self.assertBasics(response, json_data)
        self.assertFalse(json_data[tokens.success])

        # existing csv file
        response = self.client.get(
            f'/data/import/csv/{tokens.working_dir}/Date.csv')
        json_data = response.get_json()
        self.assertBasics(response, json_data)
        self.assertTrue(json_data[tokens.success])

    def test_export_csv(self):
        # directory does not exist
        response = self.client.get(
            f'/data/export/csv/name/DateExported.csv/path/{tokens.working_dir}/non-existing/wdkjdjkjw')
        json_data = response.get_json()
        self.assertBasics(response, json_data)
        self.assertFalse(json_data[tokens.success])

        # nothing to save
        response = self.client.get(
            f'/data/export/csv/name/DateExported.csv/path/{tokens.working_dir}')
        json_data = response.get_json()
        self.assertBasics(response, json_data)
        self.assertFalse(json_data[tokens.success])

        # save the data
        self.readDataFrame()
        response = self.client.get(
            f'/data/export/csv/name/DateExported.csv/path/{tokens.working_dir}')
        json_data = response.get_json()
        self.assertBasics(response, json_data)
        self.assertTrue(json_data[tokens.success])


if __name__ == '__main__':
    unittest.main()
