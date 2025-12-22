# ForumApp

Vue 3 + Vite + Firebase forum featuring authentication, profile, discussions with replies, categories, search, filters, and moderator controls styled with BootstrapVueNext.

## Setup

1) Install dependencies
```bash
npm install
```

2) Configure Firebase (modular SDK)
```bash
cp .env.example .env
# Fill the VITE_FIREBASE_* values from your Firebase project
```

3) Run the dev server
```bash
npm run dev
```

## Features
- Email/password signup, login, logout, and password reset
- Profile editing (display name, avatar URL) and role display (user/moderator)
- Discussions by category with search (keyword) and sorting (recent/popular)
- Discussion detail with inline edit/delete (author or moderator)
- Replies with edit/delete permissions, live updates, and reply count tracking
- BootstrapVueNext components and responsive layout

## Firestore model
- `users/{uid}`: email, displayName, role (`user` or `moderator`), photoURL, createdAt, updatedAt
- `discussions/{id}`: title, content, category, keywords, authorId, authorName, authorRole, replyCount, createdAt, updatedAt
- `discussions/{id}/replies/{id}`: content, authorId, authorName, authorRole, createdAt, updatedAt

## Security rules (starting point)
Adjust for your project needs:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isSignedIn() { return request.auth != null; }
    function isModerator() { return isSignedIn() && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'moderator'; }

    match /users/{userId} {
      allow read: if isSignedIn();
      allow write: if request.auth.uid == userId || isModerator();
    }

    match /discussions/{id} {
      allow read: if true;
      allow create: if isSignedIn();
      allow update, delete: if isModerator() || request.auth.uid == resource.data.authorId;
    }

    match /discussions/{id}/replies/{replyId} {
      allow read: if true;
      allow create: if isSignedIn();
      allow update, delete: if isModerator() || request.auth.uid == resource.data.authorId;
    }
  }
}
```
