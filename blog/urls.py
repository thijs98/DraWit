from django.conf.urls import url
from . import views
from django.contrib import admin

urlpatterns = [
    url(r'^$', views.main, name='main'),
    url(r'^instruction$', views.instruction, name='instruction'),
    url(r'^share$', views.share, name='share'),
    url(r'^accounts/account/$', views.login, name='login'),
    url(r'^post/new/$', views.post_new, name='post_new'),
]
