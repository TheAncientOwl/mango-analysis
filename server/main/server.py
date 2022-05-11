import os
import shutil

from flask_cors import CORS
from flask import Flask
import pandas

import blueprints
import api


data_path = os.path.join(str(os.path.expanduser('~')), '.mango-analysis')
plots_data_path = os.path.join(data_path, 'plots')


def make_dirs(path):
    try:
        os.makedirs(path)
    except FileExistsError:
        pass


def cleanup_dirs(path):
    shutil.rmtree(path)

    make_dirs(path)


make_dirs(data_path)
cleanup_dirs(plots_data_path)


dataFrame = pandas.DataFrame()
pca = api.PCA()
scaled_data = False


def new_pca():
    global pca
    pca = api.PCA()


app = Flask(__name__)
CORS(app)

for blueprint in blueprints.all_blueprints:
    app.register_blueprint(blueprint)
