import { Component, TemplateRef, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBook } from './book';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpHeaders, HttpRequest } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { first } from "rxjs/operators";

@Component({
  selector: 'book-edit',
  templateUrl: './bookedit.component.html'
})
export class BookEditComponent implements OnInit {

  public submitted: boolean;
  book: IBook;
  headers: any;
  editForm: FormGroup;
  baseURL = "https://localhost:44383";
    constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient) { }

  ngOnInit() {

    let bookId = localStorage.getItem("editBookId");

    if (!bookId) {
      alert("Invalid action.")
      this.router.navigate(['booklist']);
      return;
    }

    this.editForm = this.formBuilder.group({
      id: [],
      title: ['', Validators.required],
      author: ['', Validators.required],
      genre: ['', Validators.required]
    });
    console.log(bookId);
    return this.http.get<IBook>(this.baseURL + '/api/Book/GetBook/' + bookId)
      .subscribe(data => {
        this.editForm.setValue(data);
        console.log(data)
      }, error => console.error(error));
  }
  
  onSubmit() {
    let bookId = localStorage.getItem("editBookId");
    console.log(this.editForm.value);

    this.http.put(this.baseURL + '/api/Book/Edit/' + bookId, this.editForm.value).pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['booklist']);
        },
        error => {
          alert(error);
        });
    //this.submitted = true;
    //console.log(value, valid);

    //let body = JSON.stringify(value);

    //console.log(body);

    //let header = {
    //  header: new HttpHeaders({
    //    'Content-Type': 'application/json'
    //  })
    //}
    //return this.http.post(this.baseURL + '/api/Book/Edit', value, { headers : header }).
    //  subscribe(data => {
    //    this.router.navigate(['booklist']);
    //  },
    //    error => {
    //      alert(error);
    //    });
  }

}
