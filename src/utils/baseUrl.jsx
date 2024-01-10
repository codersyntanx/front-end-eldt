const baseUrl =
  import.meta.env.VITE_NODE_ENV === "production"
    ? "https://unitedeldt.com" // "https://unitedeldt.com"
    : "http://localhost:5173";

export default baseUrl;
