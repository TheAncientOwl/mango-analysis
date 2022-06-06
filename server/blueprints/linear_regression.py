import main.server as server
import flask

linear_regression = flask.Blueprint('linear_regression', __name__)


@linear_regression.post('/linear-regression/new')
def create_new_linear_regression():
    server.new_linear_regression()

    return flask.jsonify(message='New LinearRegression created!'), 200


@linear_regression.get('/linear-regression/variables')
def get_variables():
    return flask.jsonify(variables=server.linear_regression.get_numeric_columns()), 200


@linear_regression.post('/linear-regression/run-model')
def run_model():
    data = flask.request.get_json()

    result = server.linear_regression.run_model(
        X_label=data['xLabel'],
        y_label=data['yLabel'],
        test_size=data['testSize'],
        random_state=data['randomState']
    )

    return flask.jsonify(
        trainPath=result['trainPath'],
        testPath=result['testPath'],
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

    value = data['value']

    return flask.jsonify(prediction=server.linear_regression.predict_value(value)), 200
