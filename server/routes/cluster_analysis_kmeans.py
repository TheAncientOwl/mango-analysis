import os
import flask

import pandas as pd

from kneed import KneeLocator
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score

import matplotlib.pyplot as plt

import main.app as app
import main.utils as utils


class KMeans_State:
    def __init__(self):
        self.label_tag = '__none__'
        self.feature_tags = []

        self.labels = []
        self.features = []


state = KMeans_State()

kmeans = flask.Blueprint('kmeans', __name__)


@kmeans.post('/kmeans/new')
def create_new_cluster_analysis():
    global state
    state = KMeans_State()

    return flask.jsonify(feedback='New Cluster analysis (KMeans) created!')


@kmeans.get('/kmeans/possible-labels-and-features')
def get_possible_targets_and_features():
    labels = []
    features = []

    for label in app.dataFrame.columns:
        if label == '_mango_id':
            continue

        if utils.pandas_is_numeric(app.dataFrame[label]):
            features.append(label)
        else:
            labels.append(label)

    return flask.jsonify(labels=labels, features=features)


@kmeans.post('/kmeans/set-targets-and-label')
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


@kmeans.post('/kmeans/plot/elbow')
def get_elbow_plot():
    data = flask.request.get_json()

    kmeans_kwargs = kmeans_kwargs = {
        'init': data['init'],
        'n_init': data['nInit'],
        'max_iter': data['maxIter'],
        'random_state': data['randomState']
    }

    sse = []
    for k in range(1, 11):
        kmeans = KMeans(n_clusters=k, **kmeans_kwargs)
        kmeans.fit(state.features)
        sse.append(kmeans.inertia_)

    plt.figure(figsize=(8, 8))
    plt.style.use('fivethirtyeight')
    plt.plot(range(1, 11), sse, linewidth=3)
    plt.xticks(range(1, 11))
    plt.xlabel('Number of Clusters')
    plt.ylabel('SSE')

    kneeLocator = KneeLocator(range(1, 11), sse,
                              curve='convex', direction='decreasing')

    kneeLocator.elbow
    plt.vlines(x=kneeLocator.elbow, ymin=0, ymax=max(sse),
               colors='red', linewidth=2.0, linestyles='dashed')

    fig_path = os.path.join(
        utils.plots_app_data_path, f'ElbowPlot.{utils.make_uuid()}.jpg')
    plt.savefig(fig_path)

    return flask.jsonify(imagePath=fig_path)


@kmeans.post('/kmeans/plot/silhouette')
def get_silhouette():
    data = flask.request.get_json()

    kmeans_kwargs = kmeans_kwargs = {
        'init': data['init'],
        'n_init': data['nInit'],
        'max_iter': data['maxIter'],
        'random_state': data['randomState']
    }

    scores = []

    for k in range(2, 11):
        kmeans = KMeans(n_clusters=k, **kmeans_kwargs)
        kmeans.fit(state.features)
        score = silhouette_score(state.features, kmeans.labels_)
        scores.append(score)

    plt.figure(figsize=(8, 8))
    plt.style.use("fivethirtyeight")
    plt.plot(range(2, 11), scores, linewidth=3)
    plt.xticks(range(2, 11))
    plt.xlabel("Number of Clusters")
    plt.ylabel("Silhouette Coefficient")

    fig_path = os.path.join(
        utils.plots_app_data_path, f'SilhouettePlot.{utils.make_uuid()}.jpg')
    plt.savefig(fig_path)

    return flask.jsonify(imagePath=fig_path)


@kmeans.post('/kmeans/cluster')
def cluster():
    data = flask.request.get_json()

    kmeans = KMeans(
        init=data['init'],
        n_clusters=data['nClusters'],
        n_init=data['nInit'],
        max_iter=data['maxIter'],
        random_state=data['randomState']
    )

    kmeans.fit(state.features)

    centers_df = pd.DataFrame(kmeans.cluster_centers_,
                              columns=state.feature_tags)
    centers_df['__Cluster'] = index = [
        f'Cluster {x}' for x in range(0, len(kmeans.cluster_centers_))]
    centers_df.set_index('__Cluster', inplace=True)

    result_df = pd.DataFrame({'Cluster': kmeans.labels_})
    if (state.label_tag != '__none__'):
        result_df.index = state.labels

    return flask.jsonify(
        inertia=kmeans.inertia_,
        clusterCenters=centers_df.to_dict(orient='split'),
        nIter=kmeans.n_iter_,
        clusters=result_df.to_dict(orient='split')
    )
