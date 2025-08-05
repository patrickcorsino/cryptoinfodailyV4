// Root layout: wraps all pages, includes header/navigation
import '../styles/globals.css';
import Header from '../components/Header';

export const metadata = {
  title: 'Crypto Info Daily',
  description: 'Next-level crypto dashboard — faster, cleaner, and more degen than CMC.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <div className="min-h-screen bg-darkBg pt-20">
          {children}
        </div>
      </body>
    </html>
  );
}
