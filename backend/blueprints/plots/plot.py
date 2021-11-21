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

    # * Check if x and y columns are provided.
    if 'x' not in data:
        return flask.jsonify(success=False, message='Missing x.')

    if 'y' not in data:
        return flask.jsonify(success=False, message='Missing y.')

    # * Check if x and y columns are in dataframe.
    x = data['x']
    if x not in sv.dataFrame:
        return flask.jsonify(success=False, message=f'Column "{x}" does not exist.')

    y = data['y']
    if y not in sv.dataFrame:
        return flask.jsonify(success=False, message=f'Column "{y}" does not exist.')

    # * Get lists to plot
    xList = sv.dataFrame[x]
    yList = sv.dataFrame[y]

    # * Check if x and y columns are numeric.
    if not pandas_is_numeric(xList):
        return flask.jsonify(success=False, message=f'Column "{x}" is not numeric.')

    if not pandas_is_numeric(yList):
        return flask.jsonify(success=False, message=f'Column "{y}" is not numeric.')

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
