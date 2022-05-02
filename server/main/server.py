from flask_cors import CORS
from flask import Flask
import pandas

import blueprints
import api


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
