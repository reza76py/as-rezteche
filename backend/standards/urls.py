from django.urls import path
from . import views

urlpatterns = [
    path('standards/', views.StandardListView.as_view(), name='standard-list'),
    path('standards/<str:code>/', views.StandardDetailView.as_view(), name='standard-detail'),
    path('building-classes/', views.BuildingClassListView.as_view(), name='building-class-list'),
    path('rooms/', views.RoomTypeListView.as_view(), name='room-list'),
    path('categories/', views.ProductCategoryListView.as_view(), name='category-list'),
    path('check/', views.check_compliance, name='check-compliance'),

    # NCC Volume tree
    path('ncc-tree/', views.ncc_tree, name='ncc-tree'),
]