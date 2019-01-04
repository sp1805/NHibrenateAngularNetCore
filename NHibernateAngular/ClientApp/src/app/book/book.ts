export class IBook {
  id: number;
  title: string;
  author: string;
  genre: string;

  constructor(data) { (<any>Object).assign(this, data); }
}
