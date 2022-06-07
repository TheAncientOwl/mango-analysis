import main.app as app
from waitress import serve

if __name__ == "__main__":
    serve(app.server, host='0.0.0.0', port=5000)
