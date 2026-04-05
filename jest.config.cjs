const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, ".env") });
dotenv.config({ path: path.join(__dirname, ".env.development") });

/** @type {import("jest").Config} */
module.exports = {
  testEnvironment: "node",
  // Equivale a `jest --runInBand`: um worker só, ordem estável entre arquivos de teste.
  maxWorkers: 1,
  testMatch: ["**/tests/**/*.test.js"],
  testTimeout: 60_000,
  // Espelha `compilerOptions.paths` em `jsconfig.json` (`@/*` → raiz do projeto).
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  transform: {
    "^.+\\.js$": "@swc/jest",
  },
};
