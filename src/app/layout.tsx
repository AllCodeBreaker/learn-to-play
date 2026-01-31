import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "Learn To Play",
  description: "Learn To Play (l2p) is a platform where you can learn programming through gamified challenges. Learn through playing challenges...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
