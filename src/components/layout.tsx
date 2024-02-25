export default function Layout({ children }: { children: React.ReactNode }) {
  return (
      <div>
          <div data-nosnippet className="tk-nav-topbar-wrapper">
              <nav className="tk-nav-topbar-container">
                  <ul className="nav2">
                      <li className="menu-item"><a href="https://tarnkappe.info">Home</a></li>
                      <li className="menu-item"><a href="https://tarnkappe.info/forum/">Forum</a></li>
                      <li className="menu-item"><a href="https://shop.tarnkappe.info">Shop</a></li>
                      <li className="menu-item"><a href="https://tarnkappe.info/spenden/">Spenden</a></li>
                      <li className="menu-item"><a href="https://podcast.tarnkappe.info">Podcast</a></li>
                  </ul>
              </nav>
          </div>

          <header className="flex h-16 w-full flex-row items-center justify-between bg-gray-600 px-4">
        <span className="text-2xl font-bold text-white">
          Tarnkappe - Bitcoind Statistik
        </span>
      </header>
    <main className="flex w-full flex-col">
      <div>{children}</div>
    </main>

          <footer data-nosnippet className="footer_tk-bottom">
              <div>
                  <p>Source code available on <a href="https://github.com/tarnkappe-info/bitcoind-stats">github</a>.</p>
                  <p className="grey"><a href="https://tarnkappe.info/impressum">Impressum</a> <a href="https://tarnkappe.info/datenschutzerklaerung">Datenschutz</a></p>
                  <p className="grey">2014-<span>2024</span> Tarnkappe.info</p>
                  <a href="https://tarnkappe.info/ueber-tarnkappe/"><img className="logo" loading="lazy" src="https://tarnkappe.info/wp-content/uploads/website-header-no-motto-klein.png" alt="Tarnkappe.info Logo"></img></a>
              </div>
          </footer>

      </div>
  );
}
