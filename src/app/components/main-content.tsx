export function MainContent({ children }: { children: React.ReactNode }) {
  return (
    <main
      autoFocus
      className="grid max-h-full grid-cols-12 gap-x-2 gap-y-6 overflow-y-auto px-4 py-6 focus:outline-none"
    >
      {children}
    </main>
  );
}
