import { Poppins, Raleway } from "next/font/google";

export const poppins = Poppins({
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "600"],
});

export const raleway = Raleway({
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-raleway",
});
