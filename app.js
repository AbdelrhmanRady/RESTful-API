const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require('ejs');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');
mongoose.connect("mongodb+srv://bedobeco:fedb9b30@atlascluster.jdnpzif.mongodb.net/wikiDB");


const schema = new mongoose.Schema({
  title: String,
  content: String
});
const Article = mongoose.model("Article",schema);

app.route("/articles")
.get(function(req,res){
  Article.find({},function(err,docs){
    if(!err){
      res.send(docs);
    }
  });
})
.post(function(req,res){
  const article = new Article({
    title : req.body.title,
    content: req.body.content
  })
  article.save(function(err){
    if(!err){
      res.send("yay");
    }
    else{
      res.send("fuck");
    }
  });
  Article.find({},function(err,docs){
    console.log(docs);
  })
})
.delete(function(req,res){
  Article.deleteMany({},function(err){
    if(!err){
      res.send("success");
    }
    else{
      res.send("fakes");
    }
  })
});

app.route("/articles/:articleName")
.get(function(req,res){
  Article.findOne({title : req.params.articleName},function(err,docs){
    if(docs){
      res.send(docs);
    }
    else{
      res.send("not found");
    }
  });
})
.put(function(req,res){
  Article.findOneAndUpdate(
    {title: req.params.articleName},
    {title: req.body.title,content: req.body.content},
        {overwrite: true},
    function(err){
      if(!err){
        res.send("succs");
      }
      else{
        res.send("damn");
      }
    }
  )
})
.patch(function(req,res){
  Article.updateOne(
    {title: req.params.articleName},
    {$set: req.body},

    function(err){
      if(!err){
        res.send("succs");
      }
      else{
        res.send("damn");
      }
    }
  )
})
.delete(function(req,res){
  Article.deleteOne({title: req.params.articleName},function(err){
    if(!err){
      res.send('successfully deleted');
    }
  });
})




app.listen(3000,function(req,res){
  console.log("rise and shine");
})
