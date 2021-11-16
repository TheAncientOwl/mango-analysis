import flask

data = flask.Blueprint('data_blueprint', __name__)


@data.get('/data/hello')
def hello():
    return flask.jsonify(success=True, message="Hello world!")
