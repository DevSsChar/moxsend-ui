import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Moxsend — AI-Powered Cold Email Generator",
  description:
    "Turn your product vision into high-converting email sequences in seconds using AI-first helpdesk logic.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg-primary text-off-black antialiased">
        {children}
      </body>
    </html>
  );
}
