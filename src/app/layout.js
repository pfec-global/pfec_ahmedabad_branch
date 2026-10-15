import { Titan_One, Bebas_Neue, Poppins, Montserrat } from "next/font/google";
import "./globals.css";

const titanOne = Titan_One({
  variable: "--font-titan-one",
  weight: "400",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: "400",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata = {
  title: "PFEC Global - Ahmedabad | Best Study Abroad Consultant in Ahmedabad",
  description:
    "Free expert guidance from your first counselling session to your visa – and support after you land. Trusted by 22,000+ students.",
  icons: {
    icon: { url: "/PFEC-Favicon.webp", type: "image/webp" },
    apple: "/PFEC-Favicon.webp",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${titanOne.variable} ${bebasNeue.variable} ${poppins.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>{children}</body>
    </html>
  );
}
