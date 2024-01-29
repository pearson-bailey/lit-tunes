'use client';
import Link from "next/link";
import Image from "next/image";
import NavButton from "./navigation/NavButton";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import SearchBar from "./SearchBar";
import { useClickOutside } from "../hooks/useClickOutside";
import { useCallback, useRef, useState } from "react";

export default function Header() {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useClickOutside(searchRef, () => setShowSearch(false));

  const toggleSearch = useCallback(() => {
    setShowSearch((prev) => !prev);
  }, [setShowSearch]);

  return (
    <>
    <nav className="w-full flex justify-center border-b border-b-foreground/10 bg-background h-16 relative z-20">
      <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
        <Link className="flex flex-1 items-center" href="/">
          <Image
            src="/img/lit-tunes-logo.png"
            alt="LitTunes logo"
            width="50"
            height="50"
          />
          <h1>LitTunes</h1>
        </Link>
        <button onClick={toggleSearch}>
          <MagnifyingGlassIcon className="h-8 w-8 stroke-current stroke-1 mr-2" />
        </button>
        <NavButton />
      </div>
    </nav>
    <SearchBar ref={searchRef} showSearch={showSearch} toggleSearch={toggleSearch} />
    </>
  );
}
