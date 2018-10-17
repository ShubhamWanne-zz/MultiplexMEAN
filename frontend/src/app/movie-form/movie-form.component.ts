import { Component, OnInit } from '@angular/core';
import { Movie } from '../../../model/movie';
import { MessageService} from '../message.service';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit {
  movieName:string [] = ['Venom','Captain Marvel','Into the Spider Verse','Aquaman','Holmes & Watson'];
  selectedMovieName:string="";
  seatNumber: string[] = [];
  selectedSeatNumber: string = "";
  screenNo: number[] = [1,2,3,4,5];
  selectedScreenNo: number = 0;
  showTime: string[] = ['MORNING','FIRST', 'SECOND', 'MATINEE' , 'NIGHT'];
  selectedShowTime:string = "";
  cost: number = 0;
  private movie= new Movie();
  subscription: Subscription;
  isEdited: boolean;
  _id:string;

  constructor(private messageService: MessageService) {
      this.subscription = this.messageService.getMessage().subscribe(message => {
        this.editForm(message);
      })
  }

  ngOnInit() {
    let index=0;
    for(let a of ['A','B','C','D','E']){
      for(let i of ['1','2','3','4','5','6','7','8','9','10']){
        this.seatNumber[index++] = a+i;
      }
    }
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  editForm(message){
    if(message._to != "movieForm")
      return;
    this.isEdited = true;
    this.selectedMovieName = message.movie.movieName;
    this.selectedScreenNo = message.movie.screenNo;
    this.selectedShowTime = message.movie.showTime;
    this.selectedSeatNumber = message.movie.seatNumber;
    this.cost = message.movie.cost;
    this._id = message.movie._id;
  }
  updateCost(){
    if(this.selectedShowTime =="" || this.selectedSeatNumber ==""){
        this.cost = 0;
    }
    else{
      if(this.showTime.indexOf(this.selectedShowTime) > 2 && this.seatNumber.indexOf(this.selectedSeatNumber) > 25 ){
        this.cost = 350;
      }
      else if(this.showTime.indexOf(this.selectedShowTime) <= 2 && this.seatNumber.indexOf(this.selectedSeatNumber) > 25 ){
        this.cost = 200;
      }
      else if(this.showTime.indexOf(this.selectedShowTime) > 2 && this.seatNumber.indexOf(this.selectedSeatNumber) <= 25 ){
        this.cost = 250;
      }
      else if(this.showTime.indexOf(this.selectedShowTime) <= 2 && this.seatNumber.indexOf(this.selectedSeatNumber) <= 25 ){
        this.cost = 150;
      }
    }
  }
  sendMovie(form){
    this.movie.movieName = this.selectedMovieName;
    this.movie.screenNo = this.selectedScreenNo;
    this.movie.seatNumber = this.selectedSeatNumber;
    this.movie.showTime = this.selectedShowTime;
    this.movie.cost = this.cost;
    this.movie._id = this._id;
    this.messageService.sendMessage({
      _to: "multiplexComponent",
      movie: this.movie,
      isEdited: this.isEdited
    });
    this.selectedScreenNo = null;
    this.selectedShowTime = "";
    this.selectedMovieName = "";
    this.selectedSeatNumber ="";
    this.cost = 0;
    this.isEdited=false;
  }

}
