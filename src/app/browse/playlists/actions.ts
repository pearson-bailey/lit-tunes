"use server";

import { Book, Playlist } from "@/src/types/client";

export async function getPlaylistGenres(): Promise<string[]> {
  try {
    var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`);

var requestOptions: RequestInit = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

const res: Response = await fetch("https://api.spotify.com/v1/recommendations/available-genre-seeds", requestOptions);

    if (res.ok) {
      const data = await res.json();
      return data.genres;
    } else {
      throw new Error(`Failed to fetch playlist genres. Status: ${res.status}`);
    }
  } catch (error) {
    throw new Error(`Failed to fetch playlist genres. Error: ${error}`);
  }
}

export async function browsePlaylistsByGenre(genre: string): Promise<Playlist[]> {
  try {
    var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`);

    var requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    const res = await fetch(`https://api.spotify.com/v1/search?q=${genre}&type=playlist&limit=40&offset=0`, requestOptions);

    if (res.ok) {
      console.log(res);
      const data = await res.json();
      const mappedData: Playlist[] =  data.playlists.items.map((playlist: any) => ({
        name: playlist.name,
        description: playlist.description,
        href: playlist.href,
        images: playlist.images,
        primary_color: playlist.primary_color,
        tracks: playlist.tracks,
      }));
      return mappedData;
    } else {
      throw new Error(`Failed to fetch genres. Status: ${res.status}`);
    }
  } catch (error) {
    throw new Error(`Failed to fetch genres. Error: ${error}`);
  }
}
