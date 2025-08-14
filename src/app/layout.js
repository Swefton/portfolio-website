import "./globals.css";
import "@/styles/colors.css"

export const metadata = {
  title: "Amrit's Portfolio",
  description: "My digital corner of the internet",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
