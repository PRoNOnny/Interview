# Interview
This application created for job interview 
- interview folder is frontend-app based on Angular project
  there are 2 parts
  1. Shorten url system
  2. Schedule managament 
    **** Don't have database ****
     Share data service which decrease traffic between user and server
     Search pipe which help make it easier to implement search function
     
- backend folder is backend-app based on Node.js
  Shorten Url system design which created 5 unique characters
    Unigue id with 62 characters, can create more than 900M ids 
    Check unique ids and url on Database for every request to prevent the same id and url
  
- database is based on mongoDB
