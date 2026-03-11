export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="space-y-6 max-w-screen-2xl mx-auto">{children}</div>;
}
