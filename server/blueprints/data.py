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

# * Delete dataframe
# * @return jsonify(success, message)


@data.get('/data/delete')
def delete_dataframe():
    sv.dataFrame = pd.DataFrame()
    return flask.jsonify(success=True, message='Dataframe deleted')

# * Imports data from csv file into server's dataframe
# * @param filePath -> csv file path to be imported
# * @return jsonify(success, message)


@data.get('/data/import/csv/<path:filePath>')
def import_csv(filePath):
    if not path.exists(filePath):
        return flask.jsonify(success=False, message='File does not exist')

    sv.dataFrame = pd.read_csv(filePath)

    return flask.jsonify(success=True, message='Success')


# * Exports server's dataframe to csv file
# * If server's dataframe is empty, process is aborted
# * @param fileName -> destination file name
# * @param dirPath  -> destination directory path
# * @return jsonify(success, message)
@data.get('/data/export/csv/name/<fileName>/path/<path:dirPath>')
def export_csv(fileName, dirPath):
    if not path.isdir(dirPath):
        return flask.jsonify(success=False, message='Directory does not exist')

    # if sv.dataFrame.empty:
    #     return flask.jsonify(success=False, message='Nothing to save, dataframe empty')

    sv.dataFrame.to_csv(path_or_buf=path.join(dirPath, fileName), index=False)

    return flask.jsonify(success=True, message='File saved successfully')

# * Get dataframe rows count
@data.get('/data/rows-count')
def rows_count():
    return flask.jsonify(success=True, rowscount=sv.dataFrame.shape[0])


# * Get rows in range [start:end) ~ start inclusive, end exclusive.
# * @param start -> row start index
# * @param end   -> row end index
# * @return jsonify(success, message, dataframe)
@data.get('/data/rows-between/<int:start>/<int:end>')
def rows_between(start, end):
    if end < start:
        aux = end
        end = start
        start = aux
    
    start = max(0, start)
    end = min(sv.dataFrame.shape[0], end)

    # get json from requested rows
    # df_json = sv.dataFrame[start:end].to_json(orient='split')

    requestedDf = sv.dataFrame[start:end]

    resultMap = {'columns': [], 'rows': []}
    for column in requestedDf.columns:
        resultMap['columns'].append({'label': column})

    for index, row in requestedDf.iterrows():
        row_dict = row.to_dict()
        row_dict['id'] = index
        resultMap['rows'].append(row_dict)

    return flask.jsonify(success=True, message='Success', dataframe=resultMap)


# * Drop columns by labels
# * @request-data-format:
# * {
# *   'labels': ['label1', 'label2', ...]
# * }
# * @return jsonify(success, message, ?dataframe)
@data.route('/data/drop/columns', methods=['POST'])
def drop_columns():
    # get labels from request
    data = json.loads(flask.request.data)
    labels = data['labels']

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
# * @request-data-format:
# * {
# *   'index': [index1, index2, ...]
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
# * @request-data-format:
# * {
# *   'labels': ['label1', 'label2', ...]
# * }
# *     original dataframe: m x n
# *     return   dataframe: p x n, p -> number of statistics
# *     oc -> original column
# *     ___ oc1 oc2 ... ocn
# *     min  x   x  ...  x
# *     max  x   x  ...  x
# *     ...  x   x  ...  x
# *     sk   x   x  ...  x
# *     ku   x   x  ...  x
# * @return jsonify(success, message, dataframe, unknownLabels, nonNumeric)
@data.route('/data/summary', methods=['POST'])
def summary():

    data = json.loads(flask.request.data)
    requestedLabels = data['labels']

    # create valid labels set. (label valid if dataFrame contains it)
    originalColumnLabels = sv.dataFrame.columns
    validRequestedLabels = set()
    unknownLabels = 0
    nonNumeric = 0
    for columnLabel in requestedLabels:
        if columnLabel in originalColumnLabels:
            if not pandas_is_numeric(sv.dataFrame[columnLabel]):
                nonNumeric = nonNumeric + 1
            else:
                validRequestedLabels.add(columnLabel)
        else:
            unknownLabels = unknownLabels + 1

    result = {
        'statistic': ['min', 'max', 'median', 'mean', '1st Qu.', '3rd Qu.', 'std', 'sk', 'ku']
    }

    for columnLabel in validRequestedLabels:
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
    #     print(f'>> {key}:', sep='')
    #     for value in values:
    #         print(f'  {value}', end='')
    #     print()

    resultDf = pd.DataFrame(result)
    df_json = resultDf.to_json(orient='split')

    return flask.jsonify(success=True, message='Success', dataframe=df_json,
                         unknownLabels=unknownLabels, nonNumeric=nonNumeric)


# * Get page.
# * @param pageIndex -> requested page index
# * @param pageSize  -> size of a page
# * @return jsonify(success, message, dataframe)
@data.get('/data/page/<int:pageIndex>/page-size/<int:pageSize>')
def get_page(pageIndex, pageSize):
    rowsCount = sv.dataFrame.shape[0]
    pagesCount = rowsCount / pageSize

    startIndex = (pageIndex - 1) * pageSize
    endIndex = startIndex + pageSize

    return rows_between(startIndex, endIndex)
