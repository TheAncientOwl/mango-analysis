from flask_cors import CORS
from flask import Flask
import pandas
import blueprints

dataFrame = pandas.DataFrame()

app = Flask(__name__)
CORS(app)

app.register_blueprint(blueprints.data_import_export)
app.register_blueprint(blueprints.data_drop)
app.register_blueprint(blueprints.data_view)
app.register_blueprint(blueprints.data_scale)
