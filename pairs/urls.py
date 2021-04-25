from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("your_results", views.your_results, name="your_results"),
    path("rankings", views.rankings, name="rankings"),
    path("rules", views.rules, name="rules"),
    path("settings", views.settings, name="settings"),

    # API Route
    path("submit_result", views.submit_result, name="submit_result")

]
