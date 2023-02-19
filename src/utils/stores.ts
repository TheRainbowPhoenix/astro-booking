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


export const basket = map(
  {
    rooms: [{
      type: "Sharing",
      name: "Deluxe Room",
      totalPrice: 690.71,
      cancellation: [{ message: "Cancellation fee applies" }],
    }],
    extras: [],
    mobilePicerVisible: false
  }
)