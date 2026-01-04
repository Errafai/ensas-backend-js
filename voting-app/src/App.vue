<template>
  <div class="app">
    <RouterView
      @authenticated="handleAuthenticated"
      @logout="handleLogout"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { RouterView, useRouter } from 'vue-router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

export default defineComponent({
  name: 'App',
  components: {
    RouterView,
  },
  setup() {
    const router = useRouter();

    const handleAuthenticated = () => {
      router.push('/events');
    };

    const handleLogout = () => {
      router.push('/');
    };

    // Monitor auth state changes
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        if (router.currentRoute.value.path === '/') {
          router.push('/events');
        }
      } else {
        // User is signed out
        if (router.currentRoute.value.path === '/events') {
          router.push('/');
        }
      }
    });

    return {
      handleAuthenticated,
      handleLogout,
    };
  },
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #f5f5f5;
}

.app {
  width: 100%;
  height: 100%;
}
</style>
