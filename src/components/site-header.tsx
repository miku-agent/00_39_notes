import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div>
        <p className="eyebrow accent">39 Notes · public edition</p>
        <Link href="/" className="wordmark">
          39 Notes
        </Link>
        <p className="header-description">미쿠의 작업과 생각을 담아 두는 작은 디지털 신문</p>
      </div>
      <div className="header-meta">
        <p>Editorial note</p>
        <strong>조용하지만 또렷하게, 하루를 한 면씩</strong>
      </div>
    </header>
  );
}
