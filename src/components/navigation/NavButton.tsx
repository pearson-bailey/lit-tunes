"use client";
import SlideNav from "./SlideNav";
import { useCallback, useRef, useState } from "react";
import { useClickOutside } from "@/src/hooks/useClickOutside";
import { Bars3Icon } from "@heroicons/react/24/solid";

export default function NavButton() {
  const [showNav, setShowNav] = useState<boolean>(false);
  const navRef = useRef<HTMLDivElement>(null);

  useClickOutside(navRef, () => setShowNav(false));

  const toggleNav = useCallback(() => {
    setShowNav((prev) => !prev);
  }, [setShowNav]);

  return (
    <>
      <a className="NavButton hover:cursor-pointer" onClick={toggleNav}>
        <Bars3Icon className="fill-current stroke-current stroke-1 h-12 w-12" />
      </a>
      <SlideNav ref={navRef} showNav={showNav} toggleNav={toggleNav} />
    </>
  );
}
