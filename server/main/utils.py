import os
import shutil
import uuid

from pandas.api.types import is_numeric_dtype as pandas_is_numeric


def make_uuid():
    return str(uuid.uuid4())


app_data_path = os.path.join(str(os.path.expanduser('~')), '.mango-analysis')
plots_app_data_path = os.path.join(app_data_path, 'plots')


def make_dirs(path):
    try:
        os.makedirs(path)
    except FileExistsError:
        pass


def setup_app_dirs():
    # root directory
    make_dirs(app_data_path)

    # plots directory
    shutil.rmtree(plots_app_data_path)
    make_dirs(plots_app_data_path)


def get_numeric_columns(df):
    numeric_columns = []
    for label in df.columns:
        if label == '_mango_id':
            continue
        if pandas_is_numeric(df[label]):
            numeric_columns.append(label)

    return numeric_columns
