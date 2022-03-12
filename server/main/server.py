from flask_cors import CORS
from flask import Flask
import pandas
import blueprints

dataFrame = pandas.DataFrame()

app = Flask(__name__)
CORS(app)

for blueprint in blueprints.all_blueprints:
    app.register_blueprint(blueprint)
