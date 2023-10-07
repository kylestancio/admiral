import './globals.css'
import type { Metadata } from 'next'
import Providers from '@/components/Providers'

export const metadata: Metadata = {
  title: 'ADMIRAL | web',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className='w-full h-full' lang="en">
      <body className='w-full h-full bg-white dark:bg-zinc-950'>
        <Providers>
          <header>
            {/* <TopNavigation /> */}
          </header>
          <main className=''>
            {children}
          </main>
          <footer>
            {/* INSERT FOOTER HERE */}
          </footer>
        </Providers>
      </body>
    </html>
  )
}
