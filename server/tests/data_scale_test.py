# TODO: write tests
# # -------------------------------------------------------------------------------------------------------
# def test_scale_data(self):
#     self.readDataFrame()
#     targets, features = self.create_targets_features()

#     server.pca.set_target('Country')
#     server.pca.set_features(features)

#     response = self.client.post('/pca/scale-data')

#     self.assertStatusCodeCorrect(response, 200)
#     self.assertContentTypeJSON(response)
#     self.assertHasKey(response, 'message')

# # -------------------------------------------------------------------------------------------------------
# def test_was_data_scaled_false(self):
#     self.readDataFrame()
#     targets, features = self.create_targets_features()

#     server.pca.set_target('Country')
#     server.pca.set_features(features)

#     response = self.client.get('/pca/was-data-scaled')

#     self.assertStatusCodeCorrect(response, 200)
#     self.assertContentTypeJSON(response)
#     self.assertHasKey(response, 'scaledData')

#     response_json = response.get_json()
#     self.assertTrue(response_json['scaledData'] == False)

# # -------------------------------------------------------------------------------------------------------
# def test_was_data_scaled_true(self):
#     self.readDataFrame()
#     targets, features = self.create_targets_features()

#     server.pca.set_target('Country')
#     server.pca.set_features(features)

#     self.client.post('/pca/scale-data')

#     response = self.client.get('/pca/was-data-scaled')

#     self.assertStatusCodeCorrect(response, 200)
#     self.assertContentTypeJSON(response)
#     self.assertHasKey(response, 'scaledData')

#     response_json = response.get_json()
#     self.assertTrue(response_json['scaledData'] == True)
