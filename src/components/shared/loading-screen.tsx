export function LoadingScreen({ label = "Mapping Daniel’s portfolio" }: { label?: string }) {
  return (
    <div className="loading-screen" role="status" aria-live="polite">
      <div className="grid justify-items-center gap-4">
        <div className="loading-screen__mark" aria-hidden="true">
          DL
        </div>
        <p className="m-0 text-sm text-[var(--color-text-muted)]">{label}</p>
      </div>
    </div>
  );
}
