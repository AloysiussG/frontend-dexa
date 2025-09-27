import Axios from "axios";

// sementara tidak menggunakan .env supaya mudah &
// dapat langsung dipakai untuk test
export const URL = {
  NEXT_FRONTEND_APP_URL: "http://localhost:3000",
  NEST_BACKEND_APP_URL: "http://localhost:8000",
};

const axios = Axios.create({
  baseURL: URL.NEST_BACKEND_APP_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  // withCredentials: true,
  //   withXSRFToken: true,
});

function getTokenFromCookie() {
  if (typeof document !== "undefined") {
    const match = document.cookie.match(/(^| )token=([^;]+)/);
    return match ? match[2] : null;
  }
  return null;
}

axios.interceptors.request.use((config) => {
  const token = getTokenFromCookie();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axios;
