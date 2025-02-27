import type { Metadata } from 'next'
import { Calistoga, Poppins, Poiret_One } from 'next/font/google'
import Header from '@ui/Header'
import './globals.css'

const calistoga = Calistoga({
  variable: '--font-calistoga',
  weight: '400',
  subsets: ['latin']
})

const geistMono = Poiret_One({
  variable: '--font-poir',
  weight: '400',
  subsets: ['latin']
})

const poppins = Poppins({
  variable: '--font-poppins',
  weight: '400',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'NameForMy',
  description: 'Name generator app'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${calistoga.variable} ${geistMono.variable} ${poppins.variable} antialiased bg-dark`}
      >
        <Header />
        {children}
      </body>
    </html>
  )
}
