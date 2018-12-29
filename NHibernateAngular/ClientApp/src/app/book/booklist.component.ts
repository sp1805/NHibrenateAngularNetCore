import { Component, TemplateRef, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBook } from './book';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'book-list',
  templateUrl: './booklist.component.html'
})
export class BookListComponent {
  public bookDetails: IBook[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<IBook[]>(baseUrl + 'api/Book/Index')
      .subscribe(result => {
      this.bookDetails = result;
    }, error => console.error(error));
  }
}

