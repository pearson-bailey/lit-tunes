"use client";
import { getBookGenres, browseBooksByGenre } from "./actions";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Book, Genre } from "@/src/types/client";
import BooksGrid from "@/src/components/BooksGrid";

export default function SearchResults() {
  const [genres, setGenres] = useState<Genre[] | null>(null);
  const [books, setBooks] = useState<Book[] | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const onSearch = useCallback(async () => {
    if (selectedGenre) {
      const bookResults = await browseBooksByGenre(selectedGenre);
      if (bookResults) {
        setBooks(bookResults);
      }
    }
  }, [selectedGenre]);

  useEffect(() => {
    const getGenres = async () => {
      const genreResults: Genre[] | null = await getBookGenres();
      if (genreResults) {
        setGenres(genreResults);
        const initialBooks = await browseBooksByGenre(
          genreResults[0].list_name_encoded
        );
        if (initialBooks.length) {
          setBooks(initialBooks);
        }
      }
    };

    getGenres();
  }, []);

  const handleGenreChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch();
  };

  return (
    <>
      <div className="flex-1 flex flex-col w-full px-8 justify-start gap-2">
        <form
          className="animate-in flex flex-1 flex-col md:flex-row w-full justify-center items-start gap-3 text-foreground my-6"
          onSubmit={handleSubmit}
        >
          <select
            className="rounded-md py-2 bg-inherit border"
            name="genre"
            placeholder={genres ? genres[0].display_name : "Choose a genre"}
            onChange={handleGenreChange}
          >
            {genres
              ? genres.map((genre, idx) => (
                  <option key={idx} value={genre.list_name_encoded}>
                    {genre.display_name}
                  </option>
                ))
              : null}
          </select>
          <button className="bg-green-700 hover:bg-green-600 rounded-md px-4 py-2 text-foreground">
            Filter Books
          </button>
        </form>
      </div>
      <BooksGrid books={books} />
    </>
  );
}
