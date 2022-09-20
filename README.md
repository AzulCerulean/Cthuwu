# Cthuwu

## About

This is my final project submission for the Concordia full-stack web-dev bootcamp.

Recipe sharing web-app.

Users are able to sign-up and post recipes on the feed.
Social media for sharing, discovering and discussing Recipes

Initially tought of making a tinder-esque recipe sharing app, but for the lack of time and some issues this is it's current form.
Ended up being a social media for sharing recipes.

Here is my initial proposition:
https://docs.google.com/document/d/1ayxvvNkaKH9x4EhpN0Rh3d84nRhfSJw0eXUEhCPAe-A/edit?usp=sharing

This app uses React js on the front-end, Express js in the back-end and MongoDB as a DB.

There were a few issues with trying to make Auth0 to work with MongoDB, including a needed subscription.
I finally settled to do my own user creation and used bcryptjs for password encryption, and a context for keeping the loggedin user data.
It's currently working, but I would probably need to use a JWT for users for better security.

I tried to limit my use of packages as we were supposed to build things from the ground up.


## How to use it

Users are first dropped to the landing page:

![Cthuwu landing page](./assets/Screen%20Shot%202022-08-17%20at%2010.09.49%20AM.png)
![Cthuwu sidebar](./assets/cthuwu%20sidebar.PNG)

You can also nagivigate to the Homepage by clicking on the logo on top or through the sidebar and that should lead a person to the Home feed.

![Cthuwu home feed](./assets/cthuwu%20home%20feed.PNG)

They then can log-in or sign-up by either going to the menu on the top left or the sign-in button on the top right.

Signing in:

![Cthuwu sign-in](./assets/cthuwu%20sign%20in.PNG)
![Cthuwu signed-in](./assets/cthuwu%20user%20signedin.PNG)

Signing up:

![Cthuwu sign-up](./assets/cthuwu%20sign%20up.PNG)
![Cthuwu signed-up](./assets/cthuwu%20user%20created.PNG)

![Cthuwu MongoDB users](./assets/cthuwu%20mongodb%20user.PNG)

Once Signed-in a user can then create a new recipe when opening the sidebar

![Cthuwu sidebar signed-in](./assets/cthuwu%20sidebar%20signedin.PNG)

It leads to the recipe creation page

![Cthuwu create new recipe](./assets/cthuwu%20new%20recipe.PNG)
![Cthuwu new recipe submitted](./assets/cthuwu%20recipe%20created.PNG)

This too creates a new object in MongoDB

The user that created the recipe has some options on on the recipe, they can update it or delete it from here.

![Cthuwu recipe options](./assets/cthuwu%20update%2C%20delete.PNG)

When updating they can update any field in the recipe card, and delete will delete the recipe forever.
