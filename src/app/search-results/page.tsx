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
      <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
        <form
          className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
          onSubmit={handleSubmit}
        >
          <label className="text-md" htmlFor="email"></label>
          <select
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
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
          <button className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2">
            Filter Books
          </button>
        </form>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 grid-flow-row-dense">
        {books
          ? books.map((book, idx) => (
              <>
                <a
                  onClick={() => expandQuickview(idx)}
                  className="cursor-pointer"
                >
                  <img
                    className="w-full"
                    key={idx}
                    src={book.book_image}
                    alt={book.title}
                  />
                </a>
                {index == idx ? (
                  <div className="animate-in delay-1000 grid grid-cols-subgrid gap-8 lg:col-span-4 md:col-span-3 sm:col-span-2 my-8 p-8 border border-white rounded-md">
                    <img
                      className="cursor-pointer lg:col-start-1 lg:col-end-3 md:col-start-1 md:col-end-2 sm:col-start-1 sm:col-end-2 w-full"
                      key={idx}
                      src={book.book_image}
                      alt={book.title}
                    />
                    <div
                      className="lg:col-start-3 lg:col-end-5 md:col-start-2 md:col-end-4 sm:col-start-2 sm:col-end-3 flex flex-col w-11/12"
                      ref={scrollToRef}
                    >
                      <div className="flex justify-between">
                        <h1>{book.title}</h1>
                        <button
                          className="absolute right-8 top-8"
                          onClick={() => expandQuickview(-1)}
                        >
                          <XMarkIcon className="h-10 w-10 text-white stroke-white hover:text-gray-300 hover:stroke-gray-300" />
                        </button>
                      </div>
                      <h3 className="mb-4 italic">{`By: ${book.author}`}</h3>
                      <p>{book.description}</p>
                    </div>
                  </div>
                ) : null}
              </>
            ))
          : null}
      </div>
    </>
  );
}
