import { useMockData } from './useMockData';
export const useUserRole = () => {
  const m = useMockData();
  return m.user.role;
};