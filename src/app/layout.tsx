import type { Metadata, Viewport } from "next";
import { Niramit } from "next/font/google";
import "./globals.css";

const niramit = Niramit({
  variable: "--font-niramit",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://tramamxoi.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Trà Mâm Xôi Sâm Tố Nữ | Mộc Tâm",
    template: "%s | Mộc Tâm",
  },
  description:
    "Trà Mâm Xôi Sâm Tố Nữ Mộc Tâm – cân bằng nội tiết, đẹp da, khỏe sinh sản. 100% thảo mộc tự nhiên. Ưu đãi hôm nay: mua 3 tặng 1.",
  keywords: [
    "trà mâm xôi",
    "sâm tố nữ",
    "mộc tâm",
    "cân bằng nội tiết",
    "đẹp da",
    "sức khỏe phụ nữ",
  ],
  authors: [{ name: "Mộc Tâm" }],
  creator: "Mộc Tâm",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: siteUrl,
    siteName: "Trà Mâm Xôi Sâm Tố Nữ",
    title: "Trà Mâm Xôi Sâm Tố Nữ | Mộc Tâm",
    description:
      "Cân bằng nội tiết – Đẹp da – Khỏe sinh sản. Trà thảo mộc tự nhiên dành cho phái đẹp.",
    images: [
      {
        url: "/images/hero.webp",
        width: 768,
        height: 1376,
        alt: "Trà Mâm Xôi Sâm Tố Nữ Mộc Tâm",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trà Mâm Xôi Sâm Tố Nữ | Mộc Tâm",
    description:
      "Cân bằng nội tiết – Đẹp da – Khỏe sinh sản. Ưu đãi mua 3 tặng 1.",
    images: ["/images/hero.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#3b48df",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Trà Mâm Xôi Sâm Tố Nữ",
    brand: {
      "@type": "Brand",
      name: "Mộc Tâm",
    },
    description:
      "Trà thảo mộc hỗ trợ cân bằng nội tiết, đẹp da và khỏe sinh sản cho phụ nữ.",
    image: [`${siteUrl}/images/hero.webp`],
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "VND",
      lowPrice: "169000",
      highPrice: "399000",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <html lang="vi" className={`${niramit.variable} h-full antialiased`}>
      <body className="min-h-full bg-white font-sans text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
