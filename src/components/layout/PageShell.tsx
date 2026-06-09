import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

type PageShellProps = {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
};

export function PageShell({ title, subtitle, children }: PageShellProps) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-white to-blue-50/30 pt-28">
        <div className="section-padding mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
            GoDigital
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-brand-navy md:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 max-w-2xl text-lg text-slate-600">{subtitle}</p>
          )}
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
