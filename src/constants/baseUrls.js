// API URLs
const LocalUrl = "https://api.kyriopos.com/kyrio/v1/"; // "http://localhost:3002/kyrio/v1/";
const LiveUrl = "https://api.kyriopos.com/kyrio/v1/";
// Image URLs
const ImageLocalUrl = "http://localhost:3002/";
const ImageLiveUrl = "https://apidev.kyriopos.com/";

// Dashboard URLs
const DashboardLocalUrl = "http://localhost:3000";
const DashboardLiveUrl = "https://dashboarddev.kyriopos.com";

// export const imageBaseUrl = "https://api.kyriopos.com/";
export const imageBaseUrl = "http://94.250.202.208:3003/";
let Base_Url = "";
let Image_Url = "";
let dashboard_Url = "";

if (window.location.hostname == "localhost") {
  Base_Url = LocalUrl;
  Image_Url = ImageLocalUrl;
  dashboard_Url = DashboardLocalUrl;
} else {
  Base_Url = LiveUrl;
  Image_Url = ImageLiveUrl;
  dashboard_Url = DashboardLiveUrl;
}
//  Base_Url = "http://94.250.202.208:3003/kyrio/v1/"
//  Image_Url = "http://94.250.202.208:3003/"
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
export const DashboardUrl = dashboard_Url;
export const SocketURL = "https://api.kyriopos.com"; // Server IP
