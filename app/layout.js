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
        <body className="dark:text-customWhite text-customBlack" suppressHydrationWarning>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ReactQueryProvider>
  );
}
