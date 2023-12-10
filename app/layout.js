import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import { ReactQueryProvider } from "./ReactQueryProvider";
import Image from "next/image";
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
            <Image
              src={"/hero-bg.jpg"}
              fill
              alt="background pic"
              sizes="100vw"
              style={{
                objectFit: "cover",
                zIndex: -1,
              }}
            />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ReactQueryProvider>
  );
}
