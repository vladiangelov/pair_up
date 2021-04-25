from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    nickname = models.CharField(
        max_length=100, default=None, blank=True, null=True)

    def __str__(self):
        return f"{self.nickname} with email {self.email}"


class Score(models.Model):
    user = models.ForeignKey(
        "User", on_delete=models.CASCADE, related_name="scores")
    difficulty = models.ForeignKey(
        "Difficulty", on_delete=models.CASCADE, related_name="scores")
    result = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.user.username}'s score of {self.result} on {self.difficulty.name}"


class Difficulty(models.Model):
    name = models.CharField(max_length=32)
    size = models.IntegerField()

    def __str__(self):
        return f"{self.name} is {self.size} cards"
