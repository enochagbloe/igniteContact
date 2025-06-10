"use client";
import { Button } from "@/components/ui/button";
import { formUrlQueryString, removeUrlQueryString } from "@/lib/url";
import { cn } from "@/lib/utils";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useState } from "react";

const filters = [
  { name: "Faith", value: "faith" },
  { name: "Surrender", value: "surrender" },
];

const HomeFilters = () => {
  const searchParams = useSearchParams();
  const selectedFilter = searchParams.get("filter");
  const [activeFilter, setActiveFilter] = useState(selectedFilter || "");
  const router = useRouter();

  const handleClick = (filter: string) => {
    let newUrl = "";

    if (filter === activeFilter) {
      setActiveFilter("");
      newUrl = removeUrlQueryString({
        params: searchParams.toString(),
        keystoRemove: ["filter"],
      });
    } else {
      setActiveFilter(filter);
      newUrl = formUrlQueryString({
        params: searchParams.toString(),
        key: "filter",
        value: filter.toLowerCase(),
      });
    }

    router.push(newUrl, {
      scroll: false,
    });
  };
  return (
    <div className="gap-2 mt-4 hidden sm:flex">
      {filters.map((filter) => (
        <Button
          className={cn(
            "rounded-lg capitalize px-6 py-3",
            activeFilter === filter.value
              ? "text-amber-500"
              : "text-white dark:text-black"
          )}
          key={filter.value}
          onClick={() => handleClick(filter.value)}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilters;
