import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div>
        <p className="eyebrow">39 Notes / editorial log</p>
        <Link href="/" className="wordmark">
          39 Notes
        </Link>
      </div>
      <div className="header-meta">
        <p>Subdomain candidate</p>
        <strong>39notes</strong>
      </div>
    </header>
  );
}
