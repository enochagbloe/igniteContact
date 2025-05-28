"use client";
import  React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import Image from "next/image";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { formUrlQueryString, removeUrlQueryString } from "@/lib/url";

interface LocalSearchProps {
  route: string;
  imgSrc: string;
  otherClasses: string;
  placeholder: string;
}
const Localsearch = ({
  route,
  imgSrc,
  otherClasses,
  placeholder,
}: LocalSearchProps) => {
  // hooks and State intialization
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams(); // Get access to URL search/query parameters

  const query = searchParams.get("query") || ""; // Get the intial 'query' value from the Url or empty string
  const [searchQuery, setSearchQuery] = useState(query);
  // debouncing
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        // if there's something in the search input:
        const newUrl = formUrlQueryString({
          params: searchParams.toString(),
          key: "query",
          value: searchQuery,
        });
        // update the url with the new query string
        router.push(newUrl, { scroll: false }); // Don't scroll the page to the top after URL change
      } else {
        // if the search input is empty:
        // only remove the 'query' parameter from the url if we are not on the route this search below
        // and if 'query' actually exists in the url
        if (pathname === route && searchParams.has("query")) {
          const newUrl = removeUrlQueryString({
            params: searchParams.toString(),
            keystoRemove: ["query"],
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, router, searchParams, pathname, route]); // Add 'router' and 'route' to the dependency array

  return (
    <div
      className={`mt-4 flex items-center gap-2 grow min-h-[40px] shadow px-2 py-2 rounded-2xl ${otherClasses}`}
    >
      <Image src={imgSrc} alt="search" width={20} height={20} />
      <Input
        value={searchQuery}
        type="text"
        placeholder={placeholder}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border-none shadow-none no-focus outline-none placeholder paragraph-regular"
      />
    </div>
  );
};

export default Localsearch;
