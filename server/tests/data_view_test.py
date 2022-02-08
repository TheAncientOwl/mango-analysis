from test_base import TestBase, tokens
import main.server as server


class DataViewTest(TestBase):
    # -------------------------------------------------------------------------------------------------------
    def test_get_rows_invalid_range(self):
        self.readDataFrame()
        response = self.client.get('/data/rows-between/10/5')

        self.assertStatusCodeCorrect(response, 200)
        self.assertContentTypeJSON(response)
        self.assertHasKey(response, 'dataframe')

    # -------------------------------------------------------------------------------------------------------
    def test_get_rows_end_out_of_bounds(self):
        self.readDataFrame()
        response = self.client.get(
            f'/data/rows-between/0/{server.dataFrame.shape[0] + 1000}')

        self.assertStatusCodeCorrect(response, 200)
        self.assertContentTypeJSON(response)
        self.assertHasKey(response, 'dataframe')

    # -------------------------------------------------------------------------------------------------------
    def test_get_rows(self):
        self.readDataFrame()
        response = self.client.get('/data/rows-between/0/10')

        self.assertStatusCodeCorrect(response, 200)
        self.assertContentTypeJSON(response)
        self.assertHasKey(response, 'dataframe')
