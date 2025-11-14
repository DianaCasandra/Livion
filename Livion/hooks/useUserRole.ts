import { UserRole, useUser } from '../components/providers/UserProvider';

/**
 * useUserRole Hook
 * Get current user role for conditional rendering
 */
export const useUserRole = (): UserRole | null => {
  const { user } = useUser();
  return user?.role || null;
};
