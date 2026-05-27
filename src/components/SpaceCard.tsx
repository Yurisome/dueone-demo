import type { Space } from "@/types";

type Props = {
  space: Space;
  memberCount: number;
};

const TYPE_LABEL: Record<string, string> = {
  couple: "Couple",
  friends: "Friends",
  family: "Family",
  study: "Study",
  private: "Private",
};

function getRelativeTime(isoDate: string): string {
  const diffMs = Date.now() - new Date(isoDate).getTime();
  const minutes = Math.floor(diffMs / 60_000);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default function SpaceCard({ space, memberCount }: Props) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="font-semibold text-gray-900">{space.name}</h2>
          {space.description && (
            <p className="text-sm text-gray-500 mt-0.5">{space.description}</p>
          )}
        </div>
        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full shrink-0 ml-2">
          {TYPE_LABEL[space.type] ?? space.type}
        </span>
      </div>
      <div className="mt-3 flex items-center gap-4 text-xs text-gray-400">
        <span>{memberCount} {memberCount === 1 ? "member" : "members"}</span>
        <span>Active {getRelativeTime(space.lastActivityAt)}</span>
      </div>
    </div>
  );
}
