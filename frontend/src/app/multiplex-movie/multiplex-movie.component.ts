import { Component, OnInit } from '@angular/core';
import { Movie } from '../../../model/movie';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';
import { MessageService} from "../message.service";
@Component({
  selector: 'app-multiplex-movie',
  templateUrl: './multiplex-movie.component.html',
  styleUrls: ['./multiplex-movie.component.css']
})
export class MultiplexMovieComponent implements OnInit {
  movieList: Movie[] = [];
  subscription: Subscription;
  constructor(private dataService: DataService, private messageService: MessageService) {
    this.subscription = this.messageService.getMessage()
                                            .subscribe(message => this.addMovie(message));
  }
  addMovie(message: any){
    if(message._to != "multiplexComponent")
      return;
    if(message.isEdited){
      this.updateMovie(message.movie._id,message.movie);
      return;
    }
    this.dataService.addMovie(message.movie).subscribe(movieData => {
      this.movieList.push(message.movie);
    });
  }

  getMovies(){
    this.dataService.getMovies().subscribe( movies => {
      this.movieList = movies;
    });

  }

  updateMovie(id,movie){
    this.dataService.updateMovie(id,movie).subscribe(data=>{
      if(data.name && data.name == "CastError")
        return;
      this.movieList[this.movieList.findIndex(function(ele){
        return ele._id === id;
      })] = movie;
    })
  }

  deleteMovie(id){
      this.dataService.deleteMovie(id).subscribe(res => {
        if(res.n == 1){
          this.movieList.splice(this.movieList.findIndex(function(ele){
              return ele._id === id;
          })
          ,1);
        }
      });
  }
  ngOnInit() {
    this.getMovies();
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  editMovie(movie){
    this.messageService.sendMessage({
      _to: "movieForm",
      movie: movie,
      isEdited: true
    });
  }

}
