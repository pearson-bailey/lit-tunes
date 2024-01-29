"use client";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { searchBooks } from "./actions";
import BooksGrid from "../BooksGrid";
import { Book } from "@/src/types/client";

export default function SearchForm({ queryParam }: {queryParam?: string}) {
    const [books, setBooks] = useState<Book[] | null>(null);

    const onSearch = useCallback(async (searchQuery: string) => {
      if (searchQuery) {
        const bookResults = await searchBooks(searchQuery);
        if (bookResults) {
          setBooks(bookResults);
        }
      }
    }, []);

    useEffect(() => {
        if (queryParam) {
          onSearch(queryParam);
        }
    }, [queryParam, onSearch]);
  
    const handleSubmit = useCallback(
      async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const searchInput = event.currentTarget.elements.namedItem('search') as HTMLInputElement;
        if (searchInput && searchInput.value) {await onSearch(searchInput.value);}
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
                    placeholder={queryParam || "Title, author, etc"}
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
