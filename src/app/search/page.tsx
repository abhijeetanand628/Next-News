"use client";

import { Suspense } from "react";
import SearchContent from "./SearchContent";
import SearchSkeleton from "../components/skeletons/SearchSkeleton";

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchSkeleton />}>
      <SearchContent />
    </Suspense>
  );
}
