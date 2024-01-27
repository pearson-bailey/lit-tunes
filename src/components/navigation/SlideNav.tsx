"use client";
import Link from "next/link";
import { ForwardRefRenderFunction, MouseEventHandler, forwardRef } from "react";
import {
  ArrowRightStartOnRectangleIcon,
  BookOpenIcon,
  BuildingLibraryIcon,
  ChatBubbleBottomCenterTextIcon,
  PhoneIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

interface SlideNavProps {
  showNav: boolean;
  toggleNav: MouseEventHandler;
}
const SlideNavRender: ForwardRefRenderFunction<
  HTMLDivElement,
  SlideNavProps
> = ({ showNav, toggleNav }, ref) => {
  return (
    <div
      className={`SlideNav ${
        showNav ? "transform -translate-x-96" : "transform translate-x-0"
      } fixed top-0 -right-96 z-30 w-96 max-w-full h-screen flex flex-col px-8 py-4 transition-transform duration-700 ease-in-out bg-background`}
      ref={ref}
    >
      <div className="SlideNav__header flex justify-end">
        <a
          className="SlideNav__header__close hover:cursor-pointer"
          onClick={toggleNav}
        >
          <XMarkIcon
            className={`fill-current w-12 h-12 stroke-1 stroke-current opacity-0 ${
              showNav ? "slide-in" : ""
            }`}
          />
        </a>
      </div>
      <div
        className={`SlideNav__body ${
          showNav ? "slide-in" : ""
        } flex basis-4/5 flex-col justify-around items-start opacity-0 my-8 ml-8 text-2xl`}
      >
        <>
          <Link
            href="/account"
            onClick={toggleNav}
            className={
              "flex justify-start items-center gap-2 w-11/12 py-1.5 rounded-md uppercase bg-primary-800"
            }
          >
            Account
            <UserIcon className="h-7 w-7 rounded-full p-0.5" />
          </Link>
          <Link
            href="/browse"
            onClick={toggleNav}
            className={
              "flex justify-start items-center gap-2 w-11/12 py-1.5 rounded-md uppercase bg-primary-800"
            }
          >
            Browse
            <BuildingLibraryIcon className="h-7 w-7 rounded-full p-0.5" />
          </Link>
          <Link
            href="/collections"
            onClick={toggleNav}
            className={
              "flex justify-start items-center gap-2 w-11/12 py-1.5 rounded-md uppercase bg-primary-800"
            }
          >
            Collections
            <BookOpenIcon className="h-7 w-7 rounded-full p-0.5" />
          </Link>
          <form
            action="/logout"
            method="post"
            className="flex flex-col w-11/12 items-stretch"
          >
            <button
              onClick={toggleNav}
              className={
                "flex justify-start items-center gap-2 py-1.5 rounded-md uppercase"
              }
            >
              Log Out
              <ArrowRightStartOnRectangleIcon className="h-6 w-6 text-secondary-500 stroke-current" />
            </button>
          </form>
        </>
      </div>
      <hr className={`border opacity-0 ${showNav ? "slide-in" : ""}`} />
      <div
        className={`SlideNav__footer ${
          showNav ? "slide-in" : ""
        } flex justify-center items-start flex basis-full opacity-0 mt-8 gap-1`}
      >
        <a
          className={
            "flex items-center justify-center flex-1 py-1.5 rounded-md uppercase text-center cursor-pointer gap-1"
          }
        >
          <PhoneIcon className="h-6 w-6 stroke-white" />
          Contact Us
        </a>
        <Link
          href="/feedback"
          onClick={toggleNav}
          className={
            "flex items-center justify-center flex-1 py-1.5 rounded-md uppercase text-center cursor-pointer gap-1"
          }
        >
          <ChatBubbleBottomCenterTextIcon className="h-6 w-6" />
          Feedback
        </Link>
      </div>
    </div>
  );
};

const SlideNav = forwardRef(SlideNavRender);

export default SlideNav;
