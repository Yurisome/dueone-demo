import Link from "next/link";
import { mockSpaces, getMembersBySpaceId } from "@/mock/data";
import SpaceCard from "@/components/SpaceCard";

export default function HomePage() {
  const spacesWithCounts = mockSpaces.map((space) => ({
    space,
    memberCount: getMembersBySpaceId(space.id).length,
  }));

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">DueOne</h1>
        <p className="text-gray-500 mt-1 text-sm">Your private spaces</p>
      </div>

      <div className="space-y-3">
        {spacesWithCounts.map(({ space, memberCount }) => (
          <Link key={space.id} href={`/spaces/${space.id}`}>
            <SpaceCard space={space} memberCount={memberCount} />
          </Link>
        ))}
      </div>

      <button className="mt-5 w-full border-2 border-dashed border-gray-200 rounded-xl py-4 text-sm text-gray-400 hover:border-gray-300 hover:text-gray-500 transition-colors">
        + Create new space
      </button>
    </main>
  );
}
