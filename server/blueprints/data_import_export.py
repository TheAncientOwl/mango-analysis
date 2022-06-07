import main.app as app
import pandas
import flask
import os

data_import_export = flask.Blueprint('data_import_export', __name__)


# >> Helper route
@data_import_export.get('/printhead')
def printhead():
    print(app.dataFrame.head())
    return flask.jsonify(message='Data printed'), 200


# >> Read CSV
@data_import_export.get('/data/import/csv/<path:filePath>')
def import_csv(filePath):
    if not os.path.exists(filePath):
        return flask.jsonify(message='File does not exist'), 404

    app.dataFrame = pandas.read_csv(filePath, na_values=['NA'])
    app.dataFrame.insert(
        0, '_mango_id', range(1, len(app.dataFrame) + 1))

    return flask.jsonify(message='Success'), 200


# >> Export CSV
@data_import_export.post('/data/export/csv/name/<fileName>/path/<path:dirPath>')
def export_csv(fileName, dirPath):
    if not os.path.isdir(dirPath):
        return flask.jsonify(message='Directory does not exist'), 404

    app.dataFrame.to_csv(path_or_buf=os.path.join(
        dirPath, fileName), index=False)

    return flask.jsonify(message='File saved successfully'), 201

# >> Export CSV from params


@data_import_export.post('/data/export/dataframe/csv')
def export_dataframe_csv():
    data = flask.request.get_json()

    save_path = data['savePath']

    df_index = data['index']
    df_columns = data['columns']
    df_data = data['data']

    df = pandas.DataFrame(index=df_index, columns=df_columns, data=df_data)
    df.to_csv(path_or_buf=save_path)

    return flask.jsonify(message='File saved successfully'), 201
