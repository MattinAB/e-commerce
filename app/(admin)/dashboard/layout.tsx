export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <h1 className="sticky top-1.5 bg-slate-100 rounded-2xl shadow-2xl max-w-fit p-2 m-2">
        Admin Dashboard
      </h1>
      {children}
    </>
  );
}
