import flask

import main.app as app

linear_regression = flask.Blueprint('linear_regression', __name__)


@linear_regression.post('/linear-regression/new')
def create_new_linear_regression():
    app.new_linear_regression()

    return flask.jsonify(message='New MultipleLinearRegression created!'), 200


@linear_regression.get('/linear-regression/variables')
def get_variables():
    return flask.jsonify(variables=app.linear_regression.get_numeric_columns()), 200


@linear_regression.post('/linear-regression/run-model')
def run_model():
    data = flask.request.get_json()

    result = app.linear_regression.run_model(
        x_labels=data['xLabels'],
        y_label=data['yLabel'],
        test_size=data['testSize'],
        random_state=data['randomState']
    )

    return flask.jsonify(
        coeff=result['coeff'],
        intercept=result['intercept'],
        equation=result['equation'],
        mse=result['mse'],
        rSquaredAdj=result['rSquaredAdj'],
        rSquared=result['rSquared']
    ), 200


@linear_regression.post('/linear-regression/predict')
def predict():
    data = flask.request.get_json()

    values = data['values']

    return flask.jsonify(prediction=app.linear_regression.predict_value(values)), 200


@linear_regression.get('/linear-regression/differences/<int:count>')
def get_differences(count):
    return flask.jsonify(diffs=app.linear_regression.diff[0:count].to_dict(orient='split')), 200
