"use client";
import { useRef, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import PokemonDetails from "./PokemonDetails";

interface IPokemon {
  name: string;
  url: string;
}

const fetchPokemons = async ({
  pageParam = "https://pokeapi.co/api/v2/pokemon",
}) => {
  const response = await fetch(pageParam);
  const data = await response.json();
  return data;
};

export default function Pokemon() {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["pokemons"],
      queryFn: fetchPokemons,
      initialPageParam: "https://pokeapi.co/api/v2/pokemon",
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    });

  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.length > 0 && entries[0]?.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [hasNextPage, fetchNextPage]);

  return (
    <div className="container mx-auto px-5 py-10">
      <h1 className="mb-6 text-center text-4xl font-extrabold text-gray-800">
        Pokémon List
      </h1>

      <table className="w-full overflow-hidden rounded-lg bg-white shadow-md">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-6 py-4 text-left">Name</th>
            <th className="px-6 py-4 text-left">Image</th>
            <th className="px-6 py-4 text-left">Types</th>
          </tr>
        </thead>

        <tbody>
          {isLoading
            ? Array.from({ length: 10 }).map((_, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="h-[108px] w-1/3 border px-6 py-4">
                    <div className="h-5 w-24 animate-pulse rounded bg-gray-200"></div>
                  </td>
                  <td className="h-[108px] w-1/3 border px-6 py-4">
                    <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200"></div>
                  </td>
                  <td className="h-[108px] w-1/3 border px-6 py-4">
                    <div className="h-5 w-24 animate-pulse rounded bg-gray-200"></div>
                  </td>
                </tr>
              ))
            : data?.pages.map((page) =>
                page.results.map((pokemon: IPokemon) => (
                  <tr key={pokemon.name} className="hover:bg-gray-100">
                    <td className="w-1/3 border px-6 py-4">{pokemon.name}</td>
                    <PokemonDetails url={pokemon.url} />
                  </tr>
                )),
              )}
        </tbody>
      </table>

      <div ref={loadMoreRef} className="mt-8 text-center">
        {isFetchingNextPage ? (
          <div className="text-gray-600">Loading more...</div>
        ) : (
          hasNextPage && (
            <div className="text-gray-600">Scroll to load more...</div>
          )
        )}
      </div>
    </div>
  );
}
