import os

import main.app as server
import main.utils as utils

import pandas as pd
import numpy as np
import seaborn as sns
from pandas.api.types import is_numeric_dtype as pandas_is_numeric
from factor_analyzer import FactorAnalyzer
from factor_analyzer.factor_analyzer import calculate_bartlett_sphericity
from factor_analyzer.factor_analyzer import calculate_kmo
import matplotlib.pyplot as plt


class FactorAnalysis:
    cmap = sns.diverging_palette(250, 20, as_cmap=True)

    def __init__(self):
        self.features = []
        self.features_values = None
        self.fa = FactorAnalyzer()
        self.n_factors = 0

    def get_possible_features(self):
        features = []
        for label in server.dataFrame.columns:
            if label == '_mango_id':
                continue
            if pandas_is_numeric(server.dataFrame[label]):
                features.append(label)

        return features

    def set_features(self, features):
        for feature in features:
            if feature not in server.dataFrame.columns:
                raise 'Unknown feature'

            if not pandas_is_numeric(server.dataFrame[feature]):
                raise 'Cannot use non-numeric features in PCA analysis'

            self.features = list(features)
            self.features_values = server.dataFrame.loc[:,
                                                        self.features].values

    def bartlett(self):
        chi_square_value, p_value = calculate_bartlett_sphericity(
            self.features_values)

        return (chi_square_value, p_value)

    def kmo(self):
        kmo_all, kmo_model = calculate_kmo(self.features_values)

        return kmo_model

    def analyze(self, n_factors='all', rotation=None):
        if n_factors == 'all':
            n_factors = len(self.features)
        self.n_factors = n_factors

        self.fa = FactorAnalyzer(n_factors=n_factors, rotation=rotation)
        self.fa.fit_transform(self.features_values)

    def plot_scree_plot(self):
        ev, v = self.fa.get_eigenvalues()

        dummy_range = range(1, self.n_factors + 1)

        plt.figure(figsize=(8, 8))
        plt.scatter(dummy_range, ev)
        plt.plot(dummy_range, ev)
        plt.title('Scree Plot')
        plt.xlabel('Factors')
        plt.ylabel('Egienvalues')
        plt.grid()

        figpath = os.path.join(utils.plots_app_data_path,
                               f'ScreePlot.{utils.make_uuid()}.jpg')
        plt.savefig(figpath)

        return figpath

    def plot_loadings_matrix(self):
        loadings_matrix = pd.DataFrame(self.fa.loadings_, index=self.features,
                                       columns=[f'F{x}' for x in range(1, self.n_factors + 1)])

        plt.figure(figsize=(8, 8))
        sns.heatmap(loadings_matrix, annot=True,
                    vmax=1, vmin=-1, center=0,
                    cmap=self.cmap)

        figpath = os.path.join(utils.plots_app_data_path,
                               f'LoadingsMatrix.{utils.make_uuid()}.jpg')
        plt.savefig(figpath)

        return figpath

    def plot_communalities(self):
        plt.figure(figsize=(8, 8))

        plt.bar(self.features, height=self.fa.get_communalities())
        plt.grid(axis='y')

        figpath = os.path.join(utils.plots_app_data_path,
                               f'Communalities.{utils.make_uuid()}.jpg')
        plt.savefig(figpath)

        return figpath

    def get_eigen_values(self):
        ev, v = self.fa.get_eigenvalues()

        return pd.DataFrame(data={'EigenValue': list(ev)},
                            columns=['EigenValue'],
                            index=[f'F{x}' for x in range(1, self.n_factors + 1)])

    def run_analysis(self, n_factors, rotation):
        if rotation == 'none':
            rotation = None

        self.n_factors = n_factors
        self.fa = FactorAnalyzer(n_factors=n_factors, rotation=rotation)
        self.fa.fit_transform(self.features_values)

        # loadings matrix
        loadings_matrix = pd.DataFrame(self.fa.loadings_, index=self.features,
                                       columns=[f'F{x}' for x in range(1, self.n_factors + 1)])

        size = self.n_factors + 4 if self.n_factors + 4 > 8 else 8
        plt.figure(figsize=(size, size))
        sns.heatmap(loadings_matrix, annot=True,
                    vmax=1, vmin=-1, center=0,
                    cmap=self.cmap)

        figpath = os.path.join(utils.plots_app_data_path,
                               f'LoadingsMatrix.{utils.make_uuid()}.jpg')
        plt.savefig(figpath, bbox_inches='tight')

        return {'loadings': loadings_matrix, 'loadingsPath': figpath}


if __name__ == '__main__':
    fa = FactorAnalysis()

    server.dataFrame = pd.read_csv(
        'C:\\Users\\TheAncientOwl\\Code\\data-analysis-tool\\server\\test-data\\factor-analysis-bfi.csv')
    server.dataFrame.dropna(inplace=True)

    fa.set_features(['A1', 'A2', 'A3', 'A4', 'A5', 'C1', 'C2', 'C3', 'C4', 'C5', 'E1', 'E2',
                     'E3', 'E4', 'E5', 'N1', 'N2', 'N3', 'N4', 'N5', 'O1', 'O2', 'O3', 'O4',
                     'O5'])

    print('Bartlett:', fa.bartlett())

    print('KMO:', fa.kmo())

    fa.analyze()
    print('Scree Plot:', fa.plot_scree_plot())

    fa.analyze(n_factors=6)
    print('Loadings Matrix:', fa.plot_loadings_matrix())
    print('Communalities:', fa.plot_communalities())
