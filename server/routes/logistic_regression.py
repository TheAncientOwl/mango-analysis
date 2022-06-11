import os
import flask

import pandas as pd
import numpy as np

import matplotlib.pyplot as plt
import seaborn as sns

from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn import metrics

import main.app as app
import main.utils as utils


class StateLogisticRegression():
    cmap = sns.diverging_palette(250, 20, as_cmap=True)

    def __init__(self):
        self.model = LogisticRegression()


stateLogisticRegression = StateLogisticRegression()

logistic_regression = flask.Blueprint('logistic_regression', __name__)


@logistic_regression.post('/logistic-regression/new')
def create_new_logistic_regression():
    global stateLogisticRegression
    stateLogisticRegression = StateLogisticRegression()

    return flask.jsonify(feedback='New LogisticRegression created!')


@logistic_regression.get('/logistic-regression/variables')
def get_variables():
    variables = list(app.dataFrame.columns)
    variables.remove('_mango_id')

    return flask.jsonify(variables=variables)


@logistic_regression.post('/logistic-regression/run-model')
def run_model():
    data = flask.request.get_json()

    x_labels = data['xLabels']
    x_labels = list(x_labels)
    y_label = data['yLabel']
    test_size = data['testSize']
    random_state = data['randomState']
    max_iter = data['maxIter']

    x = app.dataFrame[x_labels].values
    y = app.dataFrame[y_label].values

    # split data
    x_train, x_test, y_train, y_test = train_test_split(
        x, y, test_size=test_size, random_state=random_state)

    # model
    stateLogisticRegression.model = LogisticRegression(max_iter=max_iter)

    stateLogisticRegression.model.fit(x_train, y_train)

    # predict
    y_pred = stateLogisticRegression.model.predict(x_test)

    # confussion matrix
    cnf_matrix = pd.DataFrame(metrics.confusion_matrix(y_test, y_pred))

    # visualize confusion matrix
    class_names = [set(y)]

    fig, ax = plt.subplots()

    tick_marks = np.arange(len(class_names))
    plt.xticks(tick_marks, class_names)
    plt.yticks(tick_marks, class_names)

    sns.heatmap(cnf_matrix, annot=True,
                cmap=stateLogisticRegression.cmap, fmt='g')
    ax.xaxis.set_label_position('top')
    plt.tight_layout()
    plt.title('Confusion matrix', y=1.1)
    plt.ylabel('Actual label')
    plt.xlabel('Predicted label')

    cnf_matrix_path = os.path.join(
        utils.app_data_path, f'ConfusionMatrix.{utils.make_uuid()}.jpg')
    plt.savefig(cnf_matrix_path)

    # confusion matrix evaluation metrics
    accuracy = metrics.accuracy_score(y_test, y_pred)
    precision = metrics.precision_score(y_test, y_pred)
    recall = metrics.recall_score(y_test, y_pred)

    # ROC Curve
    y_pred_proba = stateLogisticRegression.model.predict_proba(x_test)[::, 1]
    fpr, tpr, _ = metrics.roc_curve(y_test, y_pred_proba)
    auc = metrics.roc_auc_score(y_test, y_pred_proba)
    plt.plot(fpr, tpr, label="data 1, auc="+str(auc))
    plt.legend(loc=4)

    roc_path = os.path.join(utils.app_data_path,
                            f'ROC_Curve.{utils.make_uuid()}.jpg')
    plt.savefig(roc_path)

    # return
    return flask.jsonify(confusionMatrix={
        'data': cnf_matrix.to_dict(orient='split'),
        'figPath': cnf_matrix_path,
        'metrics': {
            'accuracy': accuracy,
            'precision': precision,
            'recall': recall
        }
    }, rocCurve=roc_path)


@logistic_regression.post('/logistic-regression/predict')
def predict():
    data = flask.request.get_json()

    values = data['values']

    return flask.jsonify(prediction=int(stateLogisticRegression.model.predict([values])[0]))
