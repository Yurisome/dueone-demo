import Link from "next/link";
import { notFound } from "next/navigation";
import { mockSpaces, getChatRoomId, getMessagesByChatRoomId } from "@/mock/data";

type Props = {
  params: Promise<{ id: string }>;
};

const CURRENT_USER_ID = "u1";

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function ChatPage({ params }: Props) {
  const { id } = await params;
  const space = mockSpaces.find((s) => s.id === id);
  if (!space) notFound();

  const chatRoomId = getChatRoomId(id);
  const messages = getMessagesByChatRoomId(chatRoomId);

  return (
    <main className="max-w-2xl mx-auto px-4 py-10 flex flex-col" style={{ minHeight: "100vh" }}>
      <Link
        href={`/spaces/${id}`}
        className="text-sm text-gray-400 hover:text-gray-600 mb-6 inline-block"
      >
        &larr; {space.name}
      </Link>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">Secret Chat</h1>

      <div className="flex-1 space-y-4 mb-6">
        {messages.map((msg) => {
          const isOwn = msg.senderId === CURRENT_USER_ID;
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isOwn ? "items-end" : "items-start"}`}
            >
              {!isOwn && (
                <span className="text-xs text-gray-400 mb-1 ml-1">
                  {msg.senderName}
                </span>
              )}
              <div
                className={`max-w-xs px-4 py-2.5 rounded-2xl text-sm ${
                  isOwn
                    ? "bg-gray-900 text-white rounded-br-sm"
                    : "bg-white border border-gray-100 text-gray-900 shadow-sm rounded-bl-sm"
                }`}
              >
                {msg.content}
              </div>
              <span className="text-xs text-gray-300 mt-1 mx-1">
                {formatTime(msg.createdAt)}
              </span>
            </div>
          );
        })}

        {messages.length === 0 && (
          <p className="text-center text-gray-400 py-16 text-sm">
            No messages yet.
          </p>
        )}
      </div>

      <div className="border-t border-gray-100 pt-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-gray-400 bg-white"
            disabled
          />
          <button
            className="bg-gray-900 text-white px-4 py-2.5 rounded-xl text-sm opacity-40 cursor-not-allowed"
            disabled
          >
            Send
          </button>
        </div>
        <p className="text-center text-xs text-gray-300 mt-2">
          Real-time messaging not available in v0.1
        </p>
      </div>
    </main>
  );
}
