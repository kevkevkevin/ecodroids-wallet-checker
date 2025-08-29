import "./globals.css";

export const metadata = {
  title: "Ecodroids Wallet Checker",
  description: "Check if your wallet is on the list 🐣",
  icons: {
    icon: "images/favicon.jpg", // or .svg
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}
