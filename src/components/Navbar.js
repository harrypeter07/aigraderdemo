// src/components/Navbar.js
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        <Link href="/" className="navbar-brand">
          AI Assignment Grader
        </Link>
      </div>
    </nav>
  );
}