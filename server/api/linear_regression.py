import os

import main.server as server

import flask
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from pandas.api.types import is_numeric_dtype as pandas_is_numeric
from sklearn.linear_model import LinearRegression as skLinearRegression
from sklearn.model_selection import train_test_split
from sklearn import metrics
import statsmodels.api as sm


class LinearRegression():
    def __init__(self):
        self.model = skLinearRegression()

    def get_numeric_columns(self):
        numeric_columns = []
        for label in server.dataFrame.columns:
            if label == '_mango_id':
                continue
            if pandas_is_numeric(server.dataFrame[label]):
                numeric_columns.append(label)

        return numeric_columns

    def run_model(self, X_label, y_label, test_size, random_state):
        X = server.dataFrame[X_label].values.reshape(-1, 1)
        y = server.dataFrame[y_label].values

        # split in train & test
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=test_size, random_state=random_state
        )

        # run the model
        self.model = skLinearRegression()
        self.model.fit(X_train, y_train)

        # predict y from linear model
        y_pred = self.model.predict(X_test)

        # >> plot training set
        plt.figure(figsize=(8, 8))
        plt.scatter(X_train, y_train, color='red', marker='X')
        plt.plot(X_train, self.model.predict(X_train), color='blue')
        plt.title('Training Set')
        plt.xlabel(X_label)
        plt.ylabel(y_label)

        training_path = os.path.join(server.plots_data_path,
                                     f'TrainingSet.{server.make_uuid()}.jpg')
        plt.savefig(training_path)

        # >> plot test set
        plt.figure(figsize=(8, 8))
        plt.scatter(X_test, y_test, color='black', marker='X')
        plt.plot(X_train, self.model.predict(X_train), color='blue')
        plt.title('Test set')
        plt.xlabel(X_label)
        plt.ylabel(y_label)

        test_path = os.path.join(server.plots_data_path,
                                 f'TestSet.{server.make_uuid()}.jpg')
        plt.savefig(test_path)

        # equation
        coefficient = self.model.coef_[0]
        intercept = self.model.intercept_

        equation = f'Predicted {y_label} = {coefficient} * {X_label} + {intercept}'

        # mean squared error
        mse = metrics.mean_squared_error(y_test, y_pred)

        # ordinary least-squares (OLS)
        X_stat = sm.add_constant(X_train)
        ols = sm.OLS(y_train, X_stat).fit()

        adj_r_squared = ols.rsquared_adj
        r_squared = ols.rsquared

        # return
        return {
            'trainPath': training_path,
            'testPath': test_path,
            'coeff': coefficient,
            'intercept': intercept,
            'equation': equation,
            'mse': mse,
            'rSquaredAdj': adj_r_squared,
            'rSquared': r_squared
        }

    def predict_value(self, value):
        return self.model.predict([[value]])[0]


if __name__ == '__main__':
    lr = LinearRegression()

    server.dataFrame = pd.read_csv(
        'C:\\Users\\TheAncientOwl\\Code\\data-analysis-tool\\server\\test-data\\linear-regression.salary-data.csv')

    print('Numeric columns: ', lr.get_numeric_columns())

    result = lr.run_model(X_label='YearsExperience',
                          y_label='Salary', test_size=0.33, random_state=42)

    print(result)

    print(lr.predict_value(11))
