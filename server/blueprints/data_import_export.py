import main.server as server
import pandas
import flask
import os

data_import_export = flask.Blueprint('data_import_export', __name__)


# >> Helper route
@data_import_export.get('/printhead')
def printhead():
    print(server.dataFrame.head())
    return flask.jsonify(message='Data printed'), 200


# >> Read CSV
@data_import_export.get('/data/import/csv/<path:filePath>')
def import_csv(filePath):
    if not os.path.exists(filePath):
        return flask.jsonify(message='File does not exist'), 404

    server.dataFrame = pandas.read_csv(filePath)

    return flask.jsonify(message='Success'), 200


# >> Export CSV
@data_import_export.post('/data/export/csv/name/<fileName>/path/<path:dirPath>')
def export_csv(fileName, dirPath):
    if not os.path.isdir(dirPath):
        return flask.jsonify(message='Directory does not exist'), 404

    server.dataFrame.to_csv(path_or_buf=os.path.join(
        dirPath, fileName), index=False)

    return flask.jsonify(message='File saved successfully'), 201
