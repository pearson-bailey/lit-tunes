export function secondsToMinutesAndSeconds(seconds: number) {
  // Calculate minutes and seconds
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  // Format minutes and seconds to always have two digits
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = secs < 10 ? `0${secs}` : secs;

  // Return the formatted time
  return `${formattedMinutes}:${formattedSeconds}`;
}
