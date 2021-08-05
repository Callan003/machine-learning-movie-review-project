import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  submitForm: FormGroup = new FormGroup({
    text: new FormControl('', Validators.required)
  }, {updateOn: 'blur'});

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  movies;
  reviewSubmitted = [];
  feedbackLogged = [];
  predictedSentiments = [];
  randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);

  constructor(
    private http: HttpClient,
    fb: FormBuilder) {}

  ngOnInit(): void {

    this.http.get('http://127.0.0.1:8000/movies').subscribe(res => {
      this.movies = res;
      this.movies.forEach(movie => {
        this.reviewSubmitted.push(false);
        this.feedbackLogged.push(false);
        this.predictedSentiments.push('');
      });
    });
  }

  getMovieTitle(movie): string {
    return movie.toString().slice(0, -4);
  }

  setRandomColor() {
    this.randomColor =  '#'+Math.floor(Math.random()*16777215).toString(16);
  }

  onSubmit(data, index): void {
    if(this.submitForm.valid) {
      this.http.post('http://127.0.0.1:8000/predict', {text: data.value.text}).subscribe((res: any)=>{
        this.reviewSubmitted[index] = data.value.text;
        this.predictedSentiments[index] = res;

      });
    }
  }

  slideChange(event) {
    this.submitForm.reset();
  }

  submitFeedback(is_correct: boolean, index) {
    this.http.post('http://127.0.0.1:8000/log_feedback',
     {text: this.reviewSubmitted[index], predicted_sentiment: this.predictedSentiments[index].sentiment, is_correct}).subscribe(
       res => {
         this.feedbackLogged[index] = true;
         this.setRandomColor();
       }
     );
  }

}
