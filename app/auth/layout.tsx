export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen">
      <div className="flex min-h-full flex-col justify-center">
        <div className="mx-auto w-full max-w-md rounded border border-gray-200 px-8 py-8">
          {children}
        </div>
      </div>
    </div>
  );
}
