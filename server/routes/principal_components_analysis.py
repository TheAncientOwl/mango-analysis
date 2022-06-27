import os
import flask

import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.decomposition import PCA

import main.app as app
import main.utils as utils


class PCA_State:
    cmap = sns.diverging_palette(250, 20, as_cmap=True)

    def __init__(self):
        self.target = ''
        self.features = ''

        self.target_values = None
        self.features_values = None

        self.pca = PCA()
        self.pca_df = pd.DataFrame()
        self.pca_labels = []

        self.final_df = pd.DataFrame()


statePCA = PCA_State()


principal_components_analysis = flask.Blueprint(
    'principal_components_analysis', __name__)


@principal_components_analysis.post('/pca/new')
def create_new_pca():
    global statePCA
    statePCA = PCA_State()

    return flask.jsonify(feedback='New PCA created!')


@principal_components_analysis.get('/pca/possible-targets-and-features')
def get_possible_targets_and_features():
    columns = app.dataFrame.drop('_mango_id', axis=1).columns.to_list()

    return flask.jsonify(targets=columns, features=columns)


@principal_components_analysis.post('/pca/set-targets-and-features')
def set_targets_and_features():
    data = flask.request.get_json()

    target = data['target']
    features = data['features']

    statePCA.target = str(target)
    statePCA.target_values = app.dataFrame.loc[:, statePCA.target].values

    statePCA.features = list(features)
    statePCA.features_values = app.dataFrame.loc[:, statePCA.features].values

    return flask.jsonify(feedback='Set targets and features!')


@principal_components_analysis.get('/pca/plot/correlation-matrix')
def plot_correlation_matrix():
    corr_matrix = pd.DataFrame(
        data=statePCA.features_values, columns=statePCA.features).corr().round(2)

    plt.figure(figsize=(8, 8))
    mask = np.triu(np.ones_like(corr_matrix, dtype=bool))
    sns.heatmap(corr_matrix, annot=True,
                vmax=1, vmin=-1, center=0,
                cmap=statePCA.cmap, mask=mask)

    fig_path = os.path.join(
        utils.plots_app_data_path, f'CorrelationMatrix.{utils.make_uuid()}.jpg')
    plt.savefig(fig_path)

    return flask.jsonify(imagePath=fig_path)


@principal_components_analysis.post('/pca/analyze')
def analyze():
    data = flask.request.get_json()

    components_count = data['componentsCount'] if data['componentsCount'] != "all" else len(
        statePCA.features)

    statePCA.pca = PCA(n_components=components_count)

    principal_components = statePCA.pca.fit_transform(statePCA.features_values)

    statePCA.pca_labels = [f'PC{x}' for x in range(
        1, statePCA.pca.n_components_ + 1)]

    statePCA.pca_df = pd.DataFrame(
        data=principal_components, columns=statePCA.pca_labels)

    statePCA.final_df = pd.concat(
        [app.dataFrame[statePCA.target], statePCA.pca_df], axis=1)

    return flask.jsonify(feedback='Analyze complete!')


@principal_components_analysis.get('/pca/components-count-hints')
def get_components_count_hints():
    # kaiser
    pc_values = np.arange(statePCA.pca.n_components_) + 1

    plt.figure(figsize=(8, 8))
    plt.plot(pc_values, statePCA.pca.explained_variance_ratio_,
             'ro-', linewidth=2)
    plt.title('Scree Plot')
    plt.xlabel('Principal Component')
    plt.ylabel('Proportion of Variance Explained')
    plt.xticks(range(1, statePCA.pca.n_components + 1))

    kaiser_path = os.path.join(
        utils.plots_app_data_path, f'Kaiser-ScreePlot.{utils.make_uuid()}.jpg')
    plt.savefig(kaiser_path)

    # threshold 70
    explained_variance_ratio = statePCA.pca.explained_variance_ratio_ * 100
    out_sum = np.cumsum(explained_variance_ratio)

    variance_ratio_df = pd.DataFrame(
        data={
            'Proportion of Variance Explained': list(explained_variance_ratio),
            'Cumulative Proportion of Variance Explained': list(out_sum)},
        columns=[
            'Proportion of Variance Explained',
            'Cumulative Proportion of Variance Explained'],
        index=statePCA.pca_labels)
    threshold70 = variance_ratio_df.to_dict(orient='split')

    # eigenvalues_g1
    variance_ratio_df = pd.DataFrame(
        data={
            'Explained Variance': list(statePCA.pca.explained_variance_)},
        columns=[
            'Explained Variance'],
        index=statePCA.pca_labels)
    eigenvalues_g1 = variance_ratio_df.to_dict(orient='split')

    return flask.jsonify(kaiserPath=kaiser_path, threshold70=threshold70, eigenvaluesG1=eigenvalues_g1)


@principal_components_analysis.get('/pca/plot/loadings-matrix')
def plot_loadings_matrix():
    loadings_matrix = pd.DataFrame(
        data=statePCA.pca.components_.T *
        np.sqrt(statePCA.pca.explained_variance_),
        columns=statePCA.pca_labels,
        index=statePCA.features)

    plt.figure(figsize=(8, 8))
    sns.heatmap(loadings_matrix, annot=True,
                vmax=1, vmin=-1, center=0,
                cmap=statePCA.cmap)

    figpath = os.path.join(utils.plots_app_data_path,
                           f'LoadingsMatrix.{utils.make_uuid()}.jpg')
    plt.savefig(figpath)

    return flask.jsonify(imagePath=figpath)


@principal_components_analysis.post('/pca/plot/2D')
def plot_2D():
    data = flask.request.get_json()

    title = data['title']
    pc_x = data['pcX']
    pc_y = data['pcY']
    targets = data['targets']
    annot = data['annot']
    legend = data['legend']

    fig = plt.figure(figsize=(8, 8))

    ax = fig.add_subplot(1, 1, 1)
    ax.set_xlabel(pc_x, fontsize=15)
    ax.set_ylabel(pc_y, fontsize=15)
    if title != '':
        ax.set_title(title, fontsize=20)

    for obs in targets:
        indices_to_keep = app.dataFrame[statePCA.target] == obs

        x_points = statePCA.final_df.loc[indices_to_keep, pc_x]
        y_points = statePCA.final_df.loc[indices_to_keep, pc_y]

        ax.scatter(x_points, y_points, s=50)
        if annot:
            for x, y in zip(x_points, y_points):
                ax.annotate(obs, (x, y))

        if legend:
            ax.legend(targets)

    figpath = os.path.join(utils.plots_app_data_path,
                           f'PCA-Plot-{pc_x}-{pc_y}.{utils.make_uuid()}.jpg')
    plt.savefig(figpath)

    return flask.jsonify(imagePath=figpath)


@principal_components_analysis.get('/pca/labels')
def labels():
    return flask.jsonify(labels=statePCA.pca_labels)


@principal_components_analysis.get('/pca/targets')
def targets():
    return flask.jsonify(targets=app.dataFrame[statePCA.target])


@principal_components_analysis.get('/pca/targets-and-labels')
def targets_and_labels():
    return flask.jsonify(targets=list(app.dataFrame[statePCA.target]), labels=statePCA.pca_labels)


@principal_components_analysis.post('/pca/export-loadings')
def export_loadings():
    data = flask.request.get_json()

    path = data['path']

    try:
        loadings_matrix = pd.DataFrame(
            data=statePCA.pca.components_.T *
            np.sqrt(statePCA.pca.explained_variance_),
            columns=statePCA.pca_labels,
            index=statePCA.features)

        loadings_matrix.to_csv(path)
    except:
        return flask.jsonify(message='Could not save the file!'), 500

    return flask.jsonify(message='File exported!')


@principal_components_analysis.post('/pca/export-pca')
def export_pca():
    data = flask.request.get_json()

    path = data['path']

    try:
        statePCA.final_df.to_csv(path, index=False)
    except:
        return flask.jsonify(message='Could not save the file!'), 500

    return flask.jsonify(message='File exported!'), 200
