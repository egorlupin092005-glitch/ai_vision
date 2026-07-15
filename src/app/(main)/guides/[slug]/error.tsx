"use client";

export default function GuideError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="pt-32 pb-16 px-4 text-center">
      <h1 className="text-2xl font-bold text-text-primary mb-3">
        Something went wrong
      </h1>
      <p className="text-text-muted mb-6">
        {error.message || "Failed to load guide."}
      </p>
      <button
        onClick={reset}
        className="inline-flex items-center px-6 py-3 glass rounded-xl text-sm font-medium hover:brightness-110 transition-all cursor-pointer"
      >
        Try again
      </button>
    </div>
  );
}
