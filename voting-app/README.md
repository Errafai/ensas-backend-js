# 🗳️ Voting App - ENSA Safi

A modern voting application for ENSA Safi students to vote on events. Built with Vue.js 3 and Firebase.

## Features

✅ **User Authentication**

- Register and sign in with email/password
- Firebase Authentication integration
- Secure session management

✅ **Event Management**

- Display events from Firestore
- Show event details (title, description, date, price/free status)
- Real-time vote count updates

✅ **Voting System**

- Vote "Yes" or "No" on events
- One vote per user per event
- Real-time vote count updates
- Visual feedback for voted events

✅ **Responsive Design**

- Mobile-friendly interface
- Works on desktop, tablet, and smartphone
- Modern gradient UI with smooth animations

## Prerequisites

- Node.js (v20.19.0 or higher)
- npm or yarn
- Firebase account

## Installation

### 1. Clone or download the project

```bash
cd voting-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Go to Project Settings and copy your Firebase config
4. Update `src/firebase.js` with your credentials:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```

### 4. Firestore Setup

In Firebase Console, create these collections:

#### **Events Collection**

```json
{
  "img": "https://example.com/image.jpg",
  "title": "Concert de fin d'année",
  "description": "Un concert pour célébrer la fin de l'année universitaire.",
  "date": "2024-07-01T18:00:00Z",
  "isFree": true,
  "price": 0,
  "yesVotes": 0,
  "noVotes": 0,
  "createdAt": "2024-06-20T12:00:00Z",
  "updatedAt": "2024-06-25T15:30:00Z"
}
```

#### **Votes Collection**

```json
{
  "eventId": "event123",
  "userId": "user456",
  "vote": "yes",
  "createdAt": "2024-06-25T15:30:00Z"
}
```

### 5. Firestore Security Rules

Set these rules for Firestore security:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Events: Anyone can read, only admins can write
    match /events/{document=**} {
      allow read: if true;
      allow write: if false; // Set to true for testing, disable for production
    }

    // Votes: Users can read/write their own votes
    match /votes/{document=**} {
      allow read: if true;
      allow create: if request.auth.uid == request.resource.data.userId;
      allow update, delete: if false;
    }
  }
}
```

## Development

### Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── AuthPage.vue       # Login & Registration
│   └── EventsPage.vue     # Events display and voting
├── assets/
│   ├── main.css           # Global styles
│   └── base.css           # Base styles
├── App.vue                # Root component
├── main.js                # Entry point
├── router.js              # Vue Router configuration
└── firebase.js            # Firebase initialization
```

## Usage

### 1. Sign Up

- Click "Register"
- Enter your email (preferably @ensa-safi.ac.ma)
- Create a password (minimum 6 characters)
- Confirm password

### 2. Sign In

- Click "Sign In"
- Enter your credentials
- You'll be redirected to the events page

### 3. Vote on Events

- View all available events
- Click "👍 Yes" or "👎 No" to vote
- Your vote is recorded immediately
- Real-time vote counts update for all users

### 4. Sign Out

- Click the "Sign Out" button to logout

## Technologies Used

- **Vue.js 3** - Progressive JavaScript framework
- **Vite** - Build tool
- **Firebase Authentication** - User authentication
- **Cloud Firestore** - Real-time database
- **Vue Router** - Client-side routing

## Deployment to Firebase

### 1. Install Firebase CLI

```bash
npm install -g firebase-tools
```

### 2. Login to Firebase

```bash
firebase login
```

### 3. Initialize Firebase

```bash
firebase init
```

Select:

- Firestore
- Hosting

### 4. Build and Deploy

```bash
npm run build
firebase deploy
```

## Troubleshooting

### Firebase Config Not Working

- Check that your Firebase config credentials are correct
- Ensure the Firebase project has Authentication enabled
- Verify Firestore is created and accessible

### Votes Not Saving

- Check Firestore security rules
- Ensure user is authenticated
- Check browser console for errors

### Events Not Loading

- Verify Events collection exists in Firestore
- Check that documents have the correct structure
- Review Firestore security rules

## License

This project is part of ENSA Safi coursework.

## Support

For issues or questions, please contact the development team.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
