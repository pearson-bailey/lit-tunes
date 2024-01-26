export type Genre = {
  display_name: string;
  list_name_encoded: string;
};

export type Book = {
  primary_isbn10: string;
  primary_isbn13: string;
  description: string;
  title: string;
  author: string;
  book_image: string;
};
