import unittest

from werkzeug.wrappers import response
from test_base import TestBase, tokens
import server_data as sv


class DataTest(TestBase):
    # * -----------------------------------------------------------------------------------------------------
    # * >> Import csv route
    # * -----------------------------------------------------------------------------------------------------
    def test_import_unexisting_csv(self):
        response = self.client.get(
            f'/data/import/csv/{tokens.working_dir}/Datedasd.csv')
        json_data = response.get_json()

        self.assertBasics(response, json_data)
        self.assertFalse(json_data[tokens.success])

    def test_import_existing_csv(self):
        response = self.client.get(
            f'/data/import/csv/{tokens.working_dir}/Date.csv')
        json_data = response.get_json()

        self.assertBasics(response, json_data)
        self.assertTrue(json_data[tokens.success])

    # * -----------------------------------------------------------------------------------------------------
    # * >> Export csv route
    # * -----------------------------------------------------------------------------------------------------
    def test_export_csv_directory_does_not_exist(self):
        response = self.client.get(
            f'/data/export/csv/name/DateExported.csv/path/{tokens.working_dir}/non-existing/wdkjdjkjw')
        json_data = response.get_json()

        self.assertBasics(response, json_data)
        self.assertFalse(json_data[tokens.success])

    def test_export_csv_nothing_to_save(self):
        response = self.client.get(
            f'/data/export/csv/name/DateExported.csv/path/{tokens.working_dir}')
        json_data = response.get_json()

        self.assertBasics(response, json_data)
        self.assertFalse(json_data[tokens.success])

    def test_export_csv(self):
        self.readDataFrame()
        response = self.client.get(
            f'/data/export/csv/name/DateExported.csv/path/{tokens.working_dir}')
        json_data = response.get_json()

        self.assertBasics(response, json_data)
        self.assertTrue(json_data[tokens.success])

    # * -----------------------------------------------------------------------------------------------------
    # * >> Get rows between route
    # * -----------------------------------------------------------------------------------------------------
    def test_get_rows_range_not_ints(self):
        self.readDataFrame()
        response = self.client.get('/data/rows-between/dasd/fr')
        json_data = response.get_json()

        self.assertBasics(response, json_data)
        self.assertFalse(json_data[tokens.success])

    def test_get_rows_invalid_range(self):
        self.readDataFrame()
        response = self.client.get('/data/rows-between/10/5')
        json_data = response.get_json()

        self.assertBasics(response, json_data)
        self.assertFalse(json_data[tokens.success])

    def test_get_rows_neative_start(self):
        self.readDataFrame()
        response = self.client.get('/data/rows-between/-10/5')
        json_data = response.get_json()

        self.assertBasics(response, json_data)
        self.assertFalse(json_data[tokens.success])

    def test_get_rows_end_out_of_bounds(self):
        self.readDataFrame()
        response = self.client.get(
            f'/data/rows-between/0/{sv.dataFrame.shape[0] + 1000}')
        json_data = response.get_json()

        self.assertBasics(response, json_data)
        self.assertFalse(json_data[tokens.success])

    def test_get_rows(self):
        self.readDataFrame()
        response = self.client.get('/data/rows-between/0/10')
        json_data = response.get_json()

        self.assertBasics(response, json_data)
        self.assertTrue(json_data[tokens.success])
        self.assertTrue('dataframe' in json_data,
                        "Missing 'dataframe' key in json response.")

    # * -----------------------------------------------------------------------------------------------------
    # * >> Drop columns by label
    # * -----------------------------------------------------------------------------------------------------
    def test_drop_columns_by_label(self):
        self.readDataFrame()

        dropLabels = ["EA", "EAM", "CP", "IDK", "CP"]
        response = self.client.post('/data/drop/columns', json={
            'labels': dropLabels
        })
        json_data = response.get_json()

        self.assertBasics(response, json_data)
        self.assertTrue(json_data[tokens.success])

        remainingDropLabels = set()
        colLabels = sv.dataFrame.columns
        for label in dropLabels:
            if label in colLabels:
                remainingDropLabels.add(label)

        self.assertTrue(len(remainingDropLabels) == 0,
                        f"Some labels were not deleted... '{str(remainingDropLabels)}'")

    # * -----------------------------------------------------------------------------------------------------
    # * >> Drop rows by index
    # * -----------------------------------------------------------------------------------------------------
    def test_drop_rows_by_index(self):
        self.readDataFrame()
        initialRowsNum = sv.dataFrame.shape[0]

        dropIndex = [0, 1, 2, 6999, -100, 500, 30]
        response = self.client.post('/data/drop/rows', json={
            'index': dropIndex
        })
        json_data = response.get_json()

        self.assertBasics(response, json_data)
        self.assertTrue(json_data[tokens.success])
        self.assertTrue('invalidIndexCount' in json_data)
        self.assertTrue(json_data['invalidIndexCount'] == 3,
                        'Wrong count of invalid index detected.')
        self.assertTrue(sv.dataFrame.shape[0] + 4 == initialRowsNum,
                        'Not all rows were dropped.')

    # * -----------------------------------------------------------------------------------------------------
    # * >> Transpose
    # * -----------------------------------------------------------------------------------------------------
    def test_transpose(self):
        self.readDataFrame()
        initialRowsNum = sv.dataFrame.shape[0]
        initialColsNum = sv.dataFrame.shape[1]

        response = self.client.get('/data/transpose')
        json_data = response.get_json()

        self.assertBasics(response, json_data)
        self.assertTrue(json_data[tokens.success])
        self.assertTrue(sv.dataFrame.shape[0] == initialColsNum and
                        sv.dataFrame.shape[1] == initialRowsNum,
                        'Dataframe not transposed')


if __name__ == '__main__':
    unittest.main()
