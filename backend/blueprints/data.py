from os import path
import pandas as pd
import flask
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
