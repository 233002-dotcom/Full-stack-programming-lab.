import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Next.js Lab 8 - Aman Mir 233002',
  description: 'Full Stack Programming Lab 8 - Air University',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
