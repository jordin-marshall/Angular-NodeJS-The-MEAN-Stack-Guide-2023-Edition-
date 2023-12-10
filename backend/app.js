require('dotenv').config()

const bodyParser = require('body-parser');
const express = require('express')
const mongoose = require('mongoose')
//const cors = require('cors');


const Post = require('./models/post')
// console.log(process.env) // remove this

const app = express()
// app.use(cors());

mongoose.connect(process.env.DB_CONNECTION).then(() => {
  console.log("DB Connection Successful")
}).catch(()=> {
  console.log("Failed to connection to DB Connection Successfully")
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next()
});

app.get( "/api/posts", (req, res, next) => {
  /* const posts = [
    {
      id: "1",
      content: "My first post",
      description: "first post description",
      title: "WE POSTED",
    },
    {
      id: "2",
      content: "2nd post content",
      description: "describing post #2",
      title: "Post #2",
    },
  ]*/

  Post.find().then((posts) => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: posts
    })
  })

})

app.post("/api/post", (req, res, next) => {
  const post = new Post(req.body)
  // const post = new Post({
  //   'content': req.body.content,
  //   'description': req.body.description,
  //   'title': req.body.title
  // })

  post.save().then((responseData) => {
    console.log('post', post)
    console.log('res data', responseData)
    res.status(201).json({
      message: 'Post added successfully',
      postId: responseData._id
    })
    next()
  })

})

app.delete("/api/posts/:id", (req, res, next) => {
  console.log("post id:", req.params.id)
  Post.deleteOne({_id: req.params.id})
    .then((result) => {
      console.log("result", result)
      res.status(200).json({
        message: 'Post Deleted'
      })
    })
})
// app.use((req, res, next) => {
//   res.send("Hello From Express")
// })


// app.use((req, res, next) => {

// })

module.exports = app
