import os
import flask

import main.app as app
import main.utils as utils


class SVM_State:
    def __init__(self):
        pass


state = SVM_State()

svm = flask.Blueprint('svm', __name__)


@svm.post('/svm/new')
def create_new_svm():
    global state
    state = SVM_State()

    return flask.jsonify(feedback='New SVM created!')
