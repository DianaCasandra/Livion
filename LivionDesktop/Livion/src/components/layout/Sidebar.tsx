/**
 * Sidebar - Shared navigation sidebar component
 * Used across all authenticated pages
 */

import {
  LogOut,
  Bell,
  Settings,
  User,
  Calendar as CalendarIcon,
  Users,
  Activity,
} from 'lucide-react';
import { COLORS, Typography, BorderRadius } from '../../constants/colors';

export type ActivePage = 'dashboard' | 'patients' | 'schedule' | 'notifications' | 'settings';

interface SidebarProps {
  activePage: ActivePage;
  onNavigate: (page: ActivePage) => void;
  onLogout: () => void;
  userName?: string;
  userRole?: string;
}

const navItems = [
  { id: 'dashboard' as ActivePage, icon: Activity, label: 'Dashboard' },
  { id: 'patients' as ActivePage, icon: Users, label: 'Patients' },
  { id: 'schedule' as ActivePage, icon: CalendarIcon, label: 'Schedule' },
  { id: 'notifications' as ActivePage, icon: Bell, label: 'Notifications' },
  { id: 'settings' as ActivePage, icon: Settings, label: 'Settings' },
];

export function Sidebar({
  activePage,
  onNavigate,
  onLogout,
  userName = 'Dr. Harper',
  userRole = 'Cardiologist',
}: SidebarProps) {
  return (
    <aside style={styles.sidebar}>
      <div style={styles.sidebarHeader}>
        <img src="/logo-icon.png" alt="Livion" style={styles.logoImage} />
      </div>

      <nav style={styles.nav}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              style={{
                ...styles.navItem,
                ...(isActive && styles.navItemActive),
              }}
              onClick={() => onNavigate(item.id)}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div style={styles.sidebarFooter}>
        <div style={styles.userInfo}>
          <div style={styles.userAvatar}>
            <User size={20} color={COLORS.teal} />
          </div>
          <div style={styles.userDetails}>
            <span style={styles.userName}>{userName}</span>
            <span style={styles.userRole}>{userRole}</span>
          </div>
        </div>
        <button onClick={onLogout} style={styles.logoutButton}>
          <LogOut size={18} />
        </button>
      </div>
    </aside>
  );
}

const styles: Record<string, React.CSSProperties> = {
  sidebar: {
    width: '260px',
    backgroundColor: COLORS.textPrimary,
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 16px',
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    zIndex: 10,
  },
  sidebarHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '40px',
  },
  logoImage: {
    width: '80px',
    height: '80px',
    objectFit: 'contain',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    flex: 1,
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    borderRadius: BorderRadius.md,
    border: 'none',
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
    cursor: 'pointer',
    transition: 'all 150ms ease',
    textAlign: 'left' as const,
  },
  navItemActive: {
    backgroundColor: 'rgba(3, 208, 197, 0.15)',
    color: COLORS.teal,
  },
  sidebarFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: '20px',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    marginTop: '20px',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  userAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: COLORS.tealLight,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userDetails: {
    display: 'flex',
    flexDirection: 'column',
  },
  userName: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: COLORS.cardWhite,
  },
  userRole: {
    fontSize: Typography.fontSize.xs,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  logoutButton: {
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    border: 'none',
    borderRadius: BorderRadius.sm,
    color: 'rgba(255, 255, 255, 0.6)',
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
};
