import os
import flask

from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.neighbors import KNeighborsRegressor
from sklearn.metrics import mean_squared_error
from sklearn.ensemble import BaggingRegressor
from math import sqrt

import main.app as app
import main.utils as utils


class ModelConfig:
    def __init__(self):
        self.model = None
        self.train_error = None
        self.test_error = None


class KNN_State:
    def __init__(self):
        self.X_train = None
        self.X_test = None

        self.y_train = None
        self.y_test = None

        self.arbitrary = ModelConfig()
        self.gridSearchCV = ModelConfig()
        self.gridSearchCV_weights = ModelConfig()
        self.baggingGridSearchCV = ModelConfig()

        self.model = ModelConfig()


state = KNN_State()

knn = flask.Blueprint('knn', __name__)


@knn.post('/knn/new')
def create_new_knn():
    global state
    state = KNN_State()

    return flask.jsonify(feedback='New KNN created!')


@knn.get('/knn/possible-features')
def get_possible_targets_and_features():
    features = app.dataFrame.columns.tolist()
    try:
        features.remove('_mango_id')
    except:
        pass

    return flask.jsonify(features=features)


@knn.post('/knn/set-target-and-features')
def set_target_and_features():
    data = flask.request.get_json()

    target = app.dataFrame.loc[:, str(data['target'])].values
    features = app.dataFrame.loc[:, list(data['features'])].values

    state.X_train, state.X_test, state.y_train, state.y_test = train_test_split(
        features, target, test_size=data['testSize'], random_state=data['randomState']
    )

    return flask.jsonify(feedback='Success!')


@knn.post('/knn/arbitrary')
def arbitrary():
    data = flask.request.get_json()

    state.arbitrary.model = KNeighborsRegressor(n_neighbors=data['nNeighbors'])
    state.arbitrary.model.fit(state.X_train, state.y_train)

    train_preds = state.arbitrary.model.predict(state.X_train)
    mse = mean_squared_error(state.y_train, train_preds)
    state.arbitrary.train_error = sqrt(mse)

    test_preds = state.arbitrary.model.predict(state.X_test)
    mse = mean_squared_error(state.y_test, test_preds)
    state.arbitrary.test_error = sqrt(mse)

    return flask.jsonify(name='Arbitrary', trainError=state.arbitrary.train_error, testError=state.arbitrary.test_error)


@knn.get('/knn/grid-search-cv')
def gridSearchCV():
    parameters = {
        'n_neighbors': range(1, 50)
    }

    state.gridSearchCV.model = GridSearchCV(KNeighborsRegressor(), parameters)
    state.gridSearchCV.model.fit(state.X_train, state.y_train)

    train_preds = state.gridSearchCV.model.predict(state.X_train)
    mse = mean_squared_error(state.y_train, train_preds)
    state.gridSearchCV.train_error = sqrt(mse)

    test_preds = state.gridSearchCV.model.predict(state.X_test)
    mse = mean_squared_error(state.y_test, test_preds)
    state.gridSearchCV.test_error = sqrt(mse)

    return flask.jsonify(name='GridSearchCV', trainError=state.gridSearchCV.train_error, testError=state.gridSearchCV.test_error)


@knn.get('/knn/grid-search-cv-weights')
def gridSearchCV_weights():
    parameters = {
        'n_neighbors': range(1, 50),
        "weights": ["uniform", "distance"],
    }

    state.gridSearchCV_weights.model = GridSearchCV(
        KNeighborsRegressor(), parameters)
    state.gridSearchCV_weights.model.fit(state.X_train, state.y_train)

    train_preds = state.gridSearchCV_weights.model.predict(state.X_train)
    mse = mean_squared_error(state.y_train, train_preds)
    state.gridSearchCV_weights.train_error = sqrt(mse)

    test_preds = state.gridSearchCV_weights.model.predict(state.X_test)
    mse = mean_squared_error(state.y_test, test_preds)
    state.gridSearchCV_weights.test_error = sqrt(mse)

    return flask.jsonify(name='GridSearchCV & Weights', trainError=state.gridSearchCV_weights.train_error, testError=state.gridSearchCV_weights.test_error)


@knn.get('/knn/bagging')
def bagging():
    if state.gridSearchCV_weights.model == None:
        gridSearchCV_weights()

    best_k = state.gridSearchCV_weights.model.best_params_['n_neighbors']
    best_weights = state.gridSearchCV_weights.model.best_params_['weights']

    bagged_knn = KNeighborsRegressor(n_neighbors=best_k, weights=best_weights)

    state.baggingGridSearchCV.model = BaggingRegressor(
        bagged_knn, n_estimators=100)
    state.baggingGridSearchCV.model.fit(state.X_train, state.y_train)

    train_preds = state.baggingGridSearchCV.model.predict(state.X_train)
    mse = mean_squared_error(state.y_train, train_preds)
    state.baggingGridSearchCV.train_error = sqrt(mse)

    test_preds = state.baggingGridSearchCV.model.predict(state.X_test)
    mse = mean_squared_error(state.y_test, test_preds)
    state.baggingGridSearchCV.test_error = sqrt(mse)

    return flask.jsonify(name='Bagged GridSearchCV', trainError=state.baggingGridSearchCV.train_error, testError=state.baggingGridSearchCV.test_error)


@knn.post('/knn/set-model')
def set_model():
    data = flask.request.get_json()

    modelName = data['modelName']

    if modelName == 'Arbitrary':
        state.model = state.arbitrary.model
    elif modelName == 'GridSearchCV':
        state.model = state.gridSearchCV.model
    elif modelName == 'GridSearchCV & Weights':
        state.model = state.gridSearchCV_weights.model
    elif modelName == 'Bagged GridSearchCV':
        state.model = state.baggingGridSearchCV.model
    else:
        return flask.jsonify(feedback='Model not found'), 404

    return flask.jsonify(feedback=f'Model set! ({modelName})')


@knn.post('/knn/predict')
def predict():
    data = flask.request.get_json()

    values = data['values']

    return flask.jsonify(prediction=state.model.predict([values])[0])
