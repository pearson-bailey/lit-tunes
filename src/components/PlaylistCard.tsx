"use client";
import { motion } from "framer-motion";
import {
  ForwardRefRenderFunction,
  forwardRef,
} from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Playlist } from "../types/client";

interface PlaylistCardProps {
  idx: number;
  playlist: Playlist;
  expandQuickview: (idx: number) => void;
}
const PlaylistCardRender: ForwardRefRenderFunction<
  HTMLDivElement,
  PlaylistCardProps
> = ({ idx, playlist, expandQuickview }, ref) => {
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
      {playlist.images[0].url.length ? (
        <img
          className="md:flex cursor-pointer rounded-md border border-foreground w-full h-fit hidden"
          key={idx}
          src={playlist.images[0].url}
          alt={playlist.name}
        />
      ) : (
        <div className="md:flex flex-col justify-center bg-background border border-foreground rounded-md w-full aspect-[2/3] text-foreground text-center text-4xl px-8 hidden">
          {playlist.name.slice(0, 49)}
        </div>
      )}
      </div>
      <div
        className="lg:w-3/4 md:w-2/3 sm:w-full flex flex-col md:pl-4 lg:pl-8"
        ref={ref}
      >
        <div className="relative">
          <h1 className="mt-8 md:mt-0 lg:text-5xl">{playlist.name}</h1>
          <button
            className="absolute -right-2 -top-2"
            onClick={() => expandQuickview(-1)}
          >
            <XMarkIcon className="h-10 w-10 lg:h-14 lg:w-14 text-foreground stroke-foreground hover:text-gray-300 hover:stroke-gray-300" />
          </button>
        </div>
        <p className="text-justify lg:text-xl lg:mr-8">
          {playlist.description}
        </p>
      </div>
    </motion.div>
  );
};

const PlaylistCard = forwardRef(PlaylistCardRender);

export default PlaylistCard;
