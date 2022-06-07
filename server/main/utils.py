import os
import shutil
import uuid


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
