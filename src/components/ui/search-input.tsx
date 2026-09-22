"use client";

import { useSearchStore } from "@/store/search-store";
import { LuSearch, LuX } from "react-icons/lu";

const SearchInput = () => {
  const { isOpen, closeSearch } = useSearchStore();
  if (!isOpen) return <></>;
  return (
    <div className="border-b border-border bg-surface py-5">
      <div className="mx-auto w-full max-w-5xl px-6">
        <div className="rounded-xl border border-border bg-background">
          {/* search input */}
          <div className="flex h-14 items-center gap-4 px-5">
            <LuSearch className="shrink-0 text-muted-foreground" size={18} />

            <input
              type="text"
              placeholder="Search products..."
              className="h-full w-full bg-transparent text-foreground outline-none placeholder:text-muted-foreground"
            />

            <button 
              type="button"
              aria-label="Close search"
              onClick={() => closeSearch()}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-surface hover:text-foreground"
            >
              <LuX size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
