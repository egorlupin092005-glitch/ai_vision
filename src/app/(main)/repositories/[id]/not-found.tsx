import Link from "next/link";

export default function RepoNotFound() {
  return (
    <div className="pt-32 pb-16 px-4 text-center">
      <h1 className="text-2xl font-bold text-text-primary mb-3">
        Repository not found
      </h1>
      <p className="text-text-muted mb-6">
        The repository you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/repositories"
        className="inline-flex items-center px-6 py-3 glass rounded-xl text-sm font-medium hover:brightness-110 transition-all"
      >
        Browse repositories
      </Link>
    </div>
  );
}
