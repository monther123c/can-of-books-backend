'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;
mongoose.connect('mongodb://localhost:27017/books' , {useNewUrlParser :true,
useUnifiedTopology:true });
const bookSchema = new mongoose.Schema({
  title: String,
  description:String,
  states:String,
});
const Book = mongoose.model('books', bookSchema);
// idont read books so i will search in google 
async function seedData (){
  const firstBook = new Book({
  title : "The Maid by Nita Prose",
  description:"Nita Proses debut novel has the perfect Clue-like beginning: A grand hotel. A motley cast of personality-rich characters. And, of course, a murder. The storys protagonist is a hotel maid named Molly Gray, who quickly becomes a suspect in the case. Molly sees things a little differently. She notices details that others might miss, but she also struggles to follow social rules that others find natural. Fans of cozy mysteries, locked-room investigations",
  states:"Available"
  })
  const secondBook = new Book({
    title : "Olga Dies Dreaming",
    description:"new fiction book for fans of witty rom-com that aren’t afraid to ask complex questions or tackle tricky topics beneath the veneer of sparkling humor. Set in New York and anchored in time by Puerto Rico’s devastating hurricane Maria, the story follows Olga, a Latinx wedding planner, as she grapples with her own less-than-fairy-tale love story and the return of a long-lost mother",
    states:"Available"
    })

    const thirdBook = new Book({
      title : "To Paradise",
      description:"To Paradise takes place in an alternate New York reality that can be seen as utopian or dystopian, depending on the person’s position in society. Readers will meet characters in 1893, 1993, and 2093. From these disparate times and versions of America, characters survive crises like the AIDS epidemic and totalitarian rule as well as personal, intimate tragedies. Despite the varying plotlines, a common thread pulls every scene together: the question of what makes us human and what makes us love.",
      states:"Available"
      
      
      })
    }

    await  firstBook.save();
    await  secondBook.save();
    await  thirdBook.save();
   
   
    app.get('/Books', getTheBestBooks );   

    function getTheBestBooks(req,res){
      Book.find({},(err,result) =>{
        if(err){
          console.log(err)
        }
        else 
        {
          res.send(result)
        }
      })
    }

app.get('/', (request, response) => {

  response.send('test request received')

})
app.listen(PORT, () => console.log(`listening on ${PORT}`));
