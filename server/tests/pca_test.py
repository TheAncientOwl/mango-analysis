from test_base import TestBase
import main.server as server
import os
import random


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

    # -------------------------------------------------------------------------------------------------------
    def test_was_data_scaled_false(self):
        self.readDataFrame()
        targets, features = self.create_targets_features()

        server.pca.set_target('Country')
        server.pca.set_features(features)

        response = self.client.get('/pca/was-data-scaled')

        self.assertStatusCodeCorrect(response, 200)
        self.assertContentTypeJSON(response)
        self.assertHasKey(response, 'scaledData')

        response_json = response.get_json()
        self.assertTrue(response_json['scaledData'] == False)

    # -------------------------------------------------------------------------------------------------------
    def test_was_data_scaled_true(self):
        self.readDataFrame()
        targets, features = self.create_targets_features()

        server.pca.set_target('Country')
        server.pca.set_features(features)

        self.client.post('/pca/scale-data')

        response = self.client.get('/pca/was-data-scaled')

        self.assertStatusCodeCorrect(response, 200)
        self.assertContentTypeJSON(response)
        self.assertHasKey(response, 'scaledData')

        response_json = response.get_json()
        self.assertTrue(response_json['scaledData'] == True)

    # -------------------------------------------------------------------------------------------------------
    def test_plot_correlation_matrix(self):
        self.readDataFrame()
        targets, features = self.create_targets_features()

        server.pca.set_target('Country')
        server.pca.set_features(features)

        self.client.post('/pca/scale-data')

        response = self.client.get('/pca/plot/correlation-matrix')

        self.assertStatusCodeCorrect(response, 200)
        self.assertContentTypeJSON(response)
        self.assertHasKey(response, 'imagePath')

        response_json = response.get_json()
        self.assertTrue(os.path.exists(response_json['imagePath']))

    # -------------------------------------------------------------------------------------------------------
    def test_analyze_default(self):
        self.readDataFrame()
        targets, features = self.create_targets_features()

        server.pca.set_target('Country')
        server.pca.set_features(features)

        self.client.post('/pca/scale-data')

        response = self.client.post('/pca/analyze')

        self.assertStatusCodeCorrect(response, 200)
        self.assertContentTypeJSON(response)
        self.assertHasKey(response, 'message')

        self.assertTrue(server.pca.pca.n_components_ == 13,
                        msg="Incorrect components count")

    # -------------------------------------------------------------------------------------------------------
    def test_analyze_4(self):
        self.readDataFrame()
        targets, features = self.create_targets_features()

        server.pca.set_target('Country')
        server.pca.set_features(features)

        self.client.post('/pca/scale-data')

        response = self.client.post('/pca/analyze', json={
            'componentsCount': 4
        })

        self.assertStatusCodeCorrect(response, 200)
        self.assertContentTypeJSON(response)
        self.assertHasKey(response, 'message')

        self.assertTrue(server.pca.pca.n_components_ == 4,
                        msg="Incorrect components count")

    # -------------------------------------------------------------------------------------------------------
    def test_plot_loadings_matrix(self):
        self.readDataFrame()
        targets, features = self.create_targets_features()

        server.pca.set_target('Country')
        server.pca.set_features(features)

        self.client.post('/pca/scale-data')
        self.client.post('/pca/analyze')

        response = self.client.get('/pca/plot/loadings-matrix')

        self.assertStatusCodeCorrect(response, 200)
        self.assertContentTypeJSON(response)
        self.assertHasKey(response, 'imagePath')

        response_json = response.get_json()
        self.assertTrue(os.path.exists(response_json['imagePath']))

    # -------------------------------------------------------------------------------------------------------
    def test_hints(self):
        self.readDataFrame()
        targets, features = self.create_targets_features()

        server.pca.set_target('Country')
        server.pca.set_features(features)

        self.client.post('/pca/scale-data')
        self.client.post('/pca/analyze')

        response = self.client.get('/pca/components-count-hints')

        self.assertStatusCodeCorrect(response, 200)
        self.assertContentTypeJSON(response)
        self.assertHasKey(response, 'eigenvaluesG1')
        self.assertHasKey(response, 'kaiserPath')
        self.assertHasKey(response, 'threshold70')

        response_json = response.get_json()

        self.assertTrue(os.path.exists(response_json['kaiserPath']))

    # -------------------------------------------------------------------------------------------------------

    def test_plot_2D(self):
        self.readDataFrame()
        targets, features = self.create_targets_features()

        server.pca.set_target('Country')
        server.pca.set_features(features)

        self.client.post('/pca/scale-data')
        self.client.post('/pca/analyze', json={
            'componentsCount': 4
        })

        random.seed(893927)
        targets = list(random.sample(
            sorted(server.dataFrame['Country'].values), 10))
        response = self.client.post('/pca/plot/2D', json={
            'pcX': 'PC1',
            'pcY': 'PC2',
            'targets': targets,
            'annot': True,
            'legend': False
        })

        self.assertStatusCodeCorrect(response, 200)
        self.assertContentTypeJSON(response)
        self.assertHasKey(response, 'imagePath')

        response_json = response.get_json()
        self.assertTrue(os.path.exists(response_json['imagePath']))
