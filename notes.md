## standard approach to start
1. npm init
2. bring all required dependencies express mongoose dotenv nodemon  cors...
3. in server folder make src , app.js ,index.js , constant.js 
4. inside src make controller ,db->index.js , utils->API error and API response , models
5. .env bring URI cors orgin* and port
6. constant.js DB_NAME 
7. .gitignore-> for .env and nodemules and etc
8. change script to dev in package.json to "nodemon -r dotenv/config --experimental-json-modules src/index.js"

9. connect data base , make a express app and then listen

## some other notes
1. making model of user  enum:["user","admin"] then role should be either strng1 or string2 not other than this
2.




## how register works 

1. first user send a req at api
2. using react hook form i will take all data from user 
3. since we have to send the files so we have to use formData make a object of formData from FormData()  class and then append all data to that 
4. now using axios.post(
    "url",
    formData,
    {header:
       {
        content-type
       }
    }
    )

5. it will go to server 




