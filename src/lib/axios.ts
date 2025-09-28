import Axios from "axios";

// sementara tidak menggunakan .env supaya mudah &
// dapat langsung dipakai untuk test
export const URL = {
  NEXT_FRONTEND_APP_URL:
    process.env.NEXT_PUBLIC_FRONTEND_APP_URL || "http://localhost:3000",
  NEST_BACKEND_APP_URL:
    process.env.NEXT_PUBLIC_BACKEND_APP_URL || "http://localhost:8000",
};

const axios = Axios.create({
  baseURL: URL.NEST_BACKEND_APP_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
});

export default axios;
