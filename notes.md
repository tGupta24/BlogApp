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

5. it will hit the  server all middle ware works now multer add a req.file / files depend on single/fields 
6. now controller  main
7. we apply a async Handler here whenever in controller any error occured it handles by async Handler and async Handler gives it to next() middleware which is
8. we will write this middleware after route in app.js

9. app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
}); now what happens is error will be sent to frontend with the messeage that will we write in controller using this middleware

## Login works 
1. same but just we have to write (cridentialsTrue) in axios req to accept token now token is saved in your browser
2. now whenever you want to hit the secured route you have to send that token using cridential true







