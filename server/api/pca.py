import os
import random

import main.app as server
import main.utils as utils

import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.decomposition import PCA as skPCA
from sklearn.preprocessing import StandardScaler
from pandas.api.types import is_numeric_dtype as pandas_is_numeric


class PCA:
    cmap = sns.diverging_palette(250, 20, as_cmap=True)

    def __init__(self):
        self.target = ''
        self.features = []

        self.target_values = None
        self.features_values = None

        self.pca = skPCA()
        self.pca_df = pd.DataFrame()

    def set_target(self, target):
        if target not in server.dataFrame.columns:
            raise 'Unknown target'

        self.target = str(target)
        self.target_values = server.dataFrame.loc[:, self.target].values

    def set_features(self, features):
        for feature in features:
            if feature not in server.dataFrame.columns:
                raise 'Unknown feature'

            if not pandas_is_numeric(server.dataFrame[feature]):
                raise 'Cannot use non-numeric features in PCA analysis'

        self.features = list(features)
        self.features_values = server.dataFrame.loc[:, self.features].values

    def plot_correlation_matrix(self):
        corr_matrix = pd.DataFrame(
            data=self.features_values, columns=self.features).corr().round(2)

        plt.figure(figsize=(8, 8))
        mask = np.triu(np.ones_like(corr_matrix, dtype=bool))
        sns.heatmap(corr_matrix, annot=True,
                    vmax=1, vmin=-1, center=0,
                    cmap=self.cmap, mask=mask)

        print(utils.make_uuid())
        figpath = os.path.join(
            utils.plots_app_data_path, f'CorrelationMatrix.{utils.make_uuid()}.jpg')
        plt.savefig(figpath)

        return figpath

    def analyze(self, components_count='all'):
        if components_count == 'all':
            components_count = len(self.features)

        self.pca = skPCA(n_components=components_count)

        principal_components = self.pca.fit_transform(self.features_values)

        self.pca_labels = [f'PC{x}' for x in range(
            1, self.pca.n_components_ + 1)]

        self.pca_df = pd.DataFrame(
            data=principal_components, columns=self.pca_labels)

        self.final_df = pd.concat(
            [server.dataFrame[self.target], self.pca_df], axis=1)

    def plot_kaiser(self):
        pc_values = np.arange(self.pca.n_components_) + 1

        plt.figure(figsize=(8, 8))
        plt.plot(pc_values, self.pca.explained_variance_ratio_,
                 'ro-', linewidth=2)
        plt.title('Scree Plot')
        plt.xlabel('Principal Component')
        plt.ylabel('Proportion of Variance Explained')
        plt.xticks(range(1, self.pca.n_components + 1))

        figpath = os.path.join(
            utils.plots_app_data_path, f'Kaiser-ScreePlot.{utils.make_uuid()}.jpg')
        plt.savefig(figpath)

        return figpath

    def threshold70(self):
        explained_variance_ratio = self.pca.explained_variance_ratio_ * 100
        out_sum = np.cumsum(explained_variance_ratio)

        variance_ratio_df = pd.DataFrame(
            data={
                'Proportion of Variance Explained': list(explained_variance_ratio),
                'Cumulative Proportion of Variance Explained': list(out_sum)},
            columns=[
                'Proportion of Variance Explained',
                'Cumulative Proportion of Variance Explained'],
            index=self.pca_labels)

        return variance_ratio_df

    def eigenvalues_g1(self):
        variance_ratio_df = pd.DataFrame(
            data={
                'Explained Variance': list(self.pca.explained_variance_)},
            columns=[
                'Explained Variance'],
            index=self.pca_labels)

        return variance_ratio_df

    def extract_loadings(self):
        loadings = pd.DataFrame(
            data=self.pca.components_.T.round(3),
            columns=self.pca_labels,
            index=self.features)

        return loadings

    def plot_loadings_matrix(self):
        loadings_matrix = pd.DataFrame(
            data=self.pca.components_.T *
            np.sqrt(self.pca.explained_variance_),
            columns=self.pca_labels,
            index=self.features)

        plt.figure(figsize=(8, 8))
        sns.heatmap(loadings_matrix, annot=True,
                    vmax=1, vmin=-1, center=0,
                    cmap=self.cmap)

        figpath = os.path.join(utils.plots_app_data_path,
                               f'LoadingsMatrix.{utils.make_uuid()}.jpg')
        plt.savefig(figpath)

        return figpath

    def export_loadings_matrix(self, path):
        loadings_matrix = pd.DataFrame(
            data=self.pca.components_.T *
            np.sqrt(self.pca.explained_variance_),
            columns=self.pca_labels,
            index=self.features)

        loadings_matrix.to_csv(path)

    def export_pca(self, path):
        self.final_df.to_csv(path, index=False)

    def plot_two_components(self, title, pc_x, pc_y, targets, annot=False, legend=False):
        fig = plt.figure(figsize=(8, 8))

        ax = fig.add_subplot(1, 1, 1)
        ax.set_xlabel(pc_x, fontsize=15)
        ax.set_ylabel(pc_y, fontsize=15)
        if title != '':
            ax.set_title(title, fontsize=20)

        for obs in targets:
            indices_to_keep = server.dataFrame[self.target] == obs

            x_points = self.final_df.loc[indices_to_keep, pc_x]
            y_points = self.final_df.loc[indices_to_keep, pc_y]

            ax.scatter(x_points, y_points, s=50)
            if annot:
                for x, y in zip(x_points, y_points):
                    ax.annotate(obs, (x, y))

            if legend:
                ax.legend(targets)

        figpath = os.path.join(utils.plots_app_data_path,
                               f'PCA-Plot-{pc_x}-{pc_y}.{utils.make_uuid()}.jpg')
        plt.savefig(figpath)

        return figpath


if __name__ == '__main__':
    pca = PCA()

    server.dataFrame = pd.read_csv(
        'C:/Users/TheAncientOwl/Code/data-analysis-tool/server/test-data/pca-data.agriculture.csv')

    pca.set_target('Country')

    features = list(server.dataFrame.columns)
    features.remove('Country')
    pca.set_features(features)

    # print(pca.features_values)

    # print(pca.plot_correlation_matrix())

    pca.analyze()
    # print(pca.pca_df.head())

    # pca.analyze(4)
    # print(pca.pca_df.head())

    # print(pca.kaiser())

    # print(pca.threshold70().head())

    # print(pca.eigenvalues_g1())

    pca.analyze(4)

    # print(pca.extract_loadings().head())

    # print(pca.plot_loadings_matrix())

    random.seed(893927)
    targets = set(random.sample(
        sorted(server.dataFrame['Country'].values), 10))
    print(pca.plot_two_components(title='PC1 & PC2', pc_x='PC1',
          pc_y='PC2', targets=targets, annot=True))
