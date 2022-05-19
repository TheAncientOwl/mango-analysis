from .data_import_export import data_import_export
from .data_drop import data_drop
from .data_view import data_view
from .data_scale import data_scale

from .pca import pca
from .factor_analysis import factor_analysis

all_blueprints = [data_import_export, data_drop,
                  data_view, data_scale, pca, factor_analysis]
