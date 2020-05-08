export default {
  client: {
    BASE_URL: process.env.REACT_APP_BASE_URL,
  },
  backend: {
    BASE_URL: process.env.REACT_APP_BACKEND_BASE_URL,
  },
  reddit: {
    CLIENT_ID: process.env.REACT_APP_CLIENT_ID,
    CLIENT_URL: process.env.REACT_APP_CLIENT_URL,
    CLIENT_REDIRECT_URI: `${process.env.REACT_APP_CLIENT_URL}/auth/reddit`,
  },
}
