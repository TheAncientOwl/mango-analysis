from .data_import_export import data_import_export
from .data_drop import data_drop
from .data_view import data_view
from .data_scale import data_scale

from .principal_components_analysis import principal_components_analysis
from .linear_regression import linear_regression
from .factor_analysis import factor_analysis

all_routes = [data_import_export, data_drop, data_view,
              data_scale, principal_components_analysis, linear_regression, factor_analysis]
