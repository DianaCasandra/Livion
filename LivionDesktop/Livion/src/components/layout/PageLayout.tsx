/**
 * PageLayout - Shared layout wrapper for authenticated pages
 * Includes sidebar and main content area
 */

import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell } from 'lucide-react';
import { Sidebar } from './Sidebar';
import type { ActivePage } from './Sidebar';
import { COLORS, Typography, BorderRadius } from '../../constants/colors';

interface PageLayoutProps {
  activePage: ActivePage;
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  showNotifications?: boolean;
  notificationCount?: number;
  children: ReactNode;
}

export function PageLayout({
  activePage,
  title,
  subtitle,
  showBackButton = false,
  showNotifications = false,
  notificationCount = 0,
  children,
}: PageLayoutProps) {
  const navigate = useNavigate();

  const handleNavigate = (page: ActivePage) => {
    switch (page) {
      case 'dashboard':
        navigate('/dashboard');
        break;
      case 'patients':
        navigate('/patients');
        break;
      case 'schedule':
        navigate('/schedule');
        break;
      default:
        break;
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <Sidebar
        activePage={activePage}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />
      <main style={styles.main}>
        <header style={styles.header}>
          <div style={styles.headerLeft}>
            {showBackButton && (
              <button style={styles.backButton} onClick={() => navigate('/dashboard')}>
                <ArrowLeft size={20} color={COLORS.textSecondary} />
              </button>
            )}
            <div>
              <h1 style={styles.title}>{title}</h1>
              {subtitle && <p style={styles.subtitle}>{subtitle}</p>}
            </div>
          </div>
          {showNotifications && (
            <div style={styles.headerRight}>
              <button style={styles.notificationButton}>
                <Bell size={20} color={COLORS.textSecondary} />
                {notificationCount > 0 && (
                  <span style={styles.notificationBadge}>{notificationCount}</span>
                )}
              </button>
            </div>
          )}
        </header>
        <div style={styles.content}>{children}</div>
      </main>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: COLORS.background,
  },
  main: {
    flex: 1,
    marginLeft: '260px',
    padding: '24px 32px',
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    minHeight: '100vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexShrink: 0,
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  backButton: {
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    border: '1px solid rgba(255, 255, 255, 0.8)',
    borderRadius: BorderRadius.md,
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  title: {
    fontSize: Typography.fontSize['3xl'],
    fontWeight: Typography.fontWeight.bold,
    color: COLORS.textPrimary,
    margin: 0,
  },
  subtitle: {
    fontSize: Typography.fontSize.base,
    color: COLORS.textSecondary,
    margin: 0,
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  notificationButton: {
    position: 'relative',
    width: '44px',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    border: '1px solid rgba(255, 255, 255, 0.8)',
    borderRadius: BorderRadius.md,
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  notificationBadge: {
    position: 'absolute',
    top: '-4px',
    right: '-4px',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.error,
    color: COLORS.cardWhite,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold,
    borderRadius: '50%',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
};
