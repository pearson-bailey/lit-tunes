"use server";
import { Book } from "@/src/types/client";

export async function searchBooks(query: string): Promise<Book[]> {
  try {
    var requestOptions = {
      method: "GET",
    };
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40`,
      requestOptions
    );

    if (res.ok) {
      const data = await res.json();
      return data.items.map((item: any) => {
        const newItem = {
          primary_isbn10: "",
          primary_isbn13: "",
          description: "",
          title: "",
          author: "",
          book_image: "",
        };

        // Extract values from the original item
        if (item.volumeInfo) {
          newItem.title = item.volumeInfo.title || "";
          newItem.description = item.volumeInfo.description || "";
          newItem.author =
            item.volumeInfo.authors && item.volumeInfo.authors.length > 0
              ? item.volumeInfo.authors[0]
              : "";
          newItem.book_image =
            item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail
              ? (item.volumeInfo.imageLinks.thumbnail += "&fife=w500")
              : "";

          // Extract ISBNs
          if (
            item.volumeInfo.industryIdentifiers &&
            item.volumeInfo.industryIdentifiers.length
          ) {
            item.volumeInfo.industryIdentifiers.forEach((identifier: any) => {
              if (identifier.type === "ISBN_10") {
                newItem.primary_isbn10 = identifier.identifier;
              }
              if (identifier.type === "ISBN_13") {
                newItem.primary_isbn13 = identifier.identifier;
              }
            });
          }
        }

        return newItem;
      });
    } else {
      throw new Error(`Failed to fetch books. Status: ${res.status}`);
    }
  } catch (error) {
    throw new Error(`Failed to fetch books. Error: ${error}`);
  }
}
