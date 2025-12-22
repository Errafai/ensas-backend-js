<template>
  <div class="events-container">
    <div class="header">
      <h1>🗳️ Voting Events</h1>
      <button @click="handleLogout" class="btn btn-logout">Sign Out</button>
    </div>

    <div v-if="loading" class="loading">
      Loading events...
    </div>

    <div v-else-if="events.length === 0" class="empty-state">
      <p>No events available at the moment.</p>
    </div>

    <div v-else class="events-grid">
      <div v-for="event in events" :key="event.id" class="event-card">
        <div v-if="event.img" class="event-image">
          <img :src="event.img" :alt="event.title" />
        </div>

        <div class="event-content">
          <h2>{{ event.title }}</h2>
          <p class="description">{{ event.description }}</p>

          <div class="event-details">
            <div class="detail-item">
              <span class="label">📅 Date:</span>
              <span class="value">{{ formatDate(event.date) }}</span>
            </div>
            <div class="detail-item">
              <span class="label">💰 Price:</span>
              <span class="value">
                {{ event.isFree ? 'Free' : event.price + ' DH' }}
              </span>
            </div>
          </div>

          <div class="voting-section">
            <div class="votes-display">
              <div class="vote-count yes-votes">
                <span class="number">{{ event.yesVotes }}</span>
                <span class="label">Yes</span>
              </div>
              <div class="vote-count no-votes">
                <span class="number">{{ event.noVotes }}</span>
                <span class="label">No</span>
              </div>
            </div>

            <div class="voting-buttons">
              <button
                @click="castVote(event.id, 'yes')"
                :disabled="hasVoted(event.id) || voting"
                :class="[
                  'btn',
                  'btn-yes',
                  { voted: userVotes[event.id] === 'yes' },
                  { disabled: hasVoted(event.id) },
                ]"
              >
                👍 Yes
              </button>
              <button
                @click="castVote(event.id, 'no')"
                :disabled="hasVoted(event.id) || voting"
                :class="[
                  'btn',
                  'btn-no',
                  { voted: userVotes[event.id] === 'no' },
                  { disabled: hasVoted(event.id) },
                ]"
              >
                👎 No
              </button>
            </div>

            <div v-if="userVotes[event.id]" class="vote-status">
              You voted: <strong>{{ userVotes[event.id] }}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="error" class="alert alert-error">
      {{ error }}
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  where,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase';

export default {
  name: 'EventsPage',
  emits: ['logout'],
  setup(props, { emit }) {
    const events = ref([]);
    const loading = ref(true);
    const error = ref('');
    const voting = ref(false);
    const userVotes = ref({});
    const currentUser = auth.currentUser;

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    };

    const hasVoted = (eventId) => {
      return userVotes.value[eventId] !== undefined;
    };

    const loadUserVotes = async () => {
      try {
        const votesSnapshot = await getDocs(
          query(
            collection(db, 'votes'),
            where('userId', '==', currentUser.uid)
          )
        );

        votesSnapshot.forEach((doc) => {
          const vote = doc.data();
          userVotes.value[vote.eventId] = vote.vote;
        });
      } catch (err) {
        console.error('Error loading votes:', err);
      }
    };

    const loadEvents = () => {
      try {
        const eventsRef = collection(db, 'events');
        const unsubscribe = onSnapshot(eventsRef, (snapshot) => {
          events.value = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          loading.value = false;
        });

        return unsubscribe;
      } catch (err) {
        error.value = 'Failed to load events';
        loading.value = false;
      }
    };

    const castVote = async (eventId, voteType) => {
      if (hasVoted(eventId)) {
        error.value = 'You have already voted for this event';
        return;
      }

      voting.value = true;
      error.value = '';

      try {
        const event = events.value.find((e) => e.id === eventId);
        if (!event) {
          error.value = 'Event not found';
          return;
        }

        // Add vote to votes collection
        await addDoc(collection(db, 'votes'), {
          eventId: eventId,
          userId: currentUser.uid,
          vote: voteType,
          createdAt: new Date(),
        });

        // Update event vote count
        const eventRef = doc(db, 'events', eventId);
        const updateData = {};
        if (voteType === 'yes') {
          updateData.yesVotes = (event.yesVotes || 0) + 1;
        } else {
          updateData.noVotes = (event.noVotes || 0) + 1;
        }
        updateData.updatedAt = new Date();

        await updateDoc(eventRef, updateData);

        // Update local state
        userVotes.value[eventId] = voteType;
      } catch (err) {
        error.value = err.message || 'Failed to cast vote';
      } finally {
        voting.value = false;
      }
    };

    const handleLogout = async () => {
      try {
        await signOut(auth);
        emit('logout');
      } catch (err) {
        error.value = 'Failed to sign out';
      }
    };

    onMounted(() => {
      loadUserVotes();
      loadEvents();
    });

    return {
      events,
      loading,
      error,
      voting,
      userVotes,
      formatDate,
      hasVoted,
      castVote,
      handleLogout,
    };
  },
};
</script>

<style scoped>
.events-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto 30px;
}

.header h1 {
  color: white;
  margin: 0;
  font-size: 2em;
}

.btn-logout {
  background-color: #ff6b6b;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s;
}

.btn-logout:hover {
  background-color: #ff5252;
}

.loading,
.empty-state {
  text-align: center;
  color: white;
  font-size: 1.2em;
  padding: 40px;
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
  max-width: 1200px;
  margin: 0 auto;
}

.event-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s, box-shadow 0.3s;
}

.event-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.event-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: #f0f0f0;
}

.event-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.event-content {
  padding: 20px;
}

.event-content h2 {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 1.5em;
}

.description {
  color: #666;
  margin: 0 0 15px 0;
  line-height: 1.5;
}

.event-details {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.detail-item {
  flex: 1;
}

.detail-item .label {
  display: block;
  color: #999;
  font-size: 0.9em;
  margin-bottom: 5px;
}

.detail-item .value {
  display: block;
  color: #333;
  font-weight: 600;
}

.voting-section {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.votes-display {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.vote-count {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  border-radius: 8px;
  min-width: 80px;
}

.yes-votes {
  background-color: #e8f5e9;
}

.no-votes {
  background-color: #ffebee;
}

.vote-count .number {
  font-size: 1.8em;
  font-weight: bold;
  color: #333;
}

.vote-count .label {
  color: #666;
  font-size: 0.9em;
  margin-top: 5px;
}

.voting-buttons {
  display: flex;
  gap: 10px;
}

.btn {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s;
  font-size: 1em;
}

.btn-yes {
  background-color: #4caf50;
  color: white;
}

.btn-yes:hover:not(.disabled) {
  background-color: #45a049;
}

.btn-yes.voted {
  background-color: #2e7d32;
  box-shadow: 0 0 0 3px rgba(46, 125, 50, 0.3);
}

.btn-no {
  background-color: #f44336;
  color: white;
}

.btn-no:hover:not(.disabled) {
  background-color: #da190b;
}

.btn-no.voted {
  background-color: #c62828;
  box-shadow: 0 0 0 3px rgba(198, 40, 40, 0.3);
}

.btn.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.vote-status {
  text-align: center;
  color: #667eea;
  font-size: 0.95em;
  padding: 8px;
  background-color: #f0f0f0;
  border-radius: 5px;
}

.alert {
  max-width: 1200px;
  margin: 20px auto;
  padding: 15px;
  border-radius: 5px;
}

.alert-error {
  background-color: #ffebee;
  color: #c62828;
  border: 1px solid #ef5350;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    gap: 15px;
  }

  .header h1 {
    font-size: 1.5em;
  }

  .events-grid {
    grid-template-columns: 1fr;
  }

  .event-details {
    flex-direction: column;
    gap: 10px;
  }

  .voting-buttons {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .events-container {
    padding: 10px;
  }

  .header {
    margin-bottom: 20px;
  }

  .header h1 {
    font-size: 1.2em;
  }

  .event-card {
    margin-bottom: 15px;
  }
}
</style>
