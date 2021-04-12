# autoclip-customEndpoint-example

Note: Setting up a custom endpoint for the autoclip app to point to requires some general programming experience, including javascript, databases, and hosting. This repo is a guide to give users an idea of how they can set up their own endpoint so they can store their own data instead of having autoclip store it

This is an example NODE.js app that points to an example postgres database

Step 1. Clone this repo

Step 2. Navigate to `https://dashboard.heroku.com/apps` and create an account

Step 3. Create a new app in heroku and name it whatever you want. We will use the example example-autoclip-endpoint

Step 4. Create a database with an appropriate table, an example is given in `initDB.sql`. We reccomend using postgres, find out more here `https://www.postgresql.org/docs/9.4/tutorial-start.html` We used the heroku postgres addon and it made the whole experience very easy and user friendly

Step 5. In queries.js replace the credentials in the database credentials section with your own that you just made

Step 6. In your terminal run `heroku git:remote -a custom-endpoint-example`, NOTE: you made need to install heroku and add it to your ~.zshrc file or add it to your command line if you are on a windows machine

Step 7. Now run `git push heroku`. And voila, you have your node datasource hosting locally. Look at the logs in heroku and whatever url it says the app is hosted add that + / + whatever you named your custom endpoint in index.js (the example is /submitanswers) So if heroky says host=custom-endpoint-example.herokuapp.com you would enter `https://custom-endpoint-example.herokuapp.com/submitanswers` in the customDatasource textbox when creating a form

Now all submitted answers to that form will be POST'd to the endpoint you defined via an http request body. For example the submitted answers body may look like:

```
{
    "title": "How many fish did you catch today?",
    "answer": "3",
    "formId": "2",
    "userId": "5"
}
```

LOCALLY/DEBUGGING If you want to run your node endpoint locally just run npm i && npm start if you are on OSX/Linux and have npm installed.
If you want to run the postgres database locally just download postgres & we suggest pgadmin. Run them locally and update the database credentials in queries.js to use your local credentials
