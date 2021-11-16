from flask_cors import CORS
from flask import Flask

import blueprints.data
import server_data

server_data.init()

app = Flask(__name__)
CORS(app)

app.register_blueprint(blueprints.data.data)

if __name__ == "__main__":
    app.run(debug=True)
