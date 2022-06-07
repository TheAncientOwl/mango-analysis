import main.app as app
import flask
from pandas.api.types import is_numeric_dtype as pandas_is_numeric

pca = flask.Blueprint('pca', __name__)


@pca.post('/pca/new')
def create_new_pca():
    app.new_pca()

    return flask.jsonify(message='New PCA created!')


@pca.get('/pca/possible/targets&features')
def get_possible_targets_features():
    targets = []
    features = []

    for label in app.dataFrame.columns:
        if label == '_mango_id':
            continue
        if pandas_is_numeric(app.dataFrame[label]):
            features.append(label)
        else:
            targets.append(label)

    return flask.jsonify(targets=targets, features=features), 200


@pca.post('/pca/set/target&features')
def set_target_and_features():
    data = flask.request.get_json()
    target = data['target']
    features = data['features']

    app.pca.set_target(target)
    app.pca.set_features(features)

    return flask.jsonify(message='Set target & features!'), 200


@pca.get('/pca/plot/correlation-matrix')
def plot_correlation_matrix():
    path = app.pca.plot_correlation_matrix()

    return flask.jsonify(imagePath=path), 200


@pca.post('/pca/analyze')
def analyze():
    data = flask.request.get_json()
    if data != None:
        components_count = data['componentsCount']
        app.pca.analyze(components_count)
    else:
        app.pca.analyze()

    return flask.jsonify(message='Analyze complete!'), 200


@pca.get('/pca/components-count-hints')
def get_components_count_hints():
    kaiser_path = app.pca.plot_kaiser()

    threshold70 = app.pca.threshold70().to_dict(orient='split')

    eigenvalues_g1 = app.pca.eigenvalues_g1().to_dict(orient='split')

    return flask.jsonify(kaiserPath=kaiser_path, threshold70=threshold70, eigenvaluesG1=eigenvalues_g1), 200


@pca.get('/pca/plot/loadings-matrix')
def plot_loadings_matrix():
    path = app.pca.plot_loadings_matrix()

    return flask.jsonify(imagePath=path), 200


@pca.post('/pca/plot/2D')
def plot_2D():
    data = flask.request.get_json()

    path = app.pca.plot_two_components(
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
    return flask.jsonify(labels=app.pca.pca_labels), 200


@pca.get('/pca/targets')
def targets():
    return flask.jsonify(targets=app.dataFrame[app.pca.target]), 200


@pca.get('/pca/targets&labels')
def targets_and_labels():
    return flask.jsonify(targets=list(app.dataFrame[app.pca.target]), labels=app.pca.pca_labels), 200


@pca.post('/pca/export-loadings')
def export_loadings():
    data = flask.request.get_json()

    print(data)

    path = data['path']

    try:
        app.pca.export_loadings_matrix(path=path)
    except:
        return flask.jsonify(message='Could not save the file!'), 500

    return flask.jsonify(message='File exported!'), 200


@pca.post('/pca/export-pca')
def export_pca():
    data = flask.request.get_json()

    path = data['path']

    try:
        app.pca.export_pca(path=path)
    except:
        return flask.jsonify(message='Could not save the file!'), 500

    return flask.jsonify(message='File exported!'), 200
