import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import { ReactQueryProvider } from "./ReactQueryProvider";
import Image from "next/image";
import localFont from "next/font/local";

import {
  bold,
  book,
  italic,
  medium,
  semiBolditalic,
  thin,
} from "./myFont/Fonts";


export default function RootLayout({ children }) {
  return (
    <ReactQueryProvider>
      <html lang="en" suppressHydrationWarning className={book?.className}>
        <body suppressHydrationWarning>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Image
              src={"/hero-bg.jpg"}
              fill
              alt="background pic"
              sizes="100vw"
              style={{
                objectFit: "cover",
                zIndex: -1,
                overflow: "hidden"
              }}
            />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ReactQueryProvider>
  );
}
