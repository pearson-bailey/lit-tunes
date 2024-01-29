"use client";
import { ChangeEvent, FormEvent, ForwardRefRenderFunction, forwardRef, useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface SearchBarProps {
    showSearch: boolean;
    toggleSearch: () => void;
}
const SearchBarRender: ForwardRefRenderFunction<
  HTMLDivElement,
  SearchBarProps
> = ({ showSearch, toggleSearch }, ref) => {
    const [query, setQuery] = useState<string | null>(null);
    const { push } = useRouter();
    const onSearch = useCallback(async () => {
        if (query) {
              const url = new URL('/search', window.location.origin);
              url.searchParams.append("query", query);
              toggleSearch();
              push(url.toString());
        }
      }, [query, toggleSearch]);

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
    <AnimatePresence>
    { showSearch ? (<motion.div
      className="flex w-full justify-center bg-white text-background absolute z-10"
      ref={ref}
      initial={{ opacity: 0, translateY: -100 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateY: -100 }}
      transition={{
        delay: 0.25,
        type: "spring",
        bounce: 0.30,
      }}
    >
        <form
            className="animate-in flex flex-1 w-full justify-center bg-black/10 dark:bg-black/80 items-center gap-3 text-foreground p-8"
            onSubmit={handleSubmit}
            >
                <label htmlFor="search">Search:</label>
                <input
                    className="rounded-md pl-2 py-1 border border-black/50"
                    type="text"
                    name="search"
                    placeholder={"Title, author, etc"}
                    onChange={(e) => handleQueryChange(e)}
                />
                <button
                    type="submit"
                    className="bg-green-700 hover:bg-green-600 rounded-md px-4 py-1 text-white"
                >
                    Submit
                </button>
            </form>
    </motion.div>) : null}
    </AnimatePresence>
  );
};

const SearchBar = forwardRef(SearchBarRender);

export default SearchBar;
