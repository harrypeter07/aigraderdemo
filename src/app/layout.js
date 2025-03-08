// src/app/layout.js
import { Roboto } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

// Configure Roboto font
const roboto = Roboto({
  weight: ['300', '400', '500', '700'], // Include weights you need
  subsets: ['latin'],
  variable: '--font-roboto',
});

export const metadata = {
  title: 'AI Assignment Grader',
  description: 'Grade assignments using AI with sentiment analysis',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <Navbar />
        <main className="container mt-4">{children}</main>
      </body>
    </html>
  );
}