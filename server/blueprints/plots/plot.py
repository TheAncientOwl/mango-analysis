import server_data as sv
import pandas as pd
from pandas.api.types import is_numeric_dtype as pandas_is_numeric

import matplotlib.pyplot as plt

import flask
import json
import os

from uuid import uuid4

plot = flask.Blueprint('plot_blueprint', __name__)


# * Creates plot
# * @request-data-format:
# * {
# *   'x': 'column label'
# *   'y': 'column label'
# *   'yLab': 'plot y label'
# *   'xLab': 'plot x label'
# *   'title': 'plot title'
# * }
# * @return jsonify(success, message, ?path) -> absolute path to plot location
@plot.route('/data/plots/plot', methods=['POST'])
def create_plot():
    data = json.loads(flask.request.data)

    # * Extract columns.
    # @return success, result
    #   result -> if success, the list
    #             else      , response
    def extract_column(axis):
        # check if axis column is provided.
        if axis not in data:
            return False, flask.jsonify(success=False, message='Missing x.')

        # check if column label is in dataframe.
        columnLabel = data[axis]
        if columnLabel not in sv.dataFrame:
            return False, flask.jsonify(success=False, message=f'Missing {axis}.')

        # get list.
        list = sv.dataFrame[columnLabel]

        # check if list is numeric.
        if not pandas_is_numeric(list):
            return False, flask.jsonify(success=False, message=f'Column "{columnLabel}" is not numeric.')

        return True, list

    success, xList = extract_column('x')
    if success == False:
        return xList

    success, yList = extract_column('y')
    if success == False:
        return yList

    # * Get the optional parameters.
    xLab = data.get('xLab', '')
    yLab = data.get('yLab', '')
    title = data.get('title', '')

    # * Plot the lists
    plt.plot(xList, yList)
    plt.xlabel(xLab)
    plt.ylabel(yLab)
    plt.title(title)

    # * Create directory and save plot
    save_path_directory = os.path.join(
        os.path.expanduser('~'), '.data-analysis-tool', 'plots')

    if not os.path.exists(save_path_directory):
        os.makedirs(save_path_directory)

    plot_path = os.path.join(save_path_directory,  f'{str(uuid4())}.png')
    plt.savefig(plot_path)

    return flask.jsonify(success=True, message='Plot saved', path=plot_path)
