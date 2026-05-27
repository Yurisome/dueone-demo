# DueOne MVP — v0.1 Scope

## Goal

Build a working frontend prototype that demonstrates the core concept of DueOne:
a private shared space for 2 to 5 people with a calendar and a chat room.

---

## Included in v0.1

### Pages
- **Space list page** — Shows all spaces the user belongs to, with name, type, member count, and recent activity
- **Space home page** — Summary of a selected space: members, and links to Calendar and Secret Chat
- **Calendar page** — Lists upcoming events in the space with title, date, time, creator, and visibility
- **Secret Chat page** — Shows mock message history in a chat-style layout

### Data
- All data is mock (in-memory TypeScript arrays)
- 2 mock spaces, 3 mock users, 4 mock events, 5 mock messages
- Types defined in `src/types/index.ts`

### Tech
- Next.js 15 with App Router
- TypeScript
- Tailwind CSS for styling
- No external UI libraries

---

## Intentionally excluded from v0.1

| Feature | Reason for exclusion |
|---|---|
| Authentication / login | Deferred to v0.2; requires backend |
| Real-time chat | Requires WebSocket; deferred to v0.3 |
| Push notifications | Requires backend + device registration |
| Event creation UI | Form logic deferred; UI stub only |
| Space creation flow | Deferred; requires invite link logic |
| Member invite system | Requires auth + token generation |
| End-to-end encryption | Deferred; requires key exchange infrastructure |
| Backend API | Java Spring Boot planned for v0.2 |
| Database | MySQL/MariaDB planned for v0.2 |
| Image / file sharing | Out of scope for MVP |

---

## Next versions (planned)

### v0.2 — Backend + Auth
- Java Spring Boot REST API
- MySQL/MariaDB schema
- JWT authentication
- Space creation and member invite via link

### v0.3 — Real-time
- WebSocket chat (Spring Boot + STOMP or SSE)
- Live calendar updates

### v0.4 — Polish + Encryption
- End-to-end encrypted messages
- Push notifications (FCM/APNs)
- Mobile-responsive improvements
