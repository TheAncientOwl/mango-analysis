import os
import flask

import main.app as app
import main.utils as utils


class SOM_State:
    def __init__(self):
        pass


state = SOM_State()

som = flask.Blueprint('som', __name__)


@som.post('/som/new')
def create_new_som():
    global state
    state = SOM_State()

    return flask.jsonify(feedback='New SOM created!')
