import os
import shutil
import uuid

from flask_cors import CORS
from flask import Flask

import pandas as pd

from blueprints import all_blueprints
import api

from .utils import setup_app_dirs

# App state
dataFrame = pd.DataFrame()

pca = api.PCA()
factor_analysis = api.FactorAnalysis()
linear_regression = api.LinearRegression()


def new_pca():
    global pca
    pca = api.PCA()


def new_factor_analysis():
    global factor_analysis
    factor_analysis = api.FactorAnalysis()


def new_linear_regression():
    global linear_regression
    linear_regression = api.LinearRegression()


# App dirs
setup_app_dirs()

# Server
server = Flask(__name__)
CORS(server)

for blueprint in all_blueprints:
    server.register_blueprint(blueprint)
