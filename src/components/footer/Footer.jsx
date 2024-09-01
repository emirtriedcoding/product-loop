import Link from "next/link";

import { Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="footer footer-center mt-20 rounded rounded-t-3xl border border-base-300 bg-base-100 p-10 text-base-content shadow-md">
      <nav className="grid grid-flow-col gap-4 text-xs font-bold">
        <Link href="/feedback" className="link-hover link">
          پیشنهادات و انتقادات
        </Link>
        <Link href="/products" className="link-hover link">
          محصولات
        </Link>
        <Link href="/categories" className="link-hover link">
          دسته بندی ها
        </Link>
      </nav>
      <nav className="grid grid-flow-col gap-4 text-xs font-bold">
        <Link href="https://www.linkedin.com/in/emirtreidcoding/">
          <Linkedin strokeWidth={1.5} />
        </Link>
        <Link href="https://instagram.com/emirtriedcoding">
          <Instagram strokeWidth={1.5} />
        </Link>
        <Link href="https://x.com/emirtriedcoding">
          <Twitter strokeWidth={1.5} />
        </Link>
      </nav>
      <aside>
        <p className="text-xs font-semibold">
          © {new Date().getFullYear()} - تمامی حقوق برای پروداکت لوپ محفوظ است
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
