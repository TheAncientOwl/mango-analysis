import unittest
import json
from test_base import TestBase, tokens
import server_data as sv


class PlotTest(TestBase):
    def test_missing_x(self):
        self.readDataFrame()
        response = self.client.post('/data/plots/plot', json={
            'y': 'EAM',
            'yLab': 'EAM_lab',
            'title': 'Test plot'
        })
        json_data = response.get_json()

        self.assertBasics(response, json_data)
        self.assertFalse(json_data[tokens.success])

    def test_missing_y(self):
        self.readDataFrame()
        response = self.client.post('/data/plots/plot', json={
            'x': 'EA',
            'yLab': 'EAM_lab',
            'title': 'Test plot'
        })
        json_data = response.get_json()

        self.assertBasics(response, json_data)
        self.assertFalse(json_data[tokens.success])

    def test_missing_params(self):
        self.readDataFrame()
        response = self.client.post('/data/plots/plot', json={
            'x': 'EA',
            'y': 'EAM',
            # 'xLab': 'EA_lab',
            'yLab': 'EAM_lab',
            'title': 'Test plot'
        })
        json_data = response.get_json()

        self.assertBasics(response, json_data)
        self.assertTrue(json_data[tokens.success])
        self.assertTrue('path' in json_data)

    def test_full_params(self):
        self.readDataFrame()
        response = self.client.post('/data/plots/plot', json={
            'x': 'EA',
            'y': 'EAM',
            'xLab': 'EA_lab',
            'yLab': 'EAM_lab',
            'title': 'Test plot'
        })
        json_data = response.get_json()

        self.assertBasics(response, json_data)
        self.assertTrue(json_data[tokens.success])
        self.assertTrue('path' in json_data)

    def test_empty_params(self):
        self.readDataFrame()
        response = self.client.post('/data/plots/plot', json={
            'x': 'EA',
            'y': 'EAM',
        })
        json_data = response.get_json()

        self.assertBasics(response, json_data)
        self.assertTrue(json_data[tokens.success])
        self.assertTrue('path' in json_data)


if __name__ == '__main__':
    unittest.main()
