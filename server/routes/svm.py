import os
import flask

from sklearn.metrics import accuracy_score, precision_score, recall_score
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC


import main.app as app
import main.utils as utils


class SVM_State:
    def __init__(self):
        self.X_train = None
        self.X_test = None

        self.y_train = None
        self.y_test = None

        self.y_pred = None

        self.model = None


state = SVM_State()

svm = flask.Blueprint('svm', __name__)


@svm.post('/svm/new')
def create_new_svm():
    global state
    state = SVM_State()

    return flask.jsonify(feedback='New SVM created!')


@svm.get('/svm/possible-features')
def get_possible_features():
    return flask.jsonify(features=utils.get_numeric_columns(app.dataFrame))


@svm.post('/svm/set-target-and-features')
def set_target_and_features():
    data = flask.request.get_json()

    target = app.dataFrame.loc[:, str(data['target'])].values
    features = app.dataFrame.loc[:, list(data['features'])].values

    state.X_train, state.X_test, state.y_train, state.y_test = train_test_split(
        features, target, test_size=data['testSize'], random_state=data['randomState']
    )

    return flask.jsonify(feedback='Success!')


@svm.post('/svm/run-model')
def run_model():
    data = flask.request.get_json()

    state.model = SVC(kernel=data['kernel'])

    state.model.fit(state.X_train, state.y_train)

    state.y_pred = state.model.predict(state.X_test)

    return flask.jsonify(
        accuracy=accuracy_score(state.y_test, state.y_pred),
        precision=precision_score(state.y_test, state.y_pred),
        recall=recall_score(state.y_test, state.y_pred)
    )

@svm.post('/svm/predict')
def predict():
    data = flask.request.get_json()

    values = data['values']

    return flask.jsonify(prediction=float(state.model.predict([values])[0]))
