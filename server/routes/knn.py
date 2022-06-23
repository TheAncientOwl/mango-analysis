import os
import flask

import main.app as app
import main.utils as utils


class KNN_State:
    def __init__(self):
        pass


state = KNN_State()

knn = flask.Blueprint('knn', __name__)


@knn.post('/knn/new')
def create_new_knn():
    global state
    state = KNN_State()

    return flask.jsonify(feedback='New KNN created!')
