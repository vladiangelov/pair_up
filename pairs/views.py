import json

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import JsonResponse
from django.shortcuts import HttpResponse, HttpResponseRedirect, render
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt

from .models import Difficulty, Score, User


def index(request):

    # Authenticated users can see the game
    if request.user.is_authenticated:
        return render(request, "pairs/play.html")

    # Everyone else is prompted to sign in
    else:
        return HttpResponseRedirect(reverse("login"))


@csrf_exempt
@login_required
def submit_result(request):

    # Composing a new email must be via POST
    if request.method != "POST":
        return JsonResponse({"error": "POST request required."}, status=400)

    # Check recipient emails
    data = json.loads(request.body)
    difficulty = Difficulty.objects.get(name=data['difficulty'])

    score = Score(
        user=request.user,
        result=data['score'],
        difficulty=difficulty
    )
    score.save()

    return JsonResponse({"message": "Score saved"}, status=201)


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        email = request.POST["email"]
        password = request.POST["password"]
        user = authenticate(request, username=email, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "pairs/login.html", {
                "message": "Invalid email and/or password."
            })
    else:
        return render(request, "pairs/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        nickname = request.POST["nickname"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "pairs/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(email, email, password)
            user.nickname = nickname
            user.save()
        except IntegrityError as e:
            print(e)
            return render(request, "pairs/register.html", {
                "message": "Email address already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "pairs/register.html")


def your_results(request):
    # Authenticated users can see their results
    if request.user.is_authenticated:
        scores = Score.objects.filter(
            user=request.user).order_by('-id')[:10]
        return render(request, "pairs/your_results.html", {
            'scores': scores
        })

    # Everyone else is prompted to sign in
    else:
        return HttpResponseRedirect(reverse("login"))


def settings(request):
    # Authenticated users can see their settings
    if request.user.is_authenticated:
        scores = Score.objects.filter(user=request.user)[:10]
        return render(request, "pairs/settings.html", {
            'scores': scores
        })

    # Everyone else is prompted to sign in
    else:
        return HttpResponseRedirect(reverse("login"))


def rankings(request):
    easy_difficulty = Difficulty.objects.get(name='Easy')
    normal_difficulty = Difficulty.objects.get(name='Normal')
    difficult_difficulty = Difficulty.objects.get(name='Difficult')
    easy_scores = Score.objects.filter(
        difficulty=easy_difficulty).order_by('-result')[:10]
    normal_scores = Score.objects.filter(
        difficulty=normal_difficulty).order_by('-result')[:10]
    difficult_scores = Score.objects.filter(
        difficulty=difficult_difficulty).order_by('-result')[:10]
    return render(request, "pairs/rankings.html", {
        'easy_scores': easy_scores,
        'normal_scores': normal_scores,
        'difficult_scores': difficult_scores
    })


def rules(request):
    return render(request, "pairs/rules.html", {
    })
