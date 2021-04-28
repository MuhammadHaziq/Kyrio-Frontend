// API URLs
const LocalUrl = "http://localhost:3000/kyrio/v1/";
const LiveUrl = "http://158.176.135.6:3000/kyrio/v1/";
// Image URLs
const ImageLocalUrl = "http://localhost:3000/";
const ImageLiveUrl = "http://158.176.135.6:3000/";
export const imageBaseUrl =
  window.location.protocol +
  "//" +
  window.location.hostname +
  ":" +
  "3000" +
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
export const BaseUrl = LiveUrl;
export const ImageUrl = ImageLiveUrl;

