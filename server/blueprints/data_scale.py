import main.app as app
import pandas
import flask
from pandas.api.types import is_numeric_dtype as pandas_is_numeric

data_scale = flask.Blueprint('data_scale', __name__)


def should_scale(column):
    return pandas_is_numeric(app.dataFrame[column]) and column != '_mango_id'


# >> rescales each feature between -1 and 1 by
# dividing every observation by its maximum absolute value
def maximum_absolute_scaling(df):
    df_scaled = df.copy()

    # apply maximum absolute scaling
    for column in df_scaled.columns:
        if should_scale(column):
            df_scaled[column] = df_scaled[column] / \
                df_scaled[column].abs().max()

    return df_scaled


# >> rescales the feature to a fixed range of [0,1] by
# subtracting the minimum value of the feature and then dividing by the range.
def min_max_scaling(df):
    df_scaled = df.copy()

    # apply min-max scaling
    for column in df_scaled.columns:
        if should_scale(column):
            col_min = df_scaled[column].min()
            col_max = df_scaled[column].max()

            df_scaled[column] = (df_scaled[column] -
                                 col_min) / (col_max - col_min)

    return df_scaled


# >> transforms the data into a distribution with a mean of 0 and a standard deviation of 1.
# >> Each standardized value is computed by subtracting
# the mean of the corresponding feature and then dividing by the standard deviation.
def z_score_scaling(df):
    df_scaled = df.copy()

    # apply z-score method
    for column in df_scaled.columns:
        if should_scale(column):
            df_scaled[column] = (
                df_scaled[column] - df_scaled[column].mean()) / df_scaled[column].std(ddof=0)

    return df_scaled


# >> scale each feature of the data set by subtracting the median
# and then dividing by the interquartile range.
# The interquartile range (IQR) = 3rd quartile - 1st quartile
def robust_scaling(df):
    df_scaled = df.copy()

    # applu robust scaling
    for column in df_scaled.columns:
        if should_scale(column):
            iqr = df_scaled[column].quantile(
                0.75) - df_scaled[column].quantile(0.25)

            df_scaled[column] = (df_scaled[column] -
                                 df_scaled[column].median()) / iqr

    return df_scaled


# >> Scale route
# @request-data-format:
# {
#   'method': maximum_absolute_scaling | min_max_scaling | z_score_scaling | robust_scaling
# }
# @return jsonify(success, message)
@data_scale.post('/data/scale')
def scale():
    data = flask.request.get_json()
    scale_method = data['method']

    if scale_method == 'maximum_absolute_scaling':
        app.dataFrame = maximum_absolute_scaling(app.dataFrame)
    elif scale_method == 'min_max_scaling':
        app.dataFrame = min_max_scaling(app.dataFrame)
    elif scale_method == 'z_score_scaling':
        app.dataFrame = z_score_scaling(app.dataFrame)
    elif scale_method == 'robust_scaling':
        app.dataFrame = robust_scaling(app.dataFrame)
    else:
        return flask.jsonify(message="Method not found"), 404

    return flask.jsonify(message="DataFrame scaled"), 200
