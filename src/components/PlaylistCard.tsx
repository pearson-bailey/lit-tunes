"use client";
import { motion } from "framer-motion";
import {
  ForwardRefRenderFunction,
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  PauseCircleIcon,
  PlayCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import {
  PlaylistedTrack,
  SimplifiedPlaylist,
  Track,
} from "@spotify/web-api-ts-sdk";
import { getTracksFromPlaylist } from "../app/browse/playlists/actions";

interface PlaylistCardProps {
  idx: number;
  playlist: SimplifiedPlaylist;
  expandQuickview: (idx: number) => void;
}
const PlaylistCardRender: ForwardRefRenderFunction<
  HTMLDivElement,
  PlaylistCardProps
> = ({ idx, playlist, expandQuickview }, ref) => {
  const [tracks, setTracks] = useState<PlaylistedTrack<Track>[] | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const fetchTracksAndSelectFirst = async () => {
      if (playlist.id) {
        const items = await getTracksFromPlaylist(playlist.id);
        setTracks(items);
        if (items && items.length > 0) {
          setSelectedTrack(items[0].track);
        }
      }
    };

    fetchTracksAndSelectFirst();
  }, [playlist.id]);

  const handleSelectTrack = useCallback((track: Track) => {
    setSelectedTrack(track);
  }, []);

  const handlePlay = useCallback(
    (id: string) => {
      if (id) {
        const audioPlayer = document.getElementById(id) as HTMLAudioElement;
        audioPlayer.volume = 0.75;
        playing ? audioPlayer.pause() : audioPlayer.play();
        setPlaying((prev) => !prev);
      }
    },
    [playing]
  );

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
            className="md:flex cursor-pointer border border-foreground w-full h-fit hidden"
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
        <p className="text-justify lg:text-xl lg:mr-8 text-yellow-300 mb-2">
          {playlist.description}
        </p>
        <div className="flex w-full lg:w-1/2 gap-1 my-2 py-2 px-2 items-center bg-foreground/10 rounded-md">
          <button
            className="flex rounded-full"
            onClick={() => handlePlay(selectedTrack?.id ?? "")}
          >
            {playing ? (
              <PauseCircleIcon className="w-8 h-8" />
            ) : (
              <PlayCircleIcon className="w-8 h-8" />
            )}
          </button>
          <p className="text-yellow-300">{`${selectedTrack?.artists[0].name}  -  `}</p>
          <p className="text-yellow-300">{selectedTrack?.name}</p>
        </div>
        <ul className="flex flex-col w-full lg:w-1/2 gap-2 max-h-96 overflow-y-scroll">
          {tracks
            ? tracks.map((track, idx) => {
                return (
                  <div key={idx} className="w-full hover:bg-foreground/10">
                    <button
                      className="flex w-full gap-1"
                      onClick={() => handleSelectTrack(track.track)}
                    >
                      <p>{`${track.track.artists[0].name}  -  `}</p>
                      <p>{track.track.name}</p>
                    </button>
                    <audio id={track.track.id}>
                      <source
                        src={track.track.preview_url ?? ""}
                        type="audio/mpeg"
                      />
                    </audio>
                  </div>
                );
              })
            : null}
        </ul>
      </div>
    </motion.div>
  );
};

const PlaylistCard = forwardRef(PlaylistCardRender);

export default PlaylistCard;
