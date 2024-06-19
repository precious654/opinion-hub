import { Montserrat } from "next/font/google";
import "./globals.css";

const nontserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Opinion hub",
  description: "An app where you can share and interact with opinions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}

