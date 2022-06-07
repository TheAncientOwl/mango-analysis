import flask

import main.app as app

factor_analysis = flask.Blueprint('factor_analysis', __name__)


@factor_analysis.post('/factor-analysis/new')
def create_new_factor_analysis():
    app.new_factor_analysis()

    return flask.jsonify(message='New FactorAnalysis created!'), 200


@factor_analysis.get('/factor-analysis/possible-features')
def get_possible_features():
    return flask.jsonify(features=app.factor_analysis.get_possible_features()), 200


@factor_analysis.post('/factor-analysis/set-features')
def set_features():
    data = flask.request.get_json()

    features = data['features']

    app.factor_analysis.set_features(features=features)

    return flask.jsonify(messages='Success'), 200


@factor_analysis.get('/factor-analysis/tests/bartlett')
def bartlett():
    chi_square_value, p_value = app.factor_analysis.bartlett()

    return flask.jsonify(chiSquareValue=chi_square_value, pValue=p_value), 200


@factor_analysis.get('/factor-analysis/tests/kmo')
def kmo():
    return flask.jsonify(kmoModel=app.factor_analysis.kmo()), 200


@factor_analysis.post('/factor-analysis/default-analysis')
def default_analysis():
    app.factor_analysis.analyze()

    return flask.jsonify(message='Analysis completed!'), 200


@factor_analysis.post('/factor-analysis/analyze')
def analyze():
    data = flask.request.get_json()
    if data != None:
        n_factors = data['nFactors'] if 'nFactors' in data else 'all'
        rotation = data['rotation'] if 'rotation' in data else None
        if rotation == 'none':
            rotation = None
        app.factor_analysis.analyze(n_factors=n_factors, rotation=rotation)
    else:
        app.factor_analysis.analyze()

    return flask.jsonify(message='Analysis completed!'), 200


@factor_analysis.get('/factor-analysis/default-hints')
def get_default_hints():

    return flask.jsonify(screePlotPath=app.factor_analysis.plot_scree_plot(),
                         eigenvalues=app.factor_analysis.get_eigen_values().to_dict(orient='split')), 200


@factor_analysis.post('/factor-analysis/run')
def run_analysis():
    data = flask.request.get_json()

    n_factors = data['nFactors']
    rotation = data['rotation']

    result = app.factor_analysis.run_analysis(
        n_factors=n_factors, rotation=rotation)

    return flask.jsonify(loadings=result['loadings'].to_dict(orient='split'), loadingsPath=result['loadingsPath']), 200
