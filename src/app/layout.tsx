import type { Metadata } from "next";
import Hamburger from "../component/Hamburger";
import BackToTopButton from "../component/BackToTopButton";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "JDP Electrical Services Pty Ltd",
  description: "JDP Electrical Services offer a complete range of electrical installations and services throughout the Sydney Metropolitan and North Shore Region. Lane Cove, NSW, Australia 2066, North Shore Electrician.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="Cache-control" content="public" />
        <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no" />
        <meta name="theme-color" content="#FFF" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <base href="/" />
        <link rel="manifest" crossOrigin="use-credentials" href="/site.webmanifest" />
        <link rel="icon" href="/favicons/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#000" />
      </head>
      <body>
        <Hamburger />
        {children}
        <BackToTopButton />
      </body>
    </html>
  );
}
