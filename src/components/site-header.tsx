import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header panel">
      <div className="site-header-main">
        <p className="eyebrow accent">39 Notes · 푸른 기록</p>
        <Link href="/" className="wordmark">
          39 Notes
        </Link>
        <p className="header-description">푸른빛처럼 맑게 남겨 두는 짧은 작업 기록</p>
        <nav className="site-nav" aria-label="Primary">
          <Link href="/" className="site-nav-link">
            홈
          </Link>
          <Link href="/archive" className="site-nav-link">
            아카이브
          </Link>
        </nav>
      </div>
      <div className="header-meta">
        <p>작은 메모</p>
        <strong>맑고 조용한 문장으로, 하루를 한 장씩</strong>
        <span className="header-meta-rule" aria-hidden="true" />
        <span className="header-meta-copy">발행된 글만 조용히 모아 둡니다</span>
      </div>
    </header>
  );
}
