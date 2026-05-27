export type User = {
  id: string;
  name: string;
  avatarUrl?: string;
  createdAt: string;
};

export type SpaceType = "couple" | "friends" | "family" | "study" | "private";

export type Space = {
  id: string;
  name: string;
  type: SpaceType;
  description?: string;
  createdAt: string;
  lastActivityAt: string;
};

export type SpaceMember = {
  id: string;
  spaceId: string;
  userId: string;
  role: "owner" | "member";
  joinedAt: string;
  user: User;
};

export type EventVisibility = "all" | "private";

export type CalendarEvent = {
  id: string;
  spaceId: string;
  title: string;
  description?: string;
  startAt: string;
  endAt: string;
  createdBy: string;
  creatorName: string;
  visibility: EventVisibility;
};

export type ChatRoom = {
  id: string;
  spaceId: string;
  name: string;
  createdAt: string;
};

export type Message = {
  id: string;
  chatRoomId: string;
  senderId: string;
  senderName: string;
  content: string;
  createdAt: string;
};
