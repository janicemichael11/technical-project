// ============================================================
// context/AuthContext.jsx — Global authentication state
// ============================================================
// React Context lets us share state across the entire component
// tree without passing props through every level ("prop drilling").
//
// This context stores the logged-in user object and provides
// login/logout functions that any component can call.
//
// The user is persisted in localStorage so they stay logged in
// after a page refresh.

import { createContext, useContext, useState } from 'react';

// Create the context object — null is the default value before the
// Provider wraps the app (should never be seen in practice)
const AuthContext = createContext(null);

/**
 * AuthProvider
 * Wrap your component tree with this to give all children access
 * to the auth state via the useAuth() hook.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Initialise from localStorage so the user stays logged in on refresh.
    // The function form of useState runs only once on mount.
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  // Called after a successful login or register API response
  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData)); // persist across refreshes
    setUser(userData);
  };

  // Called when the user clicks "Log out"
  const logout = () => {
    localStorage.removeItem('user'); // clear persisted session
    setUser(null);
  };

  return (
    // Provide the user object and auth functions to all child components
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * useAuth()
 * Custom hook — call this inside any component to access auth state.
 *
 * Example:
 *   const { user, login, logout } = useAuth();
 */
export const useAuth = () => useContext(AuthContext);
