import unittest
import pandas
from main import app
import server_data as sv
import os


class tokens:
    working_dir = 'C:/Users/TheAncientOwl/Code/data-analysis-tool/server'
    success = 'success'
    message = 'message'
    app_json = 'application/json'


class TestBase(unittest.TestCase):
    # test case set-up + tear-down
    def setUp(self):
        self.emptyDataFrame()
        self.client = app.test_client(self)

    def tearDown(self):
        file = f'{tokens.working_dir}/DateExported.csv'
        if os.path.exists(file):
            os.remove(file)
        pass

    # data-frame read + empty
    def readDataFrame(self):
        sv.dataFrame = pandas.read_csv(f'{tokens.working_dir}/Date.csv')

    def emptyDataFrame(self):
        sv.dataFrame = pandas.DataFrame()

    # custom asserts
    def assertHasSuccess(self, json):
        self.assertTrue(tokens.success in json,
                        msg="Json response missing 'success' key.")

    def assertHasMessage(self, json):
        self.assertTrue(tokens.message in json,
                        msg="Json response missing 'message' key.")

    # check if status_code = given status code(default 200) and content_type is app/json
    def assertHasResponseOk(self, response, status_code=200):
        self.assertEqual(response.status_code, status_code,
                         msg=f'Response status code should be {status_code}, not {response.status_code}.')
        self.assertEqual(response.content_type, tokens.app_json,
                         msg=f'Response content type should be {tokens.app_json}, not {response.content_type}')

    # asserts basic response format:
    #   code: 200;
    #   content-type: app/json;
    #   has success and message keys in json response
    def assertBasics(self, response, json, status_code=200):
        self.assertHasResponseOk(response, status_code)
        self.assertHasSuccess(json)
        self.assertHasMessage(json)
