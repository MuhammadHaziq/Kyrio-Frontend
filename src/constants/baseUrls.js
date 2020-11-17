const LocalUrl = "http://localhost:3000/kyrio/v1/";
const LiveUrl = "http://158.176.135.6:3000/kyrio/v1/";
export const imageBaseUrl =
  window.location.protocol +
  "//" +
  window.location.hostname +
  ":" +
  "3000" +
  "/";
  const date = new Date();
  const dateAsString = date.toString();
  const timezone = dateAsString.match(/\(([^\)]+)\)$/)[1];
  
  console.log(timezone);
export const BaseUrl = LocalUrl;
