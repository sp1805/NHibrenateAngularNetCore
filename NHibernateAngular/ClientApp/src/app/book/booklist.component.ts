import { Component, TemplateRef, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { IBook } from './book';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';

@Component({
  selector: 'book-list',
  templateUrl: './booklist.component.html'
})
export class BookListComponent {
  public bookDetails: IBook[];

  baseURL = "https://localhost:44383";

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private router: Router) {
    http.get<IBook[]>(baseUrl + 'api/Book/Index')
      .subscribe(result => {
        this.bookDetails = result;
        console.log(result);
      }, error => console.error(error));
  }

  deleteBook(id: number){
    console.log(id)
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.baseURL + '/api/Book/DeleteBook/',id, { headers: headers }).
      subscribe(data => {
        this.router.navigate(['booklist']);
      },
        error => {
          alert(error);
        });
  }

  editBook(id: number) {
    console.log(id);
    localStorage.removeItem("editBookId");
    localStorage.setItem("editBookId", id.toString());
   this.router.navigate(['bookedit']);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json() || 'Server error');
  }

}

 


