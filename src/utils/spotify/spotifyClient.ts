import { SpotifyApi } from "@spotify/web-api-ts-sdk";

// const customFetch: RequestImplementation = (
//   input: RequestInfo | URL,
//   init: RequestInit | undefined
// ) => {
//   const modifiedInit: RequestInit = { ...init, cache: "no-cache" };
//   return fetch(input, modifiedInit);
// };

// const opts: SdkOptions = {
//   fetch: customFetch,
// };

export const spotifyApi = SpotifyApi.withClientCredentials(
  process.env.SPOTIFY_CLIENT_ID ?? "",
  process.env.SPOTIFY_CLIENT_SECRET ?? ""
);
