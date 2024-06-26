from django.urls import path, include
from . import views
from .views import login_view, register_view


urlpatterns = [
    path('', views.main, name='main'),
    path('login/', login_view, name='login'),
    path('register/', register_view, name='register'),
    path('accounts/', include('django.contrib.auth.urls')),
    path('load-more-records/', views.load_more_records, name='load_more_records'),
    path('load-more-exercises/', views.load_more_exercises, name='load_more_exercises'),
    path('load-more-trivia/', views.load_more_trivia, name='load_more_trivia'),
    path('load-more-funfacts/', views.load_more_funfacts, name='load_more_funfacts'),
    path('articulators/', views.articulator_list, name='articulator_list'),
    path('articulators/add/', views.articulator_add, name='articulator_add'),
    path('articulators/<int:pk>/edit/', views.articulator_edit, name='articulator_edit'),
    path('articulators/<int:pk>/delete/', views.articulator_delete, name='articulator_delete'),
    path('exercises/', views.exercise_list, name='exercise_list'),
    path('exercises/add/', views.exercise_add, name='exercise_add'),
    path('exercises/<int:pk>/edit/', views.exercise_edit, name='exercise_edit'),
    path('exercises/<int:pk>/delete/', views.exercise_delete, name='exercise_delete'),
    path('twisters/', views.twister_list, name='twister_list'),
    path('twisters/add/', views.twister_add, name='twister_add'),
    path('twisters/<int:pk>/edit/', views.twister_edit, name='twister_edit'),
    path('twisters/<int:pk>/delete/', views.twister_delete, name='twister_delete'),
    path('trivia/', views.trivia_list, name='trivia_list'),
    path('trivia/add/', views.trivia_add, name='trivia_add'),
    path('trivia/<int:pk>/edit/', views.trivia_edit, name='trivia_edit'),
    path('trivia/<int:pk>/delete/', views.trivia_delete, name='trivia_delete'),
    path('funfacts/', views.funfact_list, name='funfact_list'),
    path('funfacts/add/', views.funfact_add, name='funfact_add'),
    path('funfacts/<int:pk>/edit/', views.funfact_edit, name='funfact_edit'),
    path('funfacts/<int:pk>/delete/', views.funfact_delete, name='funfact_delete'),
]
