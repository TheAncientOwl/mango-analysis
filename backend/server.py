from flask_cors import CORS
from flask import Flask

import blueprints
import server_data

server_data.init()

app = Flask(__name__)
CORS(app)

app.register_blueprint(blueprints.data)
app.register_blueprint(blueprints.plots.plot)

if __name__ == '__main__':
    app.run(debug=True)
