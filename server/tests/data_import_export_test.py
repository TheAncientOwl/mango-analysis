from test_base import TestBase, tokens


class DataImportExportTest(TestBase):
    # -------------------------------------------------------------------------------------------------------
    def test_import_unexisting_csv(self):
        response = self.client.get(
            f'/data/import/csv/{tokens.working_dir}/Datedasd.csv')

        self.assertStatusCodeCorrect(response, 404)
        self.assertContentTypeJSON(response)
        self.assertHasMessage(response)

    # -------------------------------------------------------------------------------------------------------
    def test_import_existing_csv(self):
        response = self.client.get(
            f'/data/import/csv/{tokens.working_dir}/test-data/pca-data.csv')

        self.assertStatusCodeCorrect(response, 200)
        self.assertContentTypeJSON(response)
        self.assertHasMessage(response)

    # -------------------------------------------------------------------------------------------------------
    def test_export_csv_directory_does_not_exist(self):
        response = self.client.post(
            f'/data/export/csv/name/DateExported.csv/path/{tokens.working_dir}/non-existing/wdkjdjkjw')

        self.assertStatusCodeCorrect(response, 404)
        self.assertContentTypeJSON(response)
        self.assertHasMessage(response)

    # -------------------------------------------------------------------------------------------------------
    def test_export_csv(self):
        self.readDataFrame()
        response = self.client.post(
            f'/data/export/csv/name/DateExported.csv/path/{tokens.working_dir}')

        self.assertStatusCodeCorrect(response, 201)
        self.assertContentTypeJSON(response)
        self.assertHasMessage(response)
