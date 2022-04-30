from test_base import TestBase
import main.server as server


class PCA_Test(TestBase):
    # -------------------------------------------------------------------------------------------------------
    def test_get_targets_and_features(self):
        self.readDataFrame()

        targets = ['Country']
        features = list(server.dataFrame.columns)
        features.remove('Country')
        features.remove('_mango_id')

        response = self.client.get('/pca/possible/targets&features')

        self.assertStatusCodeCorrect(response, 200)
        self.assertContentTypeJSON(response)
        self.assertHasKey(response, 'targets')
        self.assertHasKey(response, 'features')

        response_json = response.get_json()

        self.assertTrue(response_json['targets']
                        == targets, 'Incorrect targets')
        self.assertTrue(response_json['features']
                        == features, 'Incorrect features')
