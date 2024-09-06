"use client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

interface IType {
  name: string;
}

interface IPokemonType {
  type: IType;
}

const fetchPokemonDetails = async (url: string) => {
  const response = await fetch(url);
  return response.json();
};

export default function PokemonDetails({ url }: { url: string }) {
  const { data, isLoading } = useQuery({
    queryKey: [url],
    queryFn: () => fetchPokemonDetails(url),
  });

  if (isLoading) {
    return (
      <>
        <td className="border h-[108px]  w-1/3 px-6 py-4">
          <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200"></div>
        </td>
        <td className="border h-[108px]  w-1/3 px-6 py-4">
          <div className="mb-2 w-24 h-5 animate-pulse rounded bg-gray-200"></div>
        </td>
      </>
    );
  }

  return (
    <>
      <td className="border px-6 py-4 w-1/3">
        <Image
          src={data?.sprites.front_default}
          alt={data?.name}
          width={75}
          height={75}
        />
      </td>
      <td className="border px-6 py-4 w-1/3">
        {data?.types.map(({ type }: IPokemonType) => type.name).join(", ")}
      </td>
    </>
  );
}
