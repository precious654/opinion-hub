import { Montserrat } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Provider from "@/components/Provider";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Opinion hub",
  description: "An app where you can share and interact with opinions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Provider>
          <div className="container">
            <Navbar />
            {children}
          </div>
        </Provider>
      </body>
    </html>
  );
}

