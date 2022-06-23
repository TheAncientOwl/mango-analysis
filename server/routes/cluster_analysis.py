import os
import flask

import main.app as app
import main.utils as utils


class ClusterAnalysis_State:
    def __init__(self):
        pass


state = ClusterAnalysis_State()

cluster_analysis = flask.Blueprint('cluster_analysis', __name__)


@cluster_analysis.post('/cluster-analysis/new')
def create_new_cluster_analysis():
    global state
    state = ClusterAnalysis_State()

    return flask.jsonify(feedback='New Cluster analysis created!')
