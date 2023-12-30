"use client";
import { useDebounce } from "@/hooks/useDebounce";
import { handleError } from "@/lib/handleError";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import { AuthApiError } from "@supabase/supabase-js";
import { Eraser } from "lucide-react";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";

export interface SearchBarProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const SearchBar = ({ className, ...props }: SearchBarProps) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchInput, setSearchInput] = useState<string>("");
  const [isFocus, setIsFocus] = useState<boolean>(true);
  const [isSuggestLoading, setIsSuggestLoading] = useState<boolean>(false);
  const searchDebounce = useDebounce<string>(searchInput, 750);

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
    setIsFocus(false);
  }

  const getSuggestion = useCallback(async () => {
    if (/^\s+$/.test(searchDebounce) || searchDebounce.length === 0) return
    try {
      setIsSuggestLoading(true);
      const { data, error } = await supabase
        .from("timelines")
        .select("title, author")
        .textSearch("title", searchDebounce, {
          type: "websearch",
          config: "english"
        }).limit(5);
      if (error) throw error;
      console.log("masuk", searchDebounce, data)
    } catch (error: unknown) {
      if (error instanceof AuthApiError) handleError(error.message);
    } finally {
      setIsSuggestLoading(false);
    }
  }, [searchDebounce]);

  useEffect(() => {
    getSuggestion();
  }, [getSuggestion]);

  return (
    <div className="relative z-0 w-full space-y-1">
      <div
        className={cn(
          "group relative w-full animate-late_reveal cursor-pointer rounded-md border-[1px] border-accent p-2 pr-10 outline-none duration-300 lg:hover:border-foreground",
          isFocus && "border-foreground",
        )}
      >
        <input
          className={cn(
            "w-full appearance-none border-0 bg-transparent text-base text-accent outline-none duration-300 focus:text-foreground sm:text-lg lg:text-xl lg:group-hover:text-foreground",
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
          <button
            className="absolute inset-y-0 right-2 text-accent duration-300 hover:text-foreground"
            onClick={handleClear}
          >
            <Eraser
              className="h-5 w-5 sm:h-6 sm:w-6"
              absoluteStrokeWidth={true}
              strokeWidth={1}
            />
          </button>
        )}
      </div>
      {searchInput.length !== 0 && isFocus && (
        <div className="absolute -bottom-full left-0 z-50 h-10 w-full rounded-md border-0 bg-accent opacity-50 duration-300 hover:opacity-100">
          {isSuggestLoading ? "Loading" : "Data"}
        </div>
      )}
    </div>
  );
};

export { SearchBar };
