import type { User, Space, SpaceMember, CalendarEvent, Message } from "@/types";

export const mockUsers: User[] = [
  { id: "u1", name: "Alex", createdAt: "2024-01-01" },
  { id: "u2", name: "Jordan", createdAt: "2024-01-01" },
  { id: "u3", name: "Sam", createdAt: "2024-01-15" },
];

export const mockSpaces: Space[] = [
  {
    id: "s1",
    name: "Alex & Jordan",
    type: "couple",
    description: "Our private space",
    createdAt: "2024-01-01",
    lastActivityAt: "2026-05-26T20:00:00Z",
  },
  {
    id: "s2",
    name: "Study Squad",
    type: "study",
    description: "Final exam prep group",
    createdAt: "2024-03-10",
    lastActivityAt: "2026-05-27T09:00:00Z",
  },
];

export const mockMembers: SpaceMember[] = [
  {
    id: "m1",
    spaceId: "s1",
    userId: "u1",
    role: "owner",
    joinedAt: "2024-01-01",
    user: { id: "u1", name: "Alex", createdAt: "2024-01-01" },
  },
  {
    id: "m2",
    spaceId: "s1",
    userId: "u2",
    role: "member",
    joinedAt: "2024-01-01",
    user: { id: "u2", name: "Jordan", createdAt: "2024-01-01" },
  },
  {
    id: "m3",
    spaceId: "s2",
    userId: "u1",
    role: "owner",
    joinedAt: "2024-03-10",
    user: { id: "u1", name: "Alex", createdAt: "2024-01-01" },
  },
  {
    id: "m4",
    spaceId: "s2",
    userId: "u3",
    role: "member",
    joinedAt: "2024-03-10",
    user: { id: "u3", name: "Sam", createdAt: "2024-01-15" },
  },
];

export const mockEvents: CalendarEvent[] = [
  {
    id: "e1",
    spaceId: "s1",
    title: "Anniversary dinner",
    description: "Book the restaurant at 7pm",
    startAt: "2026-06-01T19:00:00Z",
    endAt: "2026-06-01T21:00:00Z",
    createdBy: "u1",
    creatorName: "Alex",
    visibility: "all",
  },
  {
    id: "e2",
    spaceId: "s1",
    title: "Movie night",
    startAt: "2026-05-30T20:00:00Z",
    endAt: "2026-05-30T22:30:00Z",
    createdBy: "u2",
    creatorName: "Jordan",
    visibility: "all",
  },
  {
    id: "e3",
    spaceId: "s2",
    title: "Math exam",
    startAt: "2026-06-10T09:00:00Z",
    endAt: "2026-06-10T12:00:00Z",
    createdBy: "u1",
    creatorName: "Alex",
    visibility: "all",
  },
  {
    id: "e4",
    spaceId: "s2",
    title: "Study session",
    startAt: "2026-06-05T14:00:00Z",
    endAt: "2026-06-05T17:00:00Z",
    createdBy: "u3",
    creatorName: "Sam",
    visibility: "all",
  },
];

export const mockMessages: Message[] = [
  {
    id: "msg1",
    chatRoomId: "cr1",
    senderId: "u1",
    senderName: "Alex",
    content: "Hey, did you book the restaurant yet?",
    createdAt: "2026-05-26T19:00:00Z",
  },
  {
    id: "msg2",
    chatRoomId: "cr1",
    senderId: "u2",
    senderName: "Jordan",
    content: "Yes! Table for 2 at 7pm. So excited!",
    createdAt: "2026-05-26T19:05:00Z",
  },
  {
    id: "msg3",
    chatRoomId: "cr1",
    senderId: "u1",
    senderName: "Alex",
    content: "Can't wait. Love you!",
    createdAt: "2026-05-26T19:10:00Z",
  },
  {
    id: "msg4",
    chatRoomId: "cr2",
    senderId: "u3",
    senderName: "Sam",
    content: "Chapter 7 is the hardest one. Should we split notes?",
    createdAt: "2026-05-27T09:00:00Z",
  },
  {
    id: "msg5",
    chatRoomId: "cr2",
    senderId: "u1",
    senderName: "Alex",
    content: "Good idea. I'll take chapters 7-8, you take 9-10.",
    createdAt: "2026-05-27T09:03:00Z",
  },
];

export const getMembersBySpaceId = (spaceId: string): SpaceMember[] =>
  mockMembers.filter((m) => m.spaceId === spaceId);

export const getEventsBySpaceId = (spaceId: string): CalendarEvent[] =>
  mockEvents.filter((e) => e.spaceId === spaceId);

export const getChatRoomId = (spaceId: string): string =>
  spaceId === "s1" ? "cr1" : "cr2";

export const getMessagesByChatRoomId = (chatRoomId: string): Message[] =>
  mockMessages.filter((m) => m.chatRoomId === chatRoomId);
