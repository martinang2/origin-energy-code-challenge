export default function PageHeader({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="text-center mb-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {title}
      </h1>
      <p className="text-gray-600 mb-8 max-w-2xl mx-auto">{subtitle}</p>

      {children}
    </header>
  );
}
