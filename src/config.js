// Vite exposes only variables prefixed with VITE_ to client code.
// the .env file should define VITE_API_BASE_URL accordingly.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default API_BASE_URL;