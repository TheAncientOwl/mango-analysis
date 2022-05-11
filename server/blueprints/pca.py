import main.server as server
import flask
from pandas.api.types import is_numeric_dtype as pandas_is_numeric

pca = flask.Blueprint('pca', __name__)


@pca.post('/pca/new')
def create_new_pca():
    server.new_pca()

    return flask.jsonify(message='New PCA created!')


@pca.get('/pca/possible/targets&features')
def get_possible_targets_features():
    targets = []
    features = []

    for label in server.dataFrame.columns:
        if label == '_mango_id':
            continue
        if pandas_is_numeric(server.dataFrame[label]):
            features.append(label)
        else:
            targets.append(label)

    return flask.jsonify(targets=targets, features=features), 200


@pca.post('/pca/set/target&features')
def set_target_and_features():
    data = flask.request.get_json()
    target = data['target']
    features = data['features']

    server.pca.set_target(target)
    server.pca.set_features(features)

    return flask.jsonify(message='Set target & features!'), 200


@pca.get('/pca/was-data-scaled')
def was_data_scaled():
    return flask.jsonify(scaledData=server.scaled_data), 200


@pca.post('/pca/scale-data')
def scale_data():
    server.pca.standardize_data()

    return flask.jsonify(message='Data scaled!'), 200


@pca.get('/pca/plot/correlation-matrix')
def plot_correlation_matrix():
    path = server.pca.plot_correlation_matrix()

    return flask.jsonify(imagePath=path), 200


@pca.post('/pca/analyze')
def analyze():
    data = flask.request.get_json()
    if data != None:
        components_count = data['componentsCount']
        server.pca.analyze(components_count)
    else:
        server.pca.analyze()

    return flask.jsonify(message='Analyze complete!'), 200


@pca.get('/pca/components-count-hints')
def get_components_count_hints():
    kaiser_path = server.pca.plot_kaiser()

    threshold70 = server.pca.threshold70().to_dict(orient='split')

    eigenvalues_g1 = server.pca.eigenvalues_g1().to_dict(orient='split')

    return flask.jsonify(kaiserPath=kaiser_path, threshold70=threshold70, eigenvaluesG1=eigenvalues_g1), 200


@pca.get('/pca/plot/loadings-matrix')
def plot_loadings_matrix():
    path = server.pca.plot_loadings_matrix()

    return flask.jsonify(imagePath=path), 200


@pca.post('/pca/plot/2D')
def plot_2D():
    data = flask.request.get_json()

    path = server.pca.plot_two_components(
        title=data['title'],
        pc_x=data['pcX'],
        pc_y=data['pcY'],
        targets=data['targets'],
        annot=data['annot'],
        legend=data['legend']
    )

    return flask.jsonify(imagePath=path), 200


@pca.get('/pca/labels')
def labels():
    return flask.jsonify(labels=server.pca.pca_labels), 200


@pca.get('/pca/targets')
def targets():
    return flask.jsonify(targets=server.dataFrame[server.pca.target]), 200


@pca.get('/pca/targets&labels')
def targets_and_labels():
    return flask.jsonify(targets=list(server.dataFrame[server.pca.target]), labels=server.pca.pca_labels), 200
