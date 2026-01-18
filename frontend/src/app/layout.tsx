import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { SongProvider } from "@/context/SongContext";
import SongPlayer from "@/components/SongPlayer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yajush Srivastava | Portfolio",
  description: "Computer Science Student & Developer",
  icons: {
    icon: "/static/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedIndex = localStorage.getItem('currentSongIndex');
                  var theme = 'heat-waves'; // Default
                  if (savedIndex !== null) {
                    var index = parseInt(savedIndex, 10);
                    var themes = ['heat-waves', 'shape-of-you', 'night-changes', 'yellow', 'i-like-me-better', 'co2'];
                    if (index >= 0 && index < themes.length) {
                      theme = themes[index];
                    }
                  }
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />
        <SongProvider>
          <SongPlayer />
          <Navbar />
          <main className="min-h-screen pt-16 container mx-auto px-4 py-8">
            {children}
          </main>
        </SongProvider>
      </body>
    </html>
  );
}
