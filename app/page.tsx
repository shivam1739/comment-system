// app/page.tsx
'use client';

import { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '@/config/firebase';

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      // Open Google Sign-In popup
      const result = await signInWithPopup(auth, provider);
      const user = result.user; // Firebase user object
      const idToken = await user.getIdToken(); // Get the ID token from the user

      // Send the ID token to your server for verification
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user); // Set the authenticated user data
      } else {
        console.error('Server error:', await response.text());
      }
    } catch (error) {
      console.error('Error signing in:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut(); // Sign out the user
      setUser(null); // Clear user state
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div>
      {!user ? (
        <button onClick={handleSignIn} disabled={loading}>
          {loading ? 'Signing in...' : 'Sign in with Google'}
        </button>
      ) : (
        <div>
          <p>Welcome, {user.name || 'User'}!</p>
          <button onClick={handleSignOut}>Sign out</button>
        </div>
      )}
    </div>
  );
}
