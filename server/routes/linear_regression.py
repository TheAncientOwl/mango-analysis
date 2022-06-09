import flask

import pandas as pd

from sklearn.linear_model import LinearRegression as LinearRegression
from sklearn.model_selection import train_test_split
from sklearn import metrics

import statsmodels.api as sm

import main.app as app
import main.utils as utils


class StateLinearRegression():
    def __init__(self):
        self.model = LinearRegression()
        self.diff = pd.DataFrame()


stateLinearRegression = StateLinearRegression()

linear_regression = flask.Blueprint('linear_regression', __name__)


@linear_regression.post('/linear-regression/new')
def create_new_linear_regression():
    global stateLinearRegression
    stateLinearRegression = StateLinearRegression()

    return flask.jsonify(message='New MultipleLinearRegression created!')


@linear_regression.get('/linear-regression/variables')
def get_variables():
    return flask.jsonify(variables=utils.get_numeric_columns(app.dataFrame))


@linear_regression.post('/linear-regression/run-model')
def run_model():
    data = flask.request.get_json()

    x_labels = data['xLabels']
    x_labels = list(x_labels)
    y_label = data['yLabel']
    test_size = data['testSize']
    random_state = data['randomState']

    print('>> TYPE:', type(x_labels))

    x = app.dataFrame[x_labels].values
    y = app.dataFrame[y_label].values

    # split in train & test
    x_train, x_test, y_train, y_test = train_test_split(
        x, y, test_size=0.33, random_state=42)

    # train the model
    stateLinearRegression.model = LinearRegression()
    stateLinearRegression.model.fit(x_train, y_train)

    # predict the results
    y_pred = stateLinearRegression.model.predict(x_test)

    # differences dataframe
    stateLinearRegression.diff = pd.DataFrame(
        {'Actual Value': y_test, 'Predicted value': y_pred, 'Difference': y_test - y_pred})

    # equation
    coefficient = stateLinearRegression.model.coef_
    intercept = stateLinearRegression.model.intercept_

    equation = f'Predicted {y_label} = {intercept} + '
    for (label, coeff) in zip(x_labels, coefficient):
        equation += f'({label} * {coeff}) + '
    equation = equation[:-3]

    # mean squared error
    mse = metrics.mean_squared_error(y_test, y_pred)

    # ordinary least-squares (OLS)
    X_stat = sm.add_constant(x_train)
    ols = sm.OLS(y_train, X_stat).fit()

    adj_r_squared = ols.rsquared_adj
    r_squared = ols.rsquared

    return flask.jsonify(
        coeff=list(coefficient),
        intercept=intercept,
        equation=equation,
        mse=mse,
        rSquaredAdj=adj_r_squared,
        rSquared=r_squared
    )


@linear_regression.post('/linear-regression/predict')
def predict():
    data = flask.request.get_json()

    values = data['values']

    return flask.jsonify(prediction=stateLinearRegression.model.predict([values])[0]), 200


@linear_regression.get('/linear-regression/differences/<int:count>')
def get_differences(count):
    return flask.jsonify(diffs=stateLinearRegression.diff[0:count].to_dict(orient='split')), 200
