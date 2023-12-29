import { SearchBar } from "@/components/SearchBar";
export default function Home() {
  return (
    <main className="container flex min-h-screen flex-col items-center justify-center space-y-5">
      <div className="overflow-hidden text-center font-cabinet text-5xl font-bold sm:text-6xl lg:text-8xl animate-reveal_react">
        <h1 className="animate-bottom_reveal">spearmint</h1>
      </div>
      <div className="w-full max-w-[35rem]">
        <SearchBar />
      </div>
    </main>
  );
}
