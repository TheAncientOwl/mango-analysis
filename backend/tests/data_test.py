import unittest
import server as sv


class DataTest(unittest.TestCase):
    # * Check if response is 200
    def test_index(self):
        tester = sv.app.test_client(self)

        def test_route(self, route):
            response = tester.get(route)
            self.assertEqual(response.status_code, 400)

        test_route(
            self, "/data/import/csv/C:/Users/TheAncientOwl/Code/data-analysis-tool/backend/Date.csv")


if __name__ == "__main__":
    unittest.main()
