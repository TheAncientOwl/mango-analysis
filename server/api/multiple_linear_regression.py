import os

import main.app as server

import flask
import numpy as np
import pandas as pd
from pandas.api.types import is_numeric_dtype as pandas_is_numeric
from sklearn.linear_model import LinearRegression as skLinearRegression
from sklearn.model_selection import train_test_split
from sklearn import metrics
import statsmodels.api as sm


class MultipleLinearRegression():
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

    def run_model(self, x_labels, y_label, test_size, random_state):
        x = server.dataFrame[x_labels].values
        y = server.dataFrame[y_label].values

        # split in train & test
        x_train, x_test, y_train, y_test = train_test_split(
            x, y, test_size=0.33, random_state=42)

        # train the model
        self.model = skLinearRegression()
        self.model.fit(x_train, y_train)

        # predict the results
        y_pred = self.model.predict(x_test)

        # differences dataframe
        self.diff = pd.DataFrame(
            {'Actual Value': y_test, 'Predicted value': y_pred, 'Difference': y_test - y_pred})

        # equation
        coefficient = self.model.coef_
        intercept = self.model.intercept_

        equation = f'Predicted {y_label} = '
        for (label, coeff) in zip(x_labels, coefficient):
            equation += f'({label} * {coeff}) + '
        equation = equation[:-3]

        # mean squared error
        mse = metrics.mean_squared_error(y_test, y_pred)

        # ordinary least-squares (OLS)
        X_stat = sm.add_constant(x_train)
        ols = sm.OLS(y_train, X_stat).fit()

        adj_r_squared = ols.rsquared_adj
        r_squared = ols.rsquared

        return {
            'coeff': list(coefficient),
            'intercept': intercept,
            'equation': equation,
            'mse': mse,
            'rSquaredAdj': adj_r_squared,
            'rSquared': r_squared
        }

    def predict_value(self, value):
        return self.model.predict([value])[0]


if __name__ == '__main__':
    mlr = MultipleLinearRegression()

    server.dataFrame = pd.read_csv(
        'C:\\Users\\TheAncientOwl\\Code\\data-analysis-tool\\server\\test-data\\multiple-linear-regression.csv')

    print('Numeric columns: ', mlr.get_numeric_columns())

    result = mlr.run_model(x_labels=['AT', 'V', 'AP', 'RH'],
                           y_label='PE', test_size=0.33, random_state=42)

    print(result)

    print(mlr.predict_value([14.96, 41.76, 1024.07, 73.17]))
