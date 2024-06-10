from django.contrib.auth.models import AbstractUser
from django.db import models

from accounts.custom import CustomUserManager

ROLES = [('Admin', 'admin'), ('User', 'user')]


class User(AbstractUser):
    role = models.CharField(max_length=10, choices=ROLES, default='user')
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=30, blank=True, null=True, unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    image_url = models.ImageField(upload_to='media/', blank=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = CustomUserManager()

    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'
        ordering = ['-id']
        db_table = 'Users'
