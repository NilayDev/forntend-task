import Providers from "./providers";
import "./globals.css";

export const metadata = {
  title: "Pokemon App",
  description: "A simple Pokemon app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
