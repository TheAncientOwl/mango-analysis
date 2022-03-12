import main.server as server
from waitress import serve

if __name__ == "__main__":
    serve(server.app, host='0.0.0.0', port=5000)
