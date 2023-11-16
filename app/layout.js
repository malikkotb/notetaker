import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import { ReactQueryProvider } from "./ReactQueryProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <ReactQueryProvider>
      <html lang="en" suppressHydrationWarning>
        <body suppressHydrationWarning className={inter.className}>
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
