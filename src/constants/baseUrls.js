const mode = "staging"; // "staging" "production"
// API URLs
const LocalUrl = "http://localhost:3002/kyrio/v1/";
const LiveUrl = "https://api.kyriopos.com/kyrio/v1/";
const StagingUrl = "https://apidev.kyriopos.com/kyrio/v1/";
// Socket URLs
const SocketLocalUrl = "http://localhost:3002";
const SocketLiveUrl = "https://api.kyriopos.com";
const SocketStagingUrl = "https://apidev.kyriopos.com";

// Image URLs
const ImageLocalUrl = "http://localhost:3002/";
const ImageLiveUrl = "https://api.kyriopos.com/";
const ImageStagingUrl = "https://apidev.kyriopos.com/";

// Dashboard URLs
const DashboardLocalUrl = "http://localhost:3000";
const DashboardLiveUrl = "https://dashboard.kyriopos.com";
const DashboardStagingUrl = "https://dashboarddev.kyriopos.com";

// export const imageBaseUrl = "https://api.kyriopos.com/";
export const imageBaseUrl = "https://api.kyriopos.com/";
let Base_Url = "";
let Image_Url = "";
let dashboard_Url = "";
let socket_Url = "";

if (window.location.hostname === "localhost") {
  Base_Url = LocalUrl;
  Image_Url = ImageLocalUrl;
  dashboard_Url = DashboardLocalUrl;
  socket_Url = SocketLocalUrl;
} else {
  if (mode === "production") {
    Base_Url = LiveUrl;
    Image_Url = ImageLiveUrl;
    dashboard_Url = DashboardLiveUrl;
    socket_Url = SocketLiveUrl;
  } else if (mode === "staging") {
    Base_Url = StagingUrl;
    Image_Url = ImageStagingUrl;
    dashboard_Url = DashboardStagingUrl;
    socket_Url = SocketStagingUrl;
  }
}

export const BaseUrl = Base_Url;
export const ImageUrl = Image_Url;
export const DashboardUrl = dashboard_Url;
export const SocketURL = socket_Url; // Server IP
