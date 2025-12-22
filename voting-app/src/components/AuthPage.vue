<template>
  <div class="login-container">
    <div class="login-box">
      <h1>🗳️ Voting App</h1>
      <p class="subtitle">ENSA Safi</p>

      <div v-if="!isLogin" class="form-container">
        <h2>Register</h2>
        <form @submit.prevent="handleRegister">
          <div class="form-group">
            <label for="register-email">Email Address:</label>
            <input
              id="register-email"
              v-model="registerForm.email"
              type="email"
              placeholder="your.email@ensa-safi.ac.ma"
              required
            />
          </div>
          <div class="form-group">
            <label for="register-password">Password:</label>
            <input
              id="register-password"
              v-model="registerForm.password"
              type="password"
              placeholder="Enter password"
              required
            />
          </div>
          <div class="form-group">
            <label for="confirm-password">Confirm Password:</label>
            <input
              id="confirm-password"
              v-model="registerForm.confirmPassword"
              type="password"
              placeholder="Confirm password"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary">Register</button>
          <p class="toggle-text">
            Already have an account?
            <button type="button" @click="isLogin = true" class="link-btn">
              Sign In
            </button>
          </p>
        </form>
      </div>

      <div v-if="isLogin" class="form-container">
        <h2>Sign In</h2>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="login-email">Email Address:</label>
            <input
              id="login-email"
              v-model="loginForm.email"
              type="email"
              placeholder="your.email@ensa-safi.ac.ma"
              required
            />
          </div>
          <div class="form-group">
            <label for="login-password">Password:</label>
            <input
              id="login-password"
              v-model="loginForm.password"
              type="password"
              placeholder="Enter password"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary">Sign In</button>
          <p class="toggle-text">
            Don't have an account?
            <button type="button" @click="isLogin = false" class="link-btn">
              Register
            </button>
          </p>
        </form>
      </div>

      <div v-if="error" class="alert alert-error">
        {{ error }}
      </div>
      <div v-if="loading" class="alert alert-info">
        Loading...
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../firebase';

export default {
  name: 'AuthPage',
  emits: ['authenticated'],
  setup(props, { emit }) {
    const isLogin = ref(true);
    const loading = ref(false);
    const error = ref('');

    const loginForm = ref({
      email: '',
      password: '',
    });

    const registerForm = ref({
      email: '',
      password: '',
      confirmPassword: '',
    });

    const handleLogin = async () => {
      error.value = '';
      loading.value = true;

      try {
        if (!loginForm.value.email || !loginForm.value.password) {
          error.value = 'Please fill in all fields';
          return;
        }

        await signInWithEmailAndPassword(
          auth,
          loginForm.value.email,
          loginForm.value.password
        );
        emit('authenticated');
      } catch (err) {
        error.value = err.message || 'Failed to sign in';
      } finally {
        loading.value = false;
      }
    };

    const handleRegister = async () => {
      error.value = '';
      loading.value = true;

      try {
        if (
          !registerForm.value.email ||
          !registerForm.value.password ||
          !registerForm.value.confirmPassword
        ) {
          error.value = 'Please fill in all fields';
          return;
        }

        if (registerForm.value.password !== registerForm.value.confirmPassword) {
          error.value = 'Passwords do not match';
          return;
        }

        if (registerForm.value.password.length < 6) {
          error.value = 'Password must be at least 6 characters long';
          return;
        }

        await createUserWithEmailAndPassword(
          auth,
          registerForm.value.email,
          registerForm.value.password
        );
        emit('authenticated');
      } catch (err) {
        error.value = err.message || 'Failed to register';
      } finally {
        loading.value = false;
      }
    };

    return {
      isLogin,
      loading,
      error,
      loginForm,
      registerForm,
      handleLogin,
      handleRegister,
    };
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-box {
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 100%;
}

h1 {
  text-align: center;
  color: #667eea;
  margin: 0 0 5px 0;
  font-size: 2.5em;
}

.subtitle {
  text-align: center;
  color: #666;
  margin-top: 0;
  font-size: 0.9em;
}

.form-container h2 {
  color: #333;
  text-align: center;
  margin-bottom: 25px;
  font-size: 1.5em;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 500;
}

input[type='email'],
input[type='password'] {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1em;
  transition: border-color 0.3s;
  box-sizing: border-box;
}

input[type='email']:focus,
input[type='password']:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 5px rgba(102, 126, 234, 0.3);
}

.btn {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s;
}

.btn-primary {
  background-color: #667eea;
  color: white;
  margin-bottom: 15px;
}

.btn-primary:hover {
  background-color: #5568d3;
}

.toggle-text {
  text-align: center;
  color: #666;
  margin: 0;
}

.link-btn {
  background: none;
  border: none;
  color: #667eea;
  cursor: pointer;
  font-weight: 600;
  text-decoration: underline;
  padding: 0;
}

.link-btn:hover {
  color: #5568d3;
}

.alert {
  padding: 12px 15px;
  border-radius: 5px;
  margin-top: 15px;
  text-align: center;
}

.alert-error {
  background-color: #fee;
  color: #c33;
  border: 1px solid #fcc;
}

.alert-info {
  background-color: #eef;
  color: #33c;
  border: 1px solid #ccf;
}

@media (max-width: 480px) {
  .login-box {
    padding: 25px;
  }

  h1 {
    font-size: 2em;
  }
}
</style>
