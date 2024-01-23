export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex w-full flex-col">
      <header className="flex h-16 w-full flex-row items-center justify-between bg-gray-600 px-4">
        <span className="text-2xl font-bold text-white">
          Tarnkappe - Bitcoind Statistik
        </span>
      </header>
      <div>{children}</div>
      <footer className="w-full p-2 text-center">
        {new Date().getFullYear()} ©{" "}
        <a
          className="text-blue-500 transition-colors hover:text-blue-600"
          href="https://tarnkappe.info"
        >
          Tarnkappe.info
        </a>
      </footer>
    </main>
  );
}
