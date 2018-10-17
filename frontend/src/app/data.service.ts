import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: Http) { }

  getMovies(){
    return this.http.get('http://localhost:3000/api/movies')
                    .pipe(map((res) => res.json()));
  }
  addMovie(newMovie){
    let headers= new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/api/movie',newMovie, {headers: headers})
            .pipe(map((res:any) => res.json()));
  }
  deleteMovie(id){
    return this.http.delete('http://localhost:3000/api/movie/'+id)
                    .pipe(map((res) => res.json()));
  }
  updateMovie(id,movie){
    let headers= new Headers();
    headers.append('Content-Type','application/json');
    return this.http.put('http://localhost:3000/api/movie/'+id, movie, {headers: headers})
          .pipe(map((res)=> res.json()));
  }
}
