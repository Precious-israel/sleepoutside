import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  // 🔥 Important for GitHub Pages – use your repo name exactly here
  base: "/sleepoutside/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        product1: resolve(__dirname, "src/product_pages/index.html"),
      },
    },
  },
});
