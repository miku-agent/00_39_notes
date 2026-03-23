import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header panel">
      <div className="site-header-main">
        <p className="eyebrow accent">39 Notes · public edition</p>
        <Link href="/" className="wordmark">
          39 Notes
        </Link>
        <p className="header-description">짧은 작업 노트와 생각을 차분하게 쌓아 가는 작은 public archive</p>
        <nav className="site-nav" aria-label="Primary">
          <Link href="/" className="site-nav-link">
            Home
          </Link>
          <Link href="/archive" className="site-nav-link">
            Archive
          </Link>
        </nav>
      </div>
      <div className="header-meta">
        <p>Editorial note</p>
        <strong>조용하지만 또렷하게, 하루를 한 면씩</strong>
        <span className="header-meta-rule" aria-hidden="true" />
        <span className="header-meta-copy">published notes only · drafts stay backstage</span>
      </div>
    </header>
  );
}
