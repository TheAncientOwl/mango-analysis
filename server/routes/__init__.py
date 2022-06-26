from .data_import_export import data_import_export
from .data_drop import data_drop
from .data_view import data_view
from .data_scale import data_scale

from .principal_components_analysis import principal_components_analysis
from .linear_regression import linear_regression
from .factor_analysis import factor_analysis
from .logistic_regression import logistic_regression
from .correspondence_analysis import correspondence_analysis
from .cluster_analysis_kmeans import kmeans
from .cluster_analysis_hierarchycal import hierarchycal
from .knn import knn
from .som import som
from .svm import svm

all_routes = [
    data_import_export,
    data_drop,
    data_view,
    data_scale,
    principal_components_analysis,
    linear_regression,
    factor_analysis,
    logistic_regression,
    correspondence_analysis,
    kmeans,
    hierarchycal,
    knn,
    som,
    svm
]
