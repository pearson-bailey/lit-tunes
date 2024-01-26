import { motion } from "framer-motion";
import { ForwardRefRenderFunction, forwardRef } from "react";
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
  return (
    <motion.div
      className="lg:flex md:flex lg:col-span-4 md:col-span-3 sm:col-span-2 md:m-8 p-8 border border-white rounded-md"
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{
        delay: 0.66,
        type: "spring",
        bounce: 0.33,
      }}
    >
      <img
        className="cursor-pointer lg:w-1/3 md:w-1/2 sm:block hidden"
        key={idx}
        src={book.book_image}
        alt={book.title}
      />
      <div className="lg:w-2/3 md:w-1/2 sm:w-full flex flex-col pl-4" ref={ref}>
        <div className="relative">
          <h1 className="mt-8 md:mt-0">{book.title}</h1>
          <button
            className="absolute -right-2 -top-2"
            onClick={() => expandQuickview(-1)}
          >
            <XMarkIcon className="h-10 w-10 text-white stroke-white hover:text-gray-300 hover:stroke-gray-300" />
          </button>
        </div>
        <h3 className="mb-4 italic">{`By: ${book.author}`}</h3>
        <p>{book.description}</p>
      </div>
    </motion.div>
  );
};

const BookCard = forwardRef(BookCardRender);

export default BookCard;
