import Link from "next/link";
import { notFound } from "next/navigation";
import { mockSpaces, getEventsBySpaceId } from "@/mock/data";

type Props = {
  params: Promise<{ id: string }>;
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function CalendarPage({ params }: Props) {
  const { id } = await params;
  const space = mockSpaces.find((s) => s.id === id);
  if (!space) notFound();

  const events = getEventsBySpaceId(id).sort(
    (a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime()
  );

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <Link
        href={`/spaces/${id}`}
        className="text-sm text-gray-400 hover:text-gray-600 mb-6 inline-block"
      >
        &larr; {space.name}
      </Link>

      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
        <button className="text-sm bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
          + Add event
        </button>
      </div>

      <div className="space-y-3">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <h3 className="font-medium text-gray-900">{event.title}</h3>
              {event.visibility === "private" && (
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded ml-2 shrink-0">
                  Private
                </span>
              )}
            </div>
            {event.description && (
              <p className="text-sm text-gray-500 mt-1">{event.description}</p>
            )}
            <div className="mt-2 flex items-center gap-3 text-xs text-gray-400">
              <span>{formatDate(event.startAt)}</span>
              <span>
                {formatTime(event.startAt)} &ndash; {formatTime(event.endAt)}
              </span>
              <span>by {event.creatorName}</span>
            </div>
          </div>
        ))}

        {events.length === 0 && (
          <p className="text-center text-gray-400 py-16 text-sm">
            No events yet.
          </p>
        )}
      </div>
    </main>
  );
}
