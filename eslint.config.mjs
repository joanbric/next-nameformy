import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";


const compat = new FlatCompat({
  baseDirectory: __dirname,
});
