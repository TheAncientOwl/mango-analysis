import server_data as sv
import pandas as pd
from pandas.api.types import is_numeric_dtype as pandas_is_numeric

import flask
import json
from os import path

data = flask.Blueprint('data_blueprint', __name__)


# >> Helper route
@data.get('/printhead')
def printhead():
    print(sv.dataFrame.head())
    return flask.jsonify(success=True)


# TODO: Transform to post method
@data.get('/data/delete')
def delete_dataframe():
    sv.dataFrame = pd.DataFrame()
    return flask.jsonify(success=True, message='Dataframe deleted')


@data.get('/data/rows-count')
def rows_count():
    return flask.jsonify(success=True, rowscount=sv.dataFrame.shape[0])


@data.get('/data/import/csv/<path:filePath>')
def import_csv(filePath):
    if not path.exists(filePath):
        return flask.jsonify(success=False, message='File does not exist')

    sv.dataFrame = pd.read_csv(filePath)

    return flask.jsonify(success=True, message='Success')


# TODO: Transform to post method
@data.get('/data/export/csv/name/<fileName>/path/<path:dirPath>')
def export_csv(fileName, dirPath):
    if not path.isdir(dirPath):
        return flask.jsonify(success=False, message='Directory does not exist')

    sv.dataFrame.to_csv(path_or_buf=path.join(dirPath, fileName), index=False)

    return flask.jsonify(success=True, message='File saved successfully')


# >> Get rows in range [start:end) ~ start inclusive, end exclusive.
@data.get('/data/rows-between/<int:start>/<int:end>')
def rows_between(start, end):
    if end < start:
        temp = end
        end = start
        start = temp

    start = max(0, start)
    end = min(sv.dataFrame.shape[0], end)

    requestedDf = sv.dataFrame[start:end]

    resultMap = {'columns': [], 'rows': [], 'totalRows': sv.dataFrame.shape[0]}
    idx = 0
    for column in requestedDf.columns:
        idx = idx + 1
        resultMap['columns'].append({'label': column, '__id': idx})

    for index, row in requestedDf.iterrows():
        row_dict = row.to_dict()
        row_dict['__id'] = index

        resultMap['rows'].append(row_dict)

    return flask.jsonify(success=True, message='Success', dataframe=resultMap)


# >> Get page.
# @param pageIndex -> requested page index
# @param pageSize  -> size of a page
# TODO: Transform to post method
@data.get('/data/page/<int:pageIndex>/page-size/<int:pageSize>')
def get_page(pageIndex, pageSize):
    rowsCount = sv.dataFrame.shape[0]
    pagesCount = rowsCount / pageSize

    startIndex = pageIndex * pageSize
    endIndex = startIndex + pageSize

    return rows_between(startIndex, endIndex)


# Drop columns by labels
# @request-data-format:
# {
#   'labels': ['label1', 'label2', ...]
# }
@data.post('/data/drop/columns')
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


# Drop rows by index
# @request-data-format:
# {
#   'index': [index1, index2, ...]
# }
# @return jsonify(success, message)
@data.post('/data/drop/rows')
def drop_rows():
    # get index from request
    data = json.loads(flask.request.data)
    index = data['index']

    # create valid index set. (index valid if between 0:nRows)
    dropIndex = set()
    nRows = sv.dataFrame.shape[0]
    for idx in index:
        if idx >= 0 and idx < nRows:
            dropIndex.add(idx)

    # drop rows
    sv.dataFrame = sv.dataFrame.drop(
        sv.dataFrame.index[list(dropIndex)], axis=0)

    return flask.jsonify(success=True, message='Success')


@data.get('/data/transpose')
def transpose():
    sv.dataFrame = sv.dataFrame.transpose()

    return flask.jsonify(success=True, message='Success')
