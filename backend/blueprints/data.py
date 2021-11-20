import server_data as sv
import pandas as pd
from pandas.api.types import is_numeric_dtype as pandas_is_numeric

import flask
import json
from os import path

data = flask.Blueprint('data_blueprint', __name__)


# * Helper route
@data.get('/printhead')
def printhead():
    print(sv.dataFrame.head())
    return flask.jsonify(success=True)


# * Imports data from csv file into server's dataframe
# * @param filePath -> csv file path to be imported
# * @return jsonify(success, message)
@data.get('/data/import/csv/<path:filePath>')
def import_csv(filePath):
    if not path.exists(filePath):
        return flask.jsonify(success=False, message="File does not exist")

    sv.dataFrame = pd.read_csv(filePath)

    return flask.jsonify(success=True, message="Success")


# * Exports server's dataframe to csv file
# * If server's dataframe is empty, process is aborted
# * @param fileName -> destination file name
# * @param dirPath  -> destination directory path
# * @return jsonify(success, message)
@data.get('/data/export/csv/name/<fileName>/path/<path:dirPath>')
def export_csv(fileName, dirPath):
    if not path.isdir(dirPath):
        return flask.jsonify(success=False, message="Directory does not exist")

    if sv.dataFrame.empty:
        return flask.jsonify(success=False, message="Nothing to save, dataframe empty")

    sv.dataFrame.to_csv(path_or_buf=path.join(dirPath, fileName), index=False)

    return flask.jsonify(success=True, message="File saved successfully")


# * Get rows in range [start:end) ~ start inclusive, end exclusive.
# * @param start -> row start index
# * @param end   -> row end index
# * @return jsonify(success, message, ?dataframe)
@data.get('/data/rows-between/<start>/<end>')
def rows_between(start, end):
    # convert range to int
    try:
        start = int(start)
        end = int(end)
    except Exception as e:
        return flask.jsonify(success=False, message=str(e))

    # check if given range is valid <=> 0 <= start <= end < nRow(dataframe)
    if end < start:
        return flask.jsonify(success=False, message="End cannot be less than Start")

    if start < 0:
        return flask.jsonify(success=False, message="Start cannot be less than 0")

    if end > sv.dataFrame.shape[0]:
        return flask.jsonify(success=False, message="End cannot be greater than rows number")

    # get json from requested rows
    df_json = sv.dataFrame[start:end].to_json(orient='split')

    return flask.jsonify(success=True, message="Success", dataframe=df_json)


# * Drop columns by labels
# * @return jsonify(success, message)
# * @request-data-format:
# * {
# *   "labels": ["label1", "label2", ...]
# * }
# * @return jsonify(success, message, ?dataframe)
@data.route('/data/drop/columns', methods=['POST'])
def drop_columns():
    # get labels from request
    data = json.loads(flask.request.data)
    labels = data["labels"]

    # create valid labels set. (label valid if dataFrame contains it)
    dropLabels = set()
    colLabels = sv.dataFrame.columns
    for label in labels:
        if label in colLabels:
            dropLabels.add(label)

    # drop columns
    sv.dataFrame = sv.dataFrame.drop(columns=dropLabels)

    return flask.jsonify(success=True, message='Success')


# * Drop rows by index
# * @return jsonify(success, message)
# * {
# *   "index": [index1, index2, ...]
# * }
# * @return jsonify(success, message, ?dataframe, invalidIndexCount)
@data.route('/data/drop/rows', methods=['POST'])
def drop_rows():
    # get index from request
    data = json.loads(flask.request.data)
    index = data['index']

    # create valid index set. (index valid if between 0:nRows)
    dropIndex = set()
    nRows = sv.dataFrame.shape[0]
    invalidIndexCount = 0
    for idx in index:
        if idx >= 0 and idx < nRows:
            dropIndex.add(idx)
        else:
            invalidIndexCount = invalidIndexCount + 1

    # drop rows
    sv.dataFrame = sv.dataFrame.drop(
        sv.dataFrame.index[list(dropIndex)], axis=0)

    return flask.jsonify(success=True, message='Success', invalidIndexCount=invalidIndexCount)


# * Transpose dataframe matrix.
# * @return jsonify(success, message)
@data.get('/data/transpose')
def transpose():
    sv.dataFrame = sv.dataFrame.transpose()

    return flask.jsonify(success=True, message='Success')


# * Summary
# * @return -> dataframe
# *     original dataframe: m x n
# *     return   dataframe: p x n, p -> number of statistics
# *     oc -> original column
# *     ___ oc1 oc2 ... ocn
# *     min  x   x  ...  x
# *     max  x   x  ...  x
# *     ...  x   x  ...  x
# *     sk   x   x  ...  x
# *     ku   x   x  ...  x
@data.get('/data/summary')
def summary():
    originalColumnLabels = sv.dataFrame.columns
    result = {
        "statistic": ['min', 'max', 'median', 'mean', '1st Qu.', '3rd Qu.', 'std', 'sk', 'ku']
    }

    for columnLabel in originalColumnLabels:
        if not pandas_is_numeric(sv.dataFrame[columnLabel]):
            continue

        q1, q3 = sv.dataFrame[columnLabel].quantile(q=[0.25, 0.75])

        result[columnLabel] = [round(num, 4) for num in [
            sv.dataFrame[columnLabel].min(),
            sv.dataFrame[columnLabel].max(),
            sv.dataFrame[columnLabel].median(),
            sv.dataFrame[columnLabel].mean(),
            q1,
            q3,
            sv.dataFrame[columnLabel].std(),
            sv.dataFrame[columnLabel].skew(),
            sv.dataFrame[columnLabel].kurtosis()
        ]]

    # for key, values in result.items():
    #     print(f">> {key}:", sep="")
    #     for value in values:
    #         print(f"  {value}", end="")
    #     print()

    resultDf = pd.DataFrame(result)
    df_json = resultDf.to_json(orient='split')

    return flask.jsonify(success=True, message='Success', dataframe=df_json)
