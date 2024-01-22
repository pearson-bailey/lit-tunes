"use client";
import { Book, Genre, getBookGenres, searchBooksByGenre } from "./actions";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import BookCard from "@/src/components/BookCard";

export default function SearchResults() {
  const [genres, setGenres] = useState<Genre[] | null>(null);
  const [books, setBooks] = useState<Book[] | null>(null);
  const [index, setIndex] = useState<number | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const scrollToRef = useRef<HTMLDivElement>(null);

  const onSearch = useCallback(async () => {
    if (selectedGenre) {
      const bookResults = await searchBooksByGenre(selectedGenre);
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
        const initialBooks = await searchBooksByGenre(
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

  const expandQuickview = useCallback((idx: number) => {
    setIndex(idx);
    setTimeout(function () {
      if (scrollToRef.current) {
        scrollToRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
    }, 200);
  }, []);

  return (
    <>
      <div className="flex-1 flex flex-col w-full px-8 justify-start gap-2">
        <form
          className="animate-in flex flex-1 flex-col md:flex-row w-full justify-center items-center gap-3 text-foreground my-6"
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
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 grid-flow-row-dense mx-4 items-center">
        {books
          ? books.map((book, idx) => (
              <>
                <a
                  onClick={() => expandQuickview(idx)}
                  className="cursor-pointer"
                >
                  <img
                    className="w-full rounded-lg border border-white"
                    key={idx}
                    src={book.book_image}
                    alt={book.title}
                  />
                </a>
                {index == idx ? (
                  <BookCard
                    idx={idx}
                    book={book}
                    ref={scrollToRef}
                    expandQuickview={expandQuickview}
                  />
                ) : null}
              </>
            ))
          : null}
      </div>
    </>
  );
}
