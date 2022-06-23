import os
import flask

import pandas as pd
from prince import CA

import main.app as app
import main.utils as utils


class CorrespondenceAnalysis_State:
    def __init__(self):
        self.X = pd.DataFrame()
        self.ca = CA()


state = CorrespondenceAnalysis_State()

correspondence_analysis = flask.Blueprint('correspondence_analysis', __name__)


@correspondence_analysis.post('/ca/new')
def create_new_ca():
    global state
    state = CorrespondenceAnalysis_State()

    return flask.jsonify(feedback='New Correspondence Analysis created!')


@correspondence_analysis.post('/ca/run')
def run():
    data = flask.request.get_json()

    state.ca = CA(
        n_components=data['nComponents'],
        n_iter=data['nIter'],
        copy=True,
        check_input=True,
        engine='auto',
        random_state=42
    )

    state.X = app.dataFrame.iloc[:, 1:]
    state.X.set_index(state.X.columns[0], inplace=True)
    state.X.index.rename(data['rowsName'], inplace=True)
    state.X.columns.rename(data['columnsName'], inplace=True)

    state.ca = state.ca.fit(state.X)

    summary = pd.DataFrame({'EigenValues': state.ca.eigenvalues_,
                           'Explained Inertia': state.ca.explained_inertia_},
                           index=[f'Component {x}' for x in range(0, data['nComponents'])])

    return flask.jsonify(
        rowCoordinates=state.ca.row_coordinates(
            state.X).to_dict(orient='split'),
        columnCoordinates=state.ca.column_coordinates(
            state.X).to_dict(orient='split'),
        totalInertia=state.ca.total_inertia_,
        summary=summary.to_dict(orient='split')
    )


@correspondence_analysis.post('/ca/plot')
def plot_ca():
    data = flask.request.get_json()

    ax = state.ca.plot_coordinates(
        X=state.X,
        ax=None,
        figsize=(8, 8),
        x_component=data['xComponent'],
        y_component=data['yComponent'],
        show_row_labels=data['showRowLabels'],
        show_col_labels=data['showColLabels']
    )

    img_path = os.path.join(utils.plots_app_data_path,
                            f'CorrespondenceAnalysis.{utils.make_uuid()}.jpg')
    ax.get_figure().savefig(img_path)

    return flask.jsonify(imgPath=img_path)
