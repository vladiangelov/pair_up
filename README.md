# Requirements covered

This is my final project, called Pair Up - it is an interactive web browser based game, where the player matches pairs of cards. Players can register, login, play, view their score and rankings in different categories of difficulty and change their settings.

The project is drawing on all the previous lessons (being more JavaScript-oriented, than Django-oriented) and includes the following:

1. A Django back-end with three models - User, Score and Difficuly. There are multiple views, one of which (submit_result) is an API endpoint for the front-end to submit scores for each game. SQLite is used as a database.

2. A vanilla JavaScript front-end, written mostly in a close to functional programming style, rather than object oriented, which is showing the interactive gameplay (consisting of level choice, actual game and result screens) and settings screen. It also sends a post request to the Django API, in order to submit a result after each game.

3. In the settings screen, the browser's localStorage is utilised as a way to save the player's preferences, about card deck icons.

4. The application is mobile responsive, using media queries and for the game specifically flexbox's flex-wrap: wrap option, in order to distribute the game cards evenly on the game screen.

I believe it is sufficiently distinct from all the projects so far and more complex, due to building quite a complex functional JS front-end, together with an async API call and building an API endpoint on the back-end. Completely custom CSS has been used, instead of pre-built systems like Bootstrap (including styling forms). As well as accessing localStorage for storing user settings.

# File contents

There are four main types of files:

1. Django (Python) files - the main structure of the backend - I will describe the three main ones:

- views.py - handling the logic for registering/logging-in and out and viewing the different screens with the appropriate DB queries, and data being sent to the templates. There is one view that serves as an API endpoint for the front-end to submit scores after each game.
- models.py - Django's ORM requires defining each model from the DB here, so that it can be used in the views. There are two custom models (Score and Difficulty), as well as a generic model inheriting from AbstractUser to handle users and authentication and authorisation.
- urls.py - handling the routes of the application (connecting the URL to the views functions)

2. Templates (HTML) files - there is a layout.html file, which includes the navbar and a partial template for each view.

3. Styling (CSS) files - there is nearly a file per template with unique classes being used (all being imported in styles.css, which is imported in the HTML), some of the CSS is a bit more generic. It could be further optimised by grouping multiple buttons within the same CSS selector, in a component-style CSS. No preprocessors used.

4. JavaScript files - this is the core of the application:
   There are three javascript files, imported into the HTML:

- settings.js - this script is only used on the settings screen, in order to render the options for decks and store user's choice in localStorage.
- mobileMenu.js - this script is used in the global layout and handles the click event on the hamburger menu for smaller screen sizes. I have built a relatively simple mobile menu, instead of using pre-built ones.
- play.js - this is the main part of the application and imports files from all other JS files. It holds the state of the game in a JS object and includes functions to start a new game (by adding three separate event listeners for each difficulty of the game), make a move within the game and evaluate the moves (checking for matching/non-matching pairs and end of game).
- const.js - this files only includes some constants to be used (pairs needed to win a game for each difficulty, as well as font-awesome based decks of cards).
- getDeck.js - this file gets the constant from above and generates a JS object that contains a shuffled version of the deck, generated by duplicating each value, in order to generate a matching card and shuffling to create a random position.
- matchPairs.js - this file contains the logic that handles card match checking and events after cards are successfully matched - mark the cards as matched, change the classes and create animation.
- score.js - this file handles score calculation after the end of the game, building the payload for the API call and submitting the score to the DJango API endpoint.
- timer.js - this file contains a simple JS timer, using setInterval JS built in method.
- updateDOM.js - this file contains most of the logic that updates the DOM during the game. Hiding and showing the game screens (choose level, game, result). Also building and showing the cards deck, showing/hiding cards and updating move counts.
- utils.js - contains only one function (sleepFor), which creates a Promise to be used by the async functions in order to create a delay when cards are being turned, so that the player can see the icons.

# How to run the application

In order to run the application you need to:

1. Install python and Django.
2. Run `python3 manage.py makemigrations pairs`
3. Run `python3 manage.py migrate`
4. Run `python3 manage.py runserver`
5. Create an account, login and play! :)

# Additional information

Initially I was attempting to use the React library for the entire front-end. As I wanted to use it as a separate app (instead of just using components - I don't like that approach), this implied some sort of authentication (i.e. session or JWT-based), which I found quite challenging with my limited Django knowledge. If I had more time, I would have used that approach.
