import { useCallback, useRef, useState } from "react";
import { Book } from "../types/client";
import BookCard from "./BookCard";

export default function BooksGrid({ books }: { books: Book[] | null }) {
  const [index, setIndex] = useState<number | null>(null);
  const scrollToRef = useRef<HTMLDivElement>(null);

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
  );
}
