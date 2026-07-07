import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

const fieldClass =
  "w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-[11px] text-zinc-900 outline-none transition placeholder:text-zinc-300 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-900/5";

export function Label({ children, hint }: { children: ReactNode; hint?: string }) {
  return (
    <span className="mb-1 block text-[10px] font-bold text-zinc-900">
      {children}
      {hint ? <span className="ml-1 font-medium text-zinc-500">{hint}</span> : null}
    </span>
  );
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${fieldClass} ${props.className ?? ""}`} />;
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${fieldClass} resize-none ${props.className ?? ""}`} />;
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`${fieldClass} ${props.className ?? ""}`} />;
}

export function Card({ title, children, action, sub }: { title: string; children: ReactNode; action?: ReactNode; sub?: string }) {
  return (
    <section className="rounded-xl border border-zinc-100 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-[12px] font-bold text-zinc-900">{title}</h2>
          {sub ? <p className="mt-0.5 text-[10px] text-zinc-400">{sub}</p> : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

export function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" }) {
  const styles = {
    primary: "bg-zinc-900 text-white hover:bg-zinc-800",
    secondary: "border border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50",
    ghost: "text-zinc-600 hover:bg-zinc-100",
  };
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-3.5 py-2.5 text-[11px] font-semibold transition disabled:opacity-50 ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export function SectionHeader({ title, sub, action }: { title: string; sub?: string; action?: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div>
        <h2 className="text-[13px] font-bold text-zinc-900">{title}</h2>
        {sub ? <p className="mt-0.5 text-[10px] text-zinc-400">{sub}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function Panel({ children }: { children: ReactNode }) {
  return <div className="rounded-xl border border-zinc-100 bg-white p-4 shadow-sm">{children}</div>;
}