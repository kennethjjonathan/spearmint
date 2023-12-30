"use client";
import CONSTANTS from "@/constants/constants";
import { useDebounce } from "@/hooks/useDebounce";
import { SuggestionObject } from "@/interface/Home";
import { handleError } from "@/lib/handleError";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import { AuthApiError } from "@supabase/supabase-js";
import { Eraser } from "lucide-react";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import NoSuggestionFound from "./NoSuggestionFound";
import SuggestionSkeletons from "./Skeletons/SuggestionSkeletons";
import SuggestionTab from "./SuggestionTab";

export type SearchBarProps = React.InputHTMLAttributes<HTMLInputElement> & {};

const dummyData: SuggestionObject[] = [
  { title: "Tekken Lore", author: "kennethjjonathan", id: 2 },
  { title: "Tekken Lore", author: "kennethjjonathan", id: 3 },
];

const SearchBar = ({ className, ...props }: SearchBarProps) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchInput, setSearchInput] = useState<string>("");
  const [isFocus, setIsFocus] = useState<boolean>(true);
  const [isSuggestLoading, setIsSuggestLoading] = useState<boolean>(false);
  const [suggestionList, setSuggestionList] = useState<SuggestionObject[]>([]);
  const searchDebounce = useDebounce<string>(searchInput, 500);

  function handleSearchInput(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setIsSuggestLoading(true)
    if (CONSTANTS.ONLY_WHITESPACE.test(value) || value === "") {
      setSuggestionList([]);
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
    setSuggestionList([]);
    searchRef.current?.blur();
    setIsFocus(false);
  }

  const getSuggestion = useCallback(async () => {
    if (CONSTANTS.ONLY_WHITESPACE.test(searchDebounce) || searchDebounce === "") {
      setIsSuggestLoading(false)
      return;
    };
    try {
      setIsSuggestLoading(true);
      const { data, error } = await supabase
        .from("timelines")
        .select("title, author, id")
        .textSearch("title", searchDebounce, {
          type: "websearch",
          config: "english",
        })
        .limit(5);
      if (error) throw error;
      setSuggestionList(data);
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
      {searchInput.length !== 0 && !CONSTANTS.ONLY_WHITESPACE.test(searchInput) && isFocus && (
        <div className="absolute top-full z-50 w-full divide-y-[1px] divide-foreground overflow-hidden rounded-md border-0">
          {isSuggestLoading ? (
            <>
              <SuggestionSkeletons />
              <SuggestionSkeletons />
              <SuggestionSkeletons />
            </>
          ) : suggestionList.length !== 0 ? (
            <>
              {suggestionList.map((item) => (
                <SuggestionTab suggestionObject={item} key={item.id} />
              ))}
            </>
          ) : (
            <NoSuggestionFound/>
          )}
        </div>
      )}
    </div>
  );
};

export { SearchBar };
