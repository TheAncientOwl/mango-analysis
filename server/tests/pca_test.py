from test_base import TestBase
import main.server as server


class PCA_Test(TestBase):
    def create_targets_features(self):
        targets = ['Country']
        features = list(server.dataFrame.columns)
        features.remove('Country')
        features.remove('_mango_id')

        return [targets, features]

    # -------------------------------------------------------------------------------------------------------
    def test_get_targets_and_features(self):
        self.readDataFrame()
        targets, features = self.create_targets_features()

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

    # -------------------------------------------------------------------------------------------------------
    def test_scale_data(self):
        self.readDataFrame()
        targets, features = self.create_targets_features()

        server.pca.set_target('Country')
        server.pca.set_features(features)

        response = self.client.post('/pca/scale-data')

        self.assertStatusCodeCorrect(response, 200)
        self.assertContentTypeJSON(response)
        self.assertHasKey(response, 'message')
