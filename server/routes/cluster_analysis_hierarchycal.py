import os
import flask

import pandas as pd

from scipy.cluster.hierarchy import dendrogram, linkage
from sklearn.cluster import AgglomerativeClustering

import matplotlib.pyplot as plt

import main.app as app
import main.utils as utils


class Hierarchycal_State:
    def __init__(self):
        self.label_tag = None
        self.feature_tags = []

        self.labels = []
        self.features = []


state = Hierarchycal_State()

hierarchycal = flask.Blueprint('hierarchycal', __name__)


@hierarchycal.post('/hierarchycal/new')
def create_new_cluster_analysis():
    global state
    state = Hierarchycal_State()

    return flask.jsonify(feedback='New Cluster analysis created!')


@hierarchycal.get('/hierarchycal/possible-labels-and-features')
def get_possible_targets_and_features():
    targets = []
    features = []

    for label in app.dataFrame.columns:
        if label == '_mango_id':
            continue

        if utils.pandas_is_numeric(app.dataFrame[label]):
            features.append(label)
        else:
            targets.append(label)

    return flask.jsonify(targets=targets, features=features)


@hierarchycal.post('/hierarchycal/set-targets-and-label')
def set_target_and_feature():
    data = flask.request.get_json()

    state.label_tag = str(data['label'])
    if state.label_tag != '__none__':
        state.labels = app.dataFrame.loc[:, state.label_tag].values
    else:
        state.labels = range(0, len(app.dataFrame.index))

    state.feature_tags = list(data['features'])
    state.features = app.dataFrame.loc[:, state.feature_tags].values

    return flask.jsonify(feedback='Set label and features!')


@hierarchycal.get('/hierarchycal/plot/dendrogram')
def plot_dendrogram():
    linked = linkage(state.features, 'single')

    plt.figure(figsize=(20, 20))
    dendrogram(linked,
               orientation='top',
               labels=state.labels,
               distance_sort='ascending',
               show_leaf_counts=True)

    fig_path = os.path.join(
        utils.plots_app_data_path, f'Dendrogram.{utils.make_uuid()}.jpg')
    plt.savefig(fig_path)

    print(fig_path)

    return flask.jsonify(imagePath=fig_path)


@hierarchycal.post('/hierarchycal/agglomerative-clustering')
def agglomerative():
    data = flask.request.get_json()

    cluster = AgglomerativeClustering(
        n_clusters=data['nClusters'],
        affinity='euclidean',
        linkage='ward')

    cluster.fit_predict(state.features)

    result_df = pd.DataFrame({'Cluster': cluster.labels_}, index=state.labels)

    return flask.jsonify(clusters=result_df.to_dict(orient='split'))
