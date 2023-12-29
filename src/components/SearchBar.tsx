"use client";
import { cn } from "@/lib/utils";
import { Eraser } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";

export interface SearchBarProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const SearchBar = ({ className, ...props }: SearchBarProps) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchInput, setSearchInput] = useState<string>("");
  const [isFocus, setIsFocus] = useState<boolean>(true);

  function handleSearchInput(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    if (/^\s+$/.test(value)) {
      return;
    }
    setSearchInput(value);
  }

  function handleFocus() {
    setIsFocus(true);
  }

  function handleBlur() {
    setIsFocus(false);
  }
  function handleClear() {
    setSearchInput("");
    searchRef.current?.blur();
    setIsFocus(false)
  }
  return (
    <div
      className={cn(
        "group relative w-full cursor-pointer rounded-md border-[1px] border-accent p-2 pr-10 outline-none duration-300 lg:hover:border-foreground animate-late_reveal",
        isFocus && "border-foreground",
      )}
    >
      <input
        className={cn(
          "w-full appearance-none border-0 bg-transparent text-base text-accent outline-none duration-300 focus:text-foreground lg:group-hover:text-foreground sm:text-lg lg:text-xl",
          className,
        )}
        placeholder={!isFocus ? "Search a timeline" : undefined}
        type="text"
        ref={searchRef}
        value={searchInput}
        onChange={handleSearchInput}
        {...props}
        onFocus={handleFocus}
        onBlur={handleBlur}
        autoFocus={true}
      />
      {(searchInput.length !== 0 || isFocus) && (
        <button className="absolute right-2 inset-y-0 text-accent duration-300 hover:text-foreground" onClick={handleClear}>
          <Eraser className="w-5 h-5 sm:w-6 sm:h-6" absoluteStrokeWidth={true} strokeWidth={1} />
        </button>
      )}
    </div>
  );
};

export { SearchBar };
