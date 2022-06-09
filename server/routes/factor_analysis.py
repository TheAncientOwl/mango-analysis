import os
import flask

import pandas as pd

import seaborn as sns
import matplotlib.pyplot as plt

from factor_analyzer import FactorAnalyzer
from factor_analyzer.factor_analyzer import calculate_bartlett_sphericity
from factor_analyzer.factor_analyzer import calculate_kmo

import main.app as app
import main.utils as utils


class StateFactorAnalysis():
    cmap = sns.diverging_palette(250, 20, as_cmap=True)

    def __init__(self):
        self.features = []
        self.features_values = None
        self.fa = FactorAnalyzer()
        self.n_factors = 0


stateFactorAnalysis = StateFactorAnalysis()

factor_analysis = flask.Blueprint('factor_analysis', __name__)


@factor_analysis.post('/factor-analysis/new')
def create_new_factor_analysis():
    global stateFactorAnalysis
    stateFactorAnalysis = StateFactorAnalysis()

    return flask.jsonify(feedback='New FactorAnalysis created!')


@factor_analysis.get('/factor-analysis/possible-features')
def get_possible_features():
    return flask.jsonify(features=utils.get_numeric_columns(app.dataFrame))


@factor_analysis.post('/factor-analysis/set-features')
def set_features():
    data = flask.request.get_json()

    features = data['features']

    stateFactorAnalysis.features = list(features)
    stateFactorAnalysis.features_values = app.dataFrame.loc[:,
                                                            stateFactorAnalysis.features].values

    return flask.jsonify(feedback='Success')


@factor_analysis.get('/factor-analysis/tests/bartlett')
def bartlett():
    chi_square_value, p_value = calculate_bartlett_sphericity(
        stateFactorAnalysis.features_values)

    return flask.jsonify(chiSquareValue=chi_square_value, pValue=p_value)


@factor_analysis.get('/factor-analysis/tests/kmo')
def kmo():
    kmo_all, kmo_model = calculate_kmo(stateFactorAnalysis.features_values)

    return flask.jsonify(kmoModel=kmo_model, kmoAll=list(kmo_all))


@factor_analysis.post('/factor-analysis/default-analysis')
def default_analysis():
    stateFactorAnalysis.n_factors = len(stateFactorAnalysis.features)

    stateFactorAnalysis.fa = FactorAnalyzer(
        n_factors=stateFactorAnalysis.n_factors, rotation=None)
    stateFactorAnalysis.fa.fit_transform(stateFactorAnalysis.features_values)

    return flask.jsonify(feedback='Analysis completed!')


@factor_analysis.post('/factor-analysis/analyze')
def analyze():
    data = flask.request.get_json()

    n_factors = data['nFactors'] if 'nFactors' in data else len(
        stateFactorAnalysis.features)
    rotation = data['rotation'] if 'rotation' in data else None
    if rotation == 'none':
        rotation = None

    stateFactorAnalysis.n_factors = n_factors

    stateFactorAnalysis.fa = FactorAnalyzer(
        n_factors=n_factors, rotation=rotation)
    stateFactorAnalysis.fa.fit_transform(stateFactorAnalysis.features_values)

    return flask.jsonify(feedback='Analysis completed!')


@factor_analysis.get('/factor-analysis/default-hints')
def get_default_hints():
    # scree plot
    ev, v = stateFactorAnalysis.fa.get_eigenvalues()

    dummy_range = range(1, stateFactorAnalysis.n_factors + 1)

    plt.figure(figsize=(8, 8))
    plt.scatter(dummy_range, ev)
    plt.plot(dummy_range, ev)
    plt.title('Scree Plot')
    plt.xlabel('Factors')
    plt.ylabel('Egienvalues')
    plt.grid()

    scree_plot_path = os.path.join(utils.plots_app_data_path,
                                   f'ScreePlot.{utils.make_uuid()}.jpg')
    plt.savefig(scree_plot_path)

    # eigenvalues
    ev, v = stateFactorAnalysis.fa.get_eigenvalues()

    eigenValuesDf = pd.DataFrame(data={'EigenValue': list(ev)},
                                 columns=['EigenValue'],
                                 index=[f'F{x}' for x in range(1, stateFactorAnalysis.n_factors + 1)])

    return flask.jsonify(screePlotPath=scree_plot_path,
                         eigenvalues=eigenValuesDf.to_dict(orient='split'))


@factor_analysis.post('/factor-analysis/run')
def run_analysis():
    data = flask.request.get_json()

    n_factors = data['nFactors']
    rotation = data['rotation']

    if rotation == 'none':
        rotation = None

    stateFactorAnalysis.n_factors = n_factors
    stateFactorAnalysis.fa = FactorAnalyzer(
        n_factors=n_factors, rotation=rotation)
    stateFactorAnalysis.fa.fit_transform(stateFactorAnalysis.features_values)

    # loadings matrix
    loadings_matrix = pd.DataFrame(stateFactorAnalysis.fa.loadings_, index=stateFactorAnalysis.features,
                                   columns=[f'F{x}' for x in range(1, stateFactorAnalysis.n_factors + 1)])

    size = stateFactorAnalysis.n_factors + \
        4 if stateFactorAnalysis.n_factors + 4 > 8 else 8
    plt.figure(figsize=(size, size))
    sns.heatmap(loadings_matrix, annot=True,
                vmax=1, vmin=-1, center=0,
                cmap=stateFactorAnalysis.cmap)

    figpath = os.path.join(utils.plots_app_data_path,
                           f'LoadingsMatrix.{utils.make_uuid()}.jpg')
    plt.savefig(figpath, bbox_inches='tight')

    return flask.jsonify(loadings=loadings_matrix.to_dict(orient='split'), loadingsPath=figpath)
