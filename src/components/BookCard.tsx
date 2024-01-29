"use client";
import { motion } from "framer-motion";
import {
  ForwardRefRenderFunction,
  forwardRef,
  useCallback,
  useState,
} from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Book } from "../types/client";

interface BookCardProps {
  idx: number;
  book: Book;
  expandQuickview: (idx: number) => void;
}
const BookCardRender: ForwardRefRenderFunction<
  HTMLDivElement,
  BookCardProps
> = ({ idx, book, expandQuickview }, ref) => {
  const [isFullDescriptionShown, setIsFullDescriptionShown] = useState(false);

  const toggleDescription = useCallback(() => {
    setIsFullDescriptionShown(!isFullDescriptionShown);
  }, [isFullDescriptionShown]);

  return (
    <motion.div
      className="md:flex justify-around lg:col-span-4 md:col-span-3 col-span-2 p-8 lg:px-24 lg:py-16 border border-foreground rounded-md mt-3 relative"
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{
        delay: 0.66,
        type: "spring",
        bounce: 0.33,
      }}
    >
      <div className="flex lg:w-1/4 md:w-1/3">
      {book.book_image.length ? (
        <img
          className="md:flex cursor-pointer rounded-md border border-foreground w-full h-fit hidden"
          key={idx}
          src={book.book_image}
          alt={book.title}
        />
      ) : (
        <div className="md:flex flex-col justify-center bg-background border border-foreground rounded-md w-full aspect-[2/3] text-foreground text-center text-4xl px-8 hidden">
          {book.title.slice(0, 49)}
        </div>
      )}
      </div>
      <div
        className="lg:w-3/4 md:w-2/3 sm:w-full flex flex-col md:pl-4 lg:pl-8"
        ref={ref}
      >
        <div className="relative">
          <h1 className="mt-8 md:mt-0 lg:text-5xl">{book.title}</h1>
          <button
            className="absolute -right-2 -top-2"
            onClick={() => expandQuickview(-1)}
          >
            <XMarkIcon className="h-10 w-10 lg:h-14 lg:w-14 text-foreground stroke-foreground hover:text-gray-300 hover:stroke-gray-300" />
          </button>
        </div>
        <h3 className="mb-4 italic lg:mt-3 lg:text-3xl">{`By: ${book.author}`}</h3>
        <p className="text-justify lg:text-xl lg:mr-8">
          {isFullDescriptionShown || book.description.length < 250 ? (
            <span>{book.description}</span>
          ) : (
            <span>{book.description.slice(0, 249)}...</span>
          )}
          {book.description.length > 250 && (
            <button
              onClick={toggleDescription}
              className="ml-2 text-gray-500 dark:text-yellow-300 hover:font-semibold text-sm px-2 py-0.5"
            >
              {isFullDescriptionShown ? "Show less" : "Show more"}
            </button>
          )}
        </p>
      </div>
    </motion.div>
  );
};

const BookCard = forwardRef(BookCardRender);

export default BookCard;
