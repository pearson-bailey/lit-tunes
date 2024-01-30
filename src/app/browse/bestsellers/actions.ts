"use server";

import { Book, Genre } from "@/src/types/client";

export async function getBookGenres(): Promise<Genre[]> {
  try {
    var requestOptions = {
      method: "GET",
    };

    const res = await fetch(
      `https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${process.env.NYT_API_KEY}`,
      requestOptions
    );

    if (res.ok) {
      const data = await res.json();
      return data.results.map((result: any) => ({
        display_name: result.display_name,
        list_name_encoded: result.list_name_encoded,
      }));
    } else {
      throw new Error(`Failed to fetch genres. Status: ${res.status}`);
    }
  } catch (error) {
    throw new Error(`Failed to fetch genres. Error: ${error}`);
  }
}

export async function browseBooksByGenre(genre: string): Promise<Book[]> {
  try {
    var requestOptions = {
      method: "GET",
    };
    const res = await fetch(
      `https://api.nytimes.com/svc/books/v3/lists/current/${genre}.json?api-key=${process.env.NYT_API_KEY}`,
      requestOptions
    );

    if (res.ok) {
      const data = await res.json();
      return data.results.books.map((book: any) => ({
        primary_isbn10: book.primary_isbn10,
        primary_isbn13: book.primary_isbn13,
        description: book.description,
        title: book.title,
        author: book.author,
        book_image: book.book_image,
      }));
    } else {
      throw new Error(`Failed to fetch genres. Status: ${res.status}`);
    }
  } catch (error) {
    throw new Error(`Failed to fetch genres. Error: ${error}`);
  }
}
