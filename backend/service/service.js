const connectDB = require('../config/db.js')
const urlDB = require('../models/Url.js')

module.exports.shortIdGenerate = () => {
   var result = ""

   const id = () => {
      var result = '';
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for (var i = 0; i < 5; i++) {
         result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result
   }

   const checkId = (id) => {
      return urlDB.findId(id)
   }

   do{
      result = id()

   } while(checkId(result))

   return result
}