import { HEADER } from "./src/header.js";

export default {
  input: "src/main.js",
  output: {
    file: `dist/dev-vnpay-helper.user.js`,
    format: "iife",
    banner: HEADER,
  },
};
