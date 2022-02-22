import main.server as server
import json
import pandas
import flask

data_drop = flask.Blueprint('data_drop', __name__)


# >> Drop dataframe
@data_drop.post('/data/drop-all')
def drop_dataframe():
    server.dataFrame = pandas.DataFrame()
    return flask.jsonify(message='Dataframe dropped'), 200


# Drop columns by labels
# @request-data-format:
# {
#   'labels': ['label1', 'label2', ...]
# }
def drop_columns_impl(labels):
    # create valid labels set. (label valid if dataFrame contains it)
    dropLabels = set()
    colLabels = server.dataFrame.columns
    for label in labels:
        if label in colLabels:
            dropLabels.add(label)

    # drop columns
    server.dataFrame = server.dataFrame.drop(columns=dropLabels)


@data_drop.post('/data/drop/columns')
def drop_columns():
    # get labels from request
    data = json.loads(flask.request.data)
    labels = data['labels']

    drop_columns_impl(labels)

    return flask.jsonify(message='Columns dropped'), 200


# Drop rows by index
# @request-data-format:
# {
#   'index': [index1, index2, ...]
# }
# @return jsonify(success, message)
def drop_rows_impl(index):
    # create valid index set. (index valid if between 0:nRows)
    dropIndex = set()
    nRows = server.dataFrame.shape[0]
    for idx in index:
        if idx >= 0 and idx < nRows:
            dropIndex.add(idx)

    # drop rows
    server.dataFrame = server.dataFrame.drop(
        server.dataFrame.index[list(dropIndex)], axis=0)


@data_drop.post('/data/drop/rows')
def drop_rows():
    # get index from request
    data = json.loads(flask.request.data)
    index = data['index']

    drop_rows_impl(index)

    return flask.jsonify(message='Rows dropped'), 200


# Drop rows & columns
# @request-data-format:
# {
#   'labels': ['label1', 'label2', ...],
#   'index': [index1, index2, ...]
# }
# @return jsonify(success, message)
@data_drop.post('/data/drop/rows+cols')
def drop_rows_cols():
    # drop rows
    # get index from request
    data = json.loads(flask.request.data)
    index = data['index']

    drop_rows_impl(index)

    # drop columns
    # get labels from request
    data = json.loads(flask.request.data)
    labels = data['labels']

    drop_columns_impl(labels)

    idk = flask.request.get_json()

    return flask.jsonify(message='Rows & columns dropped'), 200
