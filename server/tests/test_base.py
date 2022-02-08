import unittest
import pandas
from main.server import app
import main.server as server
import os


class tokens:
    working_dir = 'C:/Users/TheAncientOwl/Code/data-analysis-tool/server'
    message = 'message'
    app_json = 'application/json'


class TestBase(unittest.TestCase):
    # dataframe read & empty
    def readDataFrame(self):
        server.dataFrame = pandas.read_csv(f'{tokens.working_dir}/Date.csv')

    def emptyDataFrame(self):
        server.dataFrame = pandas.DataFrame()

    # test case set-up & tear-down
    def setUp(self):
        self.emptyDataFrame()
        self.client = app.test_client(self)

    def tearDown(self):
        file = f'{tokens.working_dir}/DateExported.csv'
        if os.path.exists(file):
            os.remove(file)

    # custom asserts
    def assertHasKey(self, response, key):
        json_data = response.get_json()

        self.assertTrue(key in json_data,
                        msg=f"Json response missing '{key}' key")

    def assertHasMessage(self, response):
        json_data = response.get_json()

        self.assertHasKey(response, tokens.message)

    def assertContentTypeJSON(self, response):
        self.assertEqual(response.content_type, tokens.app_json,
                         msg=f'Response content type should be {tokens.app_json}, not {response.content_type}')

    def assertStatusCodeCorrect(self, response, status_code=200):
        self.assertEqual(response.status_code, status_code,
                         msg=f'Response status code should be {status_code}, not {response.status_code}.')
