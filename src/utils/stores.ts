import { atom, map } from "nanostores";
import { persistentMap } from "@nanostores/persistent";
import { encode, parse } from "./crypto";

export const selectorsValues = persistentMap(
  "selectors:",
  {
    lang: "EN",
    currency: "EUR",
  },
  {
    encode: encode,
    decode: parse,
  }
);
