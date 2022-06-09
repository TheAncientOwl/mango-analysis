import os
import shutil
import uuid

from flask_cors import CORS
from flask import Flask

import pandas as pd

from routes import all_routes

from .utils import setup_app_dirs

# App dataframe
dataFrame = pd.DataFrame()

# App dirs
setup_app_dirs()

# Server
server = Flask(__name__)
CORS(server)

for route in all_routes:
    server.register_blueprint(route)
