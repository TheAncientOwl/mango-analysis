import os
import flask

from sklearn_som import SOM

import matplotlib.pyplot as plt

import main.app as app
import main.utils as utils


class SOM_State:
    def __init__(self):
        self.features_tag = []
        self.target_tag = ''

        self.features = []
        self.target = ''

        self.model = None
        self.predictions = None


state = SOM_State()

som = flask.Blueprint('som', __name__)


@som.post('/som/new')
def create_new_som():
    global state
    state = SOM_State()

    return flask.jsonify(feedback='New SOM created!')


@som.get('/som/possible-features')
def get_possible_features():
    return flask.jsonify(features=utils.get_numeric_columns(app.dataFrame))


@som.post('/som/set-target-and-features')
def set_features():
    data = flask.request.get_json()

    state.target_tag = str(data['target'])
    state.features_tag = list(data['features'])

    state.target = app.dataFrame.loc[:, state.target_tag].values
    state.features = app.dataFrame.loc[:, state.features_tag].values

    return flask.jsonify(feedback='Success!')


@som.post('/som/run')
def run():
    data = flask.request.get_json()

    state.model = SOM(
        m=data['m'],
        n=data['n'],
        dim=len(state.features_tag)
    )

    state.model.fit(state.features)

    state.predictions = state.model.predict(state.features)

    return flask.jsonify(feedback='Success!')


@som.post('/som/plot/predictions')
def plot():
    data = flask.request.get_json()

    featureX = data['featureX']
    featureY = data['featureY']

    # predictions
    plt.figure(figsize=(8, 8))
    plt.scatter(app.dataFrame[featureX], app.dataFrame[featureY],
                c=state.predictions)
    plt.xlabel(featureX)
    plt.ylabel(featureY)
    plt.title(data['title'])
    plt.legend()

    predict_image_path = os.path.join(
        utils.plots_app_data_path, f'SOM-Predict.{utils.make_uuid()}.jpg')
    plt.savefig(predict_image_path)

    return flask.jsonify(imagePath=predict_image_path)


@som.post('/som/plot/original')
def plot_original():
    data = flask.request.get_json()

    featureX = data['featureX']
    featureY = data['featureY']

    plt.figure(figsize=(8, 8))
    plt.scatter(app.dataFrame[featureX], app.dataFrame[featureY],
                c=state.target)
    plt.xlabel(featureX)
    plt.ylabel(featureY)
    plt.title('Original')
    plt.legend()

    original_image_path = os.path.join(
        utils.plots_app_data_path, f'SOM-Original.{utils.make_uuid()}.jpg')
    plt.savefig(original_image_path)

    return flask.jsonify(imagePath=original_image_path)
