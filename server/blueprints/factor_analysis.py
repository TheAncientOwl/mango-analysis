import main.server as server
import flask

factor_analysis = flask.Blueprint('factor_analysis', __name__)


@factor_analysis.post('/factor-analysis/new')
def create_new_factor_analysis():
    server.new_factor_analysis()

    return flask.jsonify(message='New FactorAnalysis created!'), 200


@factor_analysis.get('/factor-analysis/possible-features')
def get_possible_features():
    return flask.jsonify(features=server.factor_analysis.get_possible_features()), 200


@factor_analysis.post('/factor-analysis/set-features')
def set_features():
    data = flask.request.get_json()

    features = data['features']

    server.factor_analysis.set_features(features=features)

    return flask.jsonify(messages='Success'), 200


@factor_analysis.get('/factor-analysis/tests/bartlett')
def bartlett():
    chi_square_value, p_value = server.factor_analysis.bartlett()

    return flask.jsonify(chiSquareValue=chi_square_value, pValue=p_value), 200


@factor_analysis.get('/factor-analysis/tests/kmo')
def kmo():
    return flask.jsonify(kmoModel=server.factor_analysis.kmo()), 200


@factor_analysis.post('/factor-analysis/analyze')
def analyze():
    data = flask.request.get_json()
    if data != None:
        n_factors = data['nFactors'] if 'nFactors' in data else 'all'
        rotation = data['rotation'] if 'rotation' in data else None
        if rotation == 'none':
            rotation = None
        server.factor_analysis.analyze(n_factors=n_factors, rotation=rotation)
    else:
        server.factor_analysis.analyze()

    return flask.jsonify(message='Analysis completed!'), 200


@factor_analysis.get('/factor-analysis/default-hints')
def get_default_hints():

    return flask.jsonify(screePlotPath=server.factor_analysis.plot_scree_plot(),
                         eigenvalues=server.factor_analysis.get_eigen_values().to_dict(orient='split')), 200
