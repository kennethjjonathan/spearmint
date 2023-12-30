const SuggestionSkeletons = () => {
  return (
    <div className="w-full space-y-1 bg-accent p-1 opacity-50">
      <div className="my-1 h-5 w-full animate-pulse rounded-sm bg-foreground lg:my-2" />
      <div className="my-1 h-3 w-full animate-pulse rounded-sm bg-foreground lg:my-2" />
    </div>
  );
};

export default SuggestionSkeletons;
