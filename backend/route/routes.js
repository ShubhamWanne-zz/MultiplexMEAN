const express = require('express');
var router = express.Router();

/*
  To import MongoDB movieSchema
*/
const Movie = require('../model/movie');

router.get('/movies',(req,res,next)=>{
  Movie.find((err, movies)=>{
    if(err){
      res.json(err);
    }else{
      res.json(movies);
    }
  });
});
router.post('/movie',(req,res,next)=>{
  let movie = new Movie({
      movieName: req.body.movieName,
      screenNo: req.body.screenNo,
      showTime: req.body.showTime,
      seatNumber: req.body.seatNumber,
      cost: req.body.cost
  });
  movie.save((err, item)=>{
    if(err) res.json(err);
    else res.json({msg: "Movie has been added successfully!"});
  })
});
router.put('/movie/:id',(req,res,next)=>{
  Movie.findOneAndUpdate(
    {_id: req.params.id},
    {
      $set:{
        movieName: req.body.movieName,
        screenNo: req.body.screenNo,
        showTime: req.body.showTime,
        seatNumber: req.body.seatNumber,
        cost: req.body.cost
      }
    },
    function(err, result){
      if(err) res.json(err);
      else res.json(result);
    }
  );
});
router.delete('/movie/:id',(req,res,next)=>{
  Movie.deleteOne({_id: req.params.id }, (err, result)=>{
    if(err) res.json(err);
    else res.json(result);
  })
});

module.exports = router;
