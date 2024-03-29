import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "LitTunes | Set the reading mood",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <Header />
        <main className="min-h-[calc(100vh-9.5rem)] flex flex-col items-center">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
