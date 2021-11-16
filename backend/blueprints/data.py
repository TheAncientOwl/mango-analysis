from os import path
import pandas as pd
import flask
from flask import request
import json
import server_data as sv

data = flask.Blueprint('data_blueprint', __name__)


@data.get('/data/import/csv/<path:filePath>')
def import_csv(filePath):
    if not path.exists(filePath):
        return flask.jsonify(success=False, message="File does not exist")

    sv.dataFrame = pd.read_csv(filePath)

    return flask.jsonify(success=True, message="Success")


@data.get('/data/export/csv/name/<fileName>/path/<path:dirPath>')
def export_csv(fileName, dirPath):
    if not path.isdir(dirPath):
        return flask.jsonify(success=False, message="Directory does not exist")

    if sv.dataFrame.empty:
        return flask.jsonify(success=False, message="Nothing to save, dataframe empty")

    sv.dataFrame.to_csv(path_or_buf=path.join(dirPath, fileName), index=False)

    return flask.jsonify(success=True, message="File saved successfully")


@data.get('/data/rows-between/<start>/<end>')
def rows_between(start, end):
    start = max(int(start), 0)
    end = min(int(end), sv.dataFrame.shape[0])

    df_json = sv.dataFrame[start:end].to_json(orient='split')

    return flask.jsonify(success=True, message="Success", dataframe=df_json)


@data.get('/printhead')
def printhead():
    print(sv.dataFrame.head())
    return flask.jsonify(success=True)


# drop columns by labels
@data.route('/data/drop/columns', methods=['POST'])
def drop_columns():
    data = json.loads(request.data)
    labels = data["labels"]

    dropLabels = set()
    col_labels = sv.dataFrame.columns
    for label in labels:
        if label in col_labels:
            dropLabels.add(label)

    sv.dataFrame = sv.dataFrame.drop(columns=dropLabels)

    return flask.jsonify(success=True, message="Success")

# drop rows by index


@data.route('/data/drop/rows', methods=["POST"])
def drop_rows():
    data = json.loads(request.data)
    index = data["index"]

    return flask.jsonify(success=True, message="Success")
