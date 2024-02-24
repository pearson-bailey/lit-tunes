export default async function getAccessToken() {
  const requestBody = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: process.env.SPOTIFY_CLIENT_ID ?? "",
    client_secret: process.env.SPOTIFY_CLIENT_SECRET ?? "",
  });

  try {
    const res = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: requestBody,
    });

    if (res.ok) {
      const data = await res.json();
      return data.access_token;
    } else {
      throw new Error(`Failed to fetch access token. Status: ${res.status}`);
    }
  } catch (error) {
    throw new Error(`Failed to fetch access token. Error: ${error}`);
  }
}
