import { Component, TemplateRef, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBook } from './book';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpHeaders, HttpRequest } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'bookcreate',
  templateUrl: './bookcreate.component.html'
})
export class BookCreateComponent implements OnInit {
  public bookForm: FormGroup;
  public submitted: boolean;
  baseURL = "https://localhost:44383";
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
    this._http = http;
  }


  ngOnInit() {
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      genre: ['', [Validators.required]]
    });
  }
  _http: any;
  onSubmit({ value, valid }: { value: IBook, valid: boolean }) {
    this.submitted = true;
    console.log(value, valid);
    
   let body = JSON.stringify(value);

   console.log(body);

    const header = {
      header: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this._http.post(this.baseURL + '/api/Book/Create', value, { headers: header }).
      subscribe(data => {
        this.router.navigate(['booklist']);
      },
        error => {
          alert(error);
        });
  }
}
