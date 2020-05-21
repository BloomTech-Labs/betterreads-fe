export class Book {
  constructor(book) {
    this.authors = book.authors;
    this.averageRating = book.averageRating;
    this.categories = book.categories && book.categories.toString();
    this.description = book.description;
    this.googleId = book.googleId;
    this.isEbook = book.isEbook;
    this.isbn10 = book.isbn10;
    this.isbn13 = book.isbn13;
    this.language = book.language;
    this.pageCount = book.pageCount;
    this.publishedDate = book.publishedDate;
    this.publisher = book.publisher;
    this.smallThumbnail =
      book.smallThumbnail && book.smallThumbnail.replace('http://', 'https://');
    this.textSnippet = book.textSnippet;
    this.title = book.title;
    this.thumbnail =
      book.thumbnail && book.thumbnail.replace('http://', 'https://');
    this.webReaderLink = book.webReaderLink;
  }
}
