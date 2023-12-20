import type { Metadata } from 'next'
import localFont from "next/font/local"
import './globals.css'

const cabinetGrotesk = localFont({
  src: [{
    path: '../assets/cabinet-grotesk/CabinetGrotesk-Variable.woff2',
  }, {
    path:"../assets/cabinet-grotesk/CabinetGrotesk-Variable.woff",
  }, {
    path: '../assets/cabinet-grotesk/CabinetGrotesk-Variable.ttf',
  }],
  display: 'swap',
  style: "normal",
  variable: "--font-cabinet",
})

const satoshi = localFont({
  src: [{
    path: '../assets/satoshi/Satoshi-Variable.woff2',
  }, {
    path:"../assets/satoshi/Satoshi-Variable.woff",
  }, {
    path: '../assets/satoshi/Satoshi-Variable.ttf',
  }],
  display: 'swap',
  style: "normal",
  variable: "--font-satoshi",
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${cabinetGrotesk.variable} font-cabinet ${satoshi.variable}`}>{children}</body>
    </html>
  )
}
