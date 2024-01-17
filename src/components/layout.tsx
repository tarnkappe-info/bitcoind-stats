export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col w-full">
      <header className="flex flex-row justify-between items-center w-full h-16 px-4 bg-gray-600">
        <span className="text-2xl font-bold text-white">
          Bitcoin Statistics
        </span>
      </header>
      <div>{children}</div>
      <footer className="w-full text-center p-2">
        {new Date().getFullYear()} © BTC Stats
      </footer>
    </main>
  );
}
