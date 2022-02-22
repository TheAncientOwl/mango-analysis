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
#   'mangoIDs': [index1, index2, ...]
# }
# @return jsonify(success, message)
def drop_rows_impl(mangoIDs):
    server.dataFrame.drop(server.dataFrame[server.dataFrame['_mango_id'].isin(
        mangoIDs)].index, axis=0, inplace=True)


@data_drop.post('/data/drop/rows')
def drop_rows():
    # get index from request
    data = json.loads(flask.request.data)
    mangoIDs = data['mangoIDs']

    drop_rows_impl(mangoIDs)

    return flask.jsonify(message='Rows dropped'), 200


# Drop rows & columns
# @request-data-format:
# {
#   'labels': ['label1', 'label2', ...],
#   'mangoIDs': [mangoID1, mangoID2, ...]
# }
# @return jsonify(success, message)
@data_drop.post('/data/drop/rows+cols')
def drop_rows_cols():
    # drop rows
    # get index from request
    data = json.loads(flask.request.data)
    mangoIDs = data['mangoIDs']

    drop_rows_impl(mangoIDs)

    # drop columns
    # get labels from request
    data = json.loads(flask.request.data)
    labels = data['labels']

    drop_columns_impl(labels)

    idk = flask.request.get_json()

    return flask.jsonify(message='Rows & columns dropped'), 200
