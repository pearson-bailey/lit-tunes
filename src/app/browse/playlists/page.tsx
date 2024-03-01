"use client";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { browsePlaylistsByGenre, getPlaylistGenres } from "./actions";
import PlaylistsGrid from "@/src/components/PlaylistsGrid";
import { Category, SimplifiedPlaylist } from "@spotify/web-api-ts-sdk";

export default function SearchResults() {
  const [genres, setGenres] = useState<string[] | null>(null);
  const [playlists, setPlaylists] = useState<SimplifiedPlaylist[] | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const onSearch = useCallback(async () => {
    if (selectedGenre) {
      const playlistResults = await browsePlaylistsByGenre(selectedGenre);
      if (playlistResults) {
        setPlaylists(playlistResults);
      }
    }
  }, [selectedGenre]);

  useEffect(() => {
    const getGenres = async () => {
      const genreResults: string[] | null = await getPlaylistGenres();
      if (genreResults) {
        setGenres(genreResults);
        const initialPlaylists = await browsePlaylistsByGenre(
          genreResults[0]
        );
        if (initialPlaylists.length) {
          setPlaylists(initialPlaylists);
        }
      }
    };

    getGenres();
  }, []);

  const handleGenreChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch();
  };

  return (
    <>
      <div className="flex flex-col w-full justify-start gap-2 text-xs md:text-base">
        <form
          className="animate-in flex w-full justify-center items-start gap-1 my-6"
          onSubmit={handleSubmit}
        >
          <select
            className="rounded-md py-1 bg-background text-foreground border"
            name="genre"
            placeholder={genres ? genres[0] : "Choose a genre"}
            onChange={handleGenreChange}
          >
            {genres
              ? genres.map((genre, idx) => (
                  <option key={idx} value={genre}>
                    {genre}
                  </option>
                ))
              : null}
          </select>
          <button className="bg-green-700 hover:bg-green-600 rounded-md px-2 py-1 text-white">
            Filter Playlists
          </button>
        </form>
      </div>
      {playlists?.length ? (<PlaylistsGrid playlists={playlists}/>) : (<span>No playlists found</span>)}
    </>
  );
}
