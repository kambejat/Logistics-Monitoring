from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from .views import MyTokenObtainPairView, RegistrationView, UserView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('users', UserView, basename='users')
urlpatterns = [
    path('login/', MyTokenObtainPairView.as_view(), name="token_obtain"),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegistrationView.as_view(), name='register'),
    path('', include(router.urls), name='users'),
]
