export default function RepoLoading() {
  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="animate-pulse space-y-6">
        <div className="h-4 w-32 glass rounded-lg" />
        <div className="glass-card rounded-2xl p-6 space-y-4">
          <div className="h-3 w-48 glass rounded-lg" />
          <div className="h-8 w-64 glass rounded-lg" />
          <div className="h-4 w-full glass rounded-lg" />
          <div className="h-4 w-3/4 glass rounded-lg" />
          <div className="flex gap-4">
            <div className="h-5 w-16 glass rounded-full" />
            <div className="h-5 w-16 glass rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
