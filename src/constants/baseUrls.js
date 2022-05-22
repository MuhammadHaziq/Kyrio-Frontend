// API URLs
const LocalUrl = "http://localhost:3002/kyrio/v1/";
const LiveUrl = "https://api.kyriopos.com/kyrio/v1/";
// Image URLs
const ImageLocalUrl = "http://localhost:3002/";
const ImageLiveUrl = "https://api.kyriopos.com/";

export const imageBaseUrl = "https://api.kyriopos.com/";
let Base_Url = "";
let Image_Url = "";

if (window.location.hostname == "localhost") {
  Base_Url = LocalUrl
  Image_Url = ImageLocalUrl
} else {
  Base_Url = LiveUrl
  Image_Url = ImageLiveUrl
 } 
//  else {
  // Office IP
  // Base_Url = "http://192.168.18.32:3002/kyrio/v1/"
  // Image_Url = "http://192.168.18.32:3002/"
  // Home IP
  // Base_Url = "http://192.168.10.7:3002/kyrio/v1/"
  // Image_Url = "http://192.168.10.7:3002/"
// }

export const BaseUrl = Base_Url;
export const ImageUrl = Image_Url;

