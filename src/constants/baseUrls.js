// API URLs
const LocalUrl = "http://localhost:3002/kyrio/v1/";
const LiveUrl = "http://158.176.135.6:3002/kyrio/v1/";
// Image URLs
const ImageLocalUrl = "http://localhost:3002/";
const ImageLiveUrl = "http://158.176.135.6:3002/";
export const imageBaseUrl =
  window.location.protocol +
  "//" +
  window.location.hostname +
  ":" +
  "3002" +
  "/";
let Base_Url = "";
let Image_Url = "";

if (window.location.hostname == "localhost") {
  Base_Url = LocalUrl
  Image_Url = ImageLocalUrl
} else if (window.location.hostname == "158.176.135.6") {
  Base_Url = LiveUrl
  Image_Url = ImageLiveUrl
}
export const BaseUrl = Base_Url;
export const ImageUrl = Image_Url;

