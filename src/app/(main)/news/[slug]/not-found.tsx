import Link from "next/link";

export default function NewsNotFound() {
  return (
    <div className="pt-32 pb-16 px-4 text-center">
      <h1 className="text-2xl font-bold text-text-primary mb-3">
        Article not found
      </h1>
      <p className="text-text-muted mb-6">
        The news article you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/news"
        className="inline-flex items-center px-6 py-3 glass rounded-xl text-sm font-medium hover:brightness-110 transition-all"
      >
        Browse news
      </Link>
    </div>
  );
}
