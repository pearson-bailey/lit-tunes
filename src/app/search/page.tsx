"use client";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { Book } from "@/src/types/client";
import BooksGrid from "@/src/components/BooksGrid";
import { searchBooks } from "./actions";

export default function SearchResults() {
  const [books, setBooks] = useState<Book[] | null>(null);
  const [query, setQuery] = useState<string | null>(null);

  const onSearch = useCallback(async () => {
    if (query) {
      const bookResults = await searchBooks(query);
      if (bookResults) {
        setBooks(bookResults);
      }
    }
  }, [query, searchBooks, setBooks]);

  const handleQueryChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
    },
    [setQuery]
  );

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      await onSearch();
    },
    [onSearch]
  );

  return (
    <>
      <div className="flex flex-col w-[calc(100vw-1rem)] items-start px-8 justify-start gap-2">
        <form
          className="animate-in flex flex-1 w-full justify-center items-center gap-3 text-foreground my-6"
          onSubmit={handleSubmit}
        >
          <label htmlFor="search">Search:</label>
          <input
            className="rounded-md pl-2 py-1 bg-inherit border"
            type="text"
            name="search"
            placeholder={"Title, author, etc"}
            onChange={(e) => handleQueryChange(e)}
          />
          <button
            type="submit"
            className="bg-green-700 hover:bg-green-600 rounded-md px-4 py-1 text-foreground"
          >
            Submit
          </button>
        </form>
      </div>
      <BooksGrid books={books} />
    </>
  );
}
