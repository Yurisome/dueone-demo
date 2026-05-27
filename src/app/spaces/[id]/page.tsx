import Link from "next/link";
import { notFound } from "next/navigation";
import { mockSpaces, getMembersBySpaceId } from "@/mock/data";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function SpaceHomePage({ params }: Props) {
  const { id } = await params;
  const space = mockSpaces.find((s) => s.id === id);
  if (!space) notFound();

  const members = getMembersBySpaceId(id);

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <Link
        href="/"
        className="text-sm text-gray-400 hover:text-gray-600 mb-6 inline-block"
      >
        &larr; All spaces
      </Link>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{space.name}</h1>
        {space.description && (
          <p className="text-gray-500 mt-1 text-sm">{space.description}</p>
        )}
      </div>

      <div className="mb-8">
        <h2 className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">
          Members
        </h2>
        <div className="flex gap-2 flex-wrap">
          {members.map((m) => (
            <span
              key={m.id}
              className="bg-white border border-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm shadow-sm"
            >
              {m.user.name}
              {m.role === "owner" && (
                <span className="ml-1 text-gray-300 text-xs">owner</span>
              )}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Link
          href={`/spaces/${id}/calendar`}
          className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="text-3xl mb-3">📅</div>
          <h3 className="font-semibold text-gray-900">Calendar</h3>
          <p className="text-sm text-gray-400 mt-1">Shared schedules</p>
        </Link>

        <Link
          href={`/spaces/${id}/chat`}
          className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="text-3xl mb-3">💬</div>
          <h3 className="font-semibold text-gray-900">Secret Chat</h3>
          <p className="text-sm text-gray-400 mt-1">Private messages</p>
        </Link>
      </div>
    </main>
  );
}
