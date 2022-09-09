'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
 app .use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3001;
mongoose.connect('mongodb+srv://monthertamimi:12345@cluster0.5sdac6r.mongodb.net/?retryWrites=true&w=majority' , {useNewUrlParser :true,
useUnifiedTopology:true });

const bookSchema = new mongoose.Schema({
  title: String,
  description:String,
  states:String,
  email:String,
  name:String,
});

const Book = mongoose.model('books', bookSchema);
// idont read books so i will search in google

async function seedData (){
  const firstBook = new Book({
  title : "The Maid by Nita Prose",
  description:"Nita Proses debut novel has the perfect Clue-like beginning: A grand hotel. A motley cast of personality-rich characters. And, of course, a murder. The storys protagonist is a hotel maid named Molly Gray, who quickly becomes a suspect in the case. Molly sees things a little differently. She notices details that others might miss, but she also struggles to follow social rules that others find natural. Fans of cozy mysteries, locked-room investigations",
  states:"Available",
  email : "test@gmail.com" ,
  name : "ALi"
  })
  const secondBook = new Book({
    title : "Olga Dies Dreaming",
    description:"new fiction book for fans of witty rom-com that aren’t afraid to ask complex questions or tackle tricky topics beneath the veneer of sparkling humor. Set in New York and anchored in time by Puerto Rico’s devastating hurricane Maria, the story follows Olga, a Latinx wedding planner, as she grapples with her own less-than-fairy-tale love story and the return of a long-lost mother",
    states:"Available",
    email : "test33@gmail.com" ,
  name : "Ahmad"
    })

    const thirdBook = new Book({
      title : "To Paradise",
      description:"To Paradise takes place in an alternate New York reality that can be seen as utopian or dystopian, depending on the person’s position in society. Readers will meet characters in 1893, 1993, and 2093. From these disparate times and versions of America, characters survive crises like the AIDS epidemic and totalitarian rule as well as personal, intimate tragedies. Despite the varying plotlines, a common thread pulls every scene together: the question of what makes us human and what makes us love.",
      states:"Available",
      email : "test@gmail.com" ,
  name : "ALi"
      
      
      })
      await  firstBook.save();
      await  secondBook.save();
      await  thirdBook.save();
    }



app.get('/', (request, response) => {

  response.send('test request received')

})

/*
process.env.React_APP_herokurl + `Book/${user.email}`;   FROM OAuth0
*/

app.post('/addBook/:email',addBookHandler);
app.delete('/deleteBook/:id/:email',deleteBookHandler);
app.get('/Books/:email', getTheBestBooks );
app.put('/updateBook/:id/:email',updateBookHandler);

function getTheBestBooks(req,res){
  console.log("GET");
  const name = req.query.name;
  Book.find({email: req.params.email},(err,result) =>{
    if(err){
      console.log(err)
    }
    else 
    {
      res.send(result)
    }
  })
}

async function addBookHandler(req,res) {
  console.log(req.body);
  
  const {title,description,states,name, email} = req.body;
  console.log(title);
  console.log(description);
  console.log(states); //finding the element in the console just to test 
  await Book.create({
      title : title,
      description : description,
      states:states,
      name:name,
      email:email

  });


  Book.find({email:req.params.email},(err,result) =>{
    if(err){
      console.log(err)
    }
    else 
    {
      res.send(result)
    }
  })
}
  
function deleteBookHandler(req,res) {
  const BookId = req.params.id;
  const name = req.query.name;
  Book.deleteOne({_id:BookId},(err,result)=>{
    Book.find({email:req.params.email},(err,result) =>{
      if(err){
        console.log(err)
      }
      else 
      {
        res.send(result)
      }
    })
    
  })

}
async function updateBookHandler(req,res) {
  
  console.log("done")
  const BookId = req.params.id;
  const {title,description,states,name,email} = req.body;
Book.findByIdAndUpdate(BookId,{title,description,states,name},(err,result)=>{
  Book.find({email: req.params.email},(err,result) =>{
    if(err){
      console.log(err)
    }
    else 
    {
      res.send(result)
    }
  })
})

  
  
}
app.listen(PORT, () => console.log(`listening on ${PORT}`));
