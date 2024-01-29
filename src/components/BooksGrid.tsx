'use client';
import { useCallback, useRef, useState } from "react";
import { Book } from "../types/client";
import BookCard from "./BookCard";
import { motion } from "framer-motion";

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
    <div className="w-11/12 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 grid-flow-row-dense mx-4 items-center">
      {books
        ? books.map((book, idx) => (
            <>
              <a
                key={idx}
                onClick={() => expandQuickview(idx)}
                className="flex flex-col flex-1 cursor-pointer h-full justify-center text-center relative"
              >
                {book.book_image.length ? (
                  <>
                  <img
                    className="w-full rounded-lg border border-foreground"
                    key={idx}
                    src={book.book_image}
                    alt={book.title}
                  />
                  {index == idx ? (
                    <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{
                      delay: 0.66,
                      type: "spring",
                      bounce: 0.33,
                    }}
                  >
                    <svg className="md:hidden absolute -bottom-7 left-1/3" width="34" height="16" viewBox="0 0 34 16">
                      <polygon points="16,0 0,16 34,16" className="fill-foreground" />
                    </svg>
                    </motion.div>
                  ) : null}
                  </>
                ) : (
                  <div className="flex flex-col justify-center w-full aspect-[2/3] rounded-lg border border-foreground bg-background text-foreground break-words text-2xl px-8">
                    {book.title.slice(0, 49)}
                  </div>
                )}
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
