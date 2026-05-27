# DueOne — REST API Draft

> Status: Design only. Backend not implemented yet.
> Base URL: `https://api.dueone.app/v1` (future)

All requests require `Authorization: Bearer <token>` once auth is implemented.

---

## Spaces

### GET /spaces
Returns all spaces the authenticated user belongs to.

**Response**
```json
[
  {
    "id": "s1",
    "name": "Alex & Jordan",
    "type": "couple",
    "description": "Our private space",
    "createdAt": "2024-01-01T00:00:00Z",
    "lastActivityAt": "2026-05-26T20:00:00Z",
    "memberCount": 2
  }
]
```

### POST /spaces
Create a new space.

**Request**
```json
{
  "name": "Study Squad",
  "type": "study",
  "description": "Final exam prep"
}
```

**Response** `201 Created`
```json
{
  "id": "s2",
  "name": "Study Squad",
  "type": "study",
  "inviteCode": "ABC123",
  "createdAt": "2026-05-27T00:00:00Z"
}
```

### GET /spaces/:id
Returns a single space by ID.

### DELETE /spaces/:id
Deletes a space. Owner only.

---

## Members

### GET /spaces/:spaceId/members
Returns all members in a space.

**Response**
```json
[
  {
    "id": "m1",
    "spaceId": "s1",
    "userId": "u1",
    "role": "owner",
    "joinedAt": "2024-01-01T00:00:00Z",
    "user": {
      "id": "u1",
      "name": "Alex"
    }
  }
]
```

### POST /spaces/:spaceId/members/join
Join a space with an invite code.

**Request**
```json
{
  "inviteCode": "ABC123"
}
```

### DELETE /spaces/:spaceId/members/:memberId
Remove a member. Owner can remove any member. Members can remove themselves.

---

## Calendar Events

### GET /spaces/:spaceId/events
Returns all calendar events for a space, sorted by start time.

Query params:
- `from` — ISO date string (optional)
- `to` — ISO date string (optional)

**Response**
```json
[
  {
    "id": "e1",
    "spaceId": "s1",
    "title": "Anniversary dinner",
    "description": "Book the restaurant at 7pm",
    "startAt": "2026-06-01T19:00:00Z",
    "endAt": "2026-06-01T21:00:00Z",
    "createdBy": "u1",
    "creatorName": "Alex",
    "visibility": "all"
  }
]
```

### POST /spaces/:spaceId/events
Create a new calendar event.

**Request**
```json
{
  "title": "Movie night",
  "description": "",
  "startAt": "2026-05-30T20:00:00Z",
  "endAt": "2026-05-30T22:30:00Z",
  "visibility": "all"
}
```

**Response** `201 Created`

### PUT /spaces/:spaceId/events/:eventId
Update an event. Creator only.

### DELETE /spaces/:spaceId/events/:eventId
Delete an event. Creator or owner only.

---

## Chat Messages

### GET /spaces/:spaceId/chat/messages
Returns message history for the space's chat room.

Query params:
- `before` — message ID for pagination (optional)
- `limit` — number of messages (default: 50)

**Response**
```json
[
  {
    "id": "msg1",
    "chatRoomId": "cr1",
    "senderId": "u1",
    "senderName": "Alex",
    "content": "Hey, did you book the restaurant yet?",
    "createdAt": "2026-05-26T19:00:00Z"
  }
]
```

### POST /spaces/:spaceId/chat/messages
Send a new message.

**Request**
```json
{
  "content": "Yes! Table for 2 at 7pm."
}
```

**Response** `201 Created`

> Note: Real-time delivery (WebSocket) is planned for v0.3. In v0.2, polling or SSE may be used.

### DELETE /spaces/:spaceId/chat/messages/:messageId
Delete a message. Sender or owner only.

---

## Error format

All errors follow a consistent shape:

```json
{
  "error": {
    "code": "SPACE_NOT_FOUND",
    "message": "The requested space does not exist or you do not have access."
  }
}
```

Common error codes:
- `UNAUTHORIZED` — missing or invalid token
- `FORBIDDEN` — valid token but insufficient permission
- `NOT_FOUND` — resource does not exist
- `VALIDATION_ERROR` — invalid request body
- `SPACE_FULL` — space already has 5 members
