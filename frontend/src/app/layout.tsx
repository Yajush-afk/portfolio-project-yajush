import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yajush Srivastava | Portfolio",
  description: "Computer Science Student & Developer",
  icons: {
    icon: "http://localhost:8000/static/favicon.png",
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
                  var localTheme = localStorage.getItem('theme');
                  // Default to dark mode if no preference or if preference is dark
                  if (localTheme === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
                    if (!localTheme) localStorage.setItem('theme', 'dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <Navbar />
        <main className="min-h-screen pt-16 container mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
