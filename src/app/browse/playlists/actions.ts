"use server";

import { spotifyApi } from "@/src/utils/spotify/spotifyClient";
import {
  ItemTypes,
  PlaylistedTrack,
  SimplifiedPlaylist,
  Track,
} from "@spotify/web-api-ts-sdk";
import { cookies } from "next/headers";

export async function browsePlaylistsByGenre(
  genre: string
): Promise<SimplifiedPlaylist[]> {
  const types: readonly ItemTypes[] = ["playlist"];
  try {
    await clearAccessTokenCookie();
    const res = await spotifyApi.search(genre, types);

    if (res.playlists?.items) {
      return res.playlists?.items as SimplifiedPlaylist[];
    } else {
      throw new Error(`Failed to fetch playlists by genre.`);
    }
  } catch (error) {
    const e = error as Error;
    throw new Error(`Failed to fetch playlists by genre. Error: ${e.message}`);
  }
}

export async function getPlaylistGenres(): Promise<string[]> {
  try {
    await clearAccessTokenCookie();
    const res = await spotifyApi.recommendations.genreSeeds();

    if (res) {
      return res.genres;
    } else {
      throw new Error("Failed to fetch playlist genres");
    }
  } catch (error) {
    const e = error as Error;
    throw new Error(`Failed to fetch playlist genres. Error: ${e.message}`);
  }
}

export async function getTracksFromPlaylist(
  id: string
): Promise<PlaylistedTrack<Track>[]> {
  try {
    await clearAccessTokenCookie();
    const res = await spotifyApi.playlists.getPlaylistItems(id);

    if (res) {
      return res.items;
    } else {
      throw new Error("Failed to fetch tracks from playlist");
    }
  } catch (error) {
    const e = error as Error;
    throw new Error(
      `Failed to fetch tracks from playlist. Error: ${e.message}`
    );
  }
}

async function clearAccessTokenCookie() {
  cookies().delete("access_token");
  const tokenRes = await spotifyApi.getAccessToken();
  cookies().set("access_token", tokenRes?.access_token ?? "");
}
