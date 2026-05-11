import type { User } from '@supabase/supabase-js';

export function isUserAuthenticated(user: User | null): user is User {
  return user !== null && user !== undefined;
}

export function getUserDisplayName(user: User | null): string {
  if (!user) return 'Guest';
  return user.user_metadata?.full_name || user.email || 'User';
}

export function getUserAvatar(user: User | null): string | null {
  if (!user) return null;
  return user.user_metadata?.avatar_url || null;
}

export async function validateEmail(email: string): Promise<boolean> {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function getAuthErrorMessage(error: any): string {
  const message = error?.message || '';

  if (message.includes('Invalid login credentials')) {
    return 'Invalid email or password';
  }
  if (message.includes('User already registered')) {
    return 'This email is already registered';
  }
  if (message.includes('Email not confirmed')) {
    return 'Please confirm your email address';
  }

  return message || 'An error occurred during authentication';
}
