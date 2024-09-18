import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,  // Mantiene las globales de navegador si las necesitas
        ...globals.node,     // Agrega las globales de Node.js, como `process`
      },
    },
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    ignores: [
      "dist"
    ]
  },
  {
    settings: {
      react: {
        version: "18.0",  
      },
    },
  },
];
