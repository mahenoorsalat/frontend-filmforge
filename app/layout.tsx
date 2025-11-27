"use client";

// Removed: import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// --- NEW IMPORTS ---
import Sidebar from "../components/Sidebar";
import { usePathname } from "next/navigation";
// -------------------

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Removed the conflicting `export const metadata` block.

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Hooks can only be used in Client Components, hence the "use client" directive above.
  const pathname = usePathname();
  // Define paths where the sidebar should NOT be shown
  const excludedPaths = ["/", "/dash"];
  const showSidebar = !excludedPaths.includes(pathname);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Conditional rendering for the Sidebar and the main container structure */}
        {showSidebar ? (
          <div className="flex h-screen bg-[#09090B] overflow-hidden">
            <Sidebar />
            {/* Main content wrapper takes remaining space and allows scrolling */}
            <div className="flex-1 overflow-auto">
              {children}
            </div>
          </div>
        ) : (
          // For excluded paths, render children directly (they handle their own layout/styling)
          <>{children}</>
        )}
      </body>
    </html>
  );
}