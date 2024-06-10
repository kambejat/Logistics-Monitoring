from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.password_validation import validate_password as django_validate_password
from django.core.exceptions import ValidationError as DjangoValidationError


from backend import settings
from .models import User


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        if user.email:
            token["username"] = user.email
        else:
            token["username"] = user.username

        token["first_name"] = user.first_name
        token["last_name"] = user.last_name
        token["role"] = user.role

        # Check if the user has an image URL
        if user.image_url:
            token["image_url"] = settings.BASE_URL + user.image_url.url
        else:
            token["image_url"] = None
        return token

    def validate(self, attrs):
        try:
            data = super().validate(attrs)
        except serializers.ValidationError as e:
            errors = {}
            for field, messages in e.detail.items():
                if field == "password" or field == "email":
                    errors[field] = messages[0]  # Take the first error message for the field
                else:
                    errors["detail"] = messages[0]  # For other fields, add to the general detail error
            raise serializers.ValidationError(errors)

        return data


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all(), message="A user with this email already exists.")]
    )
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    image_url = serializers.ImageField(required=False)

    class Meta:
        model = User
        fields = ['email', 'password', 'password2', 'first_name', 'last_name', 'image_url']

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        # Remove password2 from validated_data as it is not part of the User model
        validated_data.pop('password2')

        # Handle optional image_url
        image_url = validated_data.pop('image_url', None)

        user = User.objects.create(
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
        )

        if image_url:
            user.image_url = image_url

        user.set_password(validated_data['password'])
        user.save()

        return user


class UserSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField('get_image_url')
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'password', 'email', 'first_name', 'last_name', 'role', 'image_url']

    def get_image_url(self, obj):
        if obj.image_url:
            return settings.BASE_URL + obj.image_url.url
        else:
            return None

    def validate_password(self, value):
        try:
            django_validate_password(value)
        except DjangoValidationError as exc:
            raise serializers.ValidationError(str(exc))
        return value

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        if password:
            validated_data['password'] = make_password(password)
        return super().update(instance, validated_data)