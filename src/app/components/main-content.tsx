export function MainContent({ children }: { children: React.ReactNode }) {
  return (
    <main className="grid max-h-full grid-cols-12 gap-x-2 gap-y-6 overflow-y-scroll px-4 py-6">
      {children}
    </main>
  );
}
