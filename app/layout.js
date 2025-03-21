// import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/ui/header/Header";
import "./globals.css";
import Navbar from "@/ui/layout/navbar/Navbar";
import { ToastContainer } from "react-toastify";
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "XWMS - Warehouse Management System",
  description: "Warehouse Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
        <div className="app-container">
          <Header />
          <Navbar />
          <main className="main-content">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
