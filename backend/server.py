from flask import Flask
from flask_cors import CORS
import blueprints.data

if __name__ == "__main__":
    app = Flask(__name__)
    CORS(app)

    app.register_blueprint(blueprints.data.data)

    app.run(debug=True)
