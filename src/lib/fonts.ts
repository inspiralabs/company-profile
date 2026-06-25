import { Source_Serif_4, Rethink_Sans } from "next/font/google";

export const sourceSerif4 = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz"],
});

export const rethinkSans = Rethink_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
