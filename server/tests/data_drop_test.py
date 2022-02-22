from test_base import TestBase, tokens
import main.server as server


class DataDropTest(TestBase):
    # -------------------------------------------------------------------------------------------------------
    def test_drop_all(self):
        self.readDataFrame()

        response = self.client.post('/data/drop-all')

        self.assertStatusCodeCorrect(response, 200)
        self.assertContentTypeJSON(response)
        self.assertHasMessage(response)
        self.assertTrue(server.dataFrame.shape[0] == 0)

    # -------------------------------------------------------------------------------------------------------
    def test_drop_columns_by_label(self):
        self.readDataFrame()

        dropLabels = ['EA', 'EAM', 'CP', 'IDK', 'CP']
        response = self.client.post('/data/drop/columns', json={
            'labels': dropLabels
        })

        self.assertStatusCodeCorrect(response, 200)
        self.assertContentTypeJSON(response)
        self.assertHasMessage(response)

        # check if some dropped labels are still in the dataframe
        remainingDropLabels = set()
        colLabels = server.dataFrame.columns
        for label in dropLabels:
            if label in colLabels:
                remainingDropLabels.add(label)

        self.assertTrue(len(remainingDropLabels) == 0,
                        f"Some labels were not deleted... '{str(remainingDropLabels)}'")

    # -------------------------------------------------------------------------------------------------------
    def test_drop_rows_by_index(self):
        self.readDataFrame()
        initialRowsNum = server.dataFrame.shape[0]

        dropIndex = [0, 1, 2, 6999, -100, 500, 30]
        response = self.client.post('/data/drop/rows', json={
            'mangoIDs': dropIndex
        })

        self.assertStatusCodeCorrect(response, 200)
        self.assertContentTypeJSON(response)
        self.assertHasMessage(response)

        self.assertTrue(server.dataFrame.shape[0] + 3 == initialRowsNum,
                        'Not all rows were dropped.')
