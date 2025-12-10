/**
 * PatientsList - Patient management with AI diagnostics
 * Shows list of patients with AI-generated insights for attention/critical cases
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  User,
  Heart,
  Activity,
  AlertTriangle,
  ChevronRight,
  Calendar,
  MessageSquare,
  Sparkles,
  TrendingUp,
  TrendingDown,
  AlertCircle,
} from 'lucide-react';
import { GlassCard } from './GlassCard';
import { COLORS, Typography, BorderRadius } from '../constants/colors';

interface AIInsight {
  summary: string;
  recommendation: string;
  trend: 'improving' | 'stable' | 'declining';
  urgency: 'low' | 'medium' | 'high';
}

interface Patient {
  id: string;
  name: string;
  age: number;
  condition: string;
  status: 'stable' | 'attention' | 'critical';
  lastVisit: string;
  nextAppointment: string | null;
  vitals: {
    heartRate: number;
    bloodPressure: string;
    oxygenLevel?: number;
    temperature?: number;
  };
  aiInsight?: AIInsight;
}

// Mock patient data with AI insights
const MOCK_PATIENTS: Patient[] = [
  {
    id: '1',
    name: 'Ana Popescu',
    age: 45,
    condition: 'Hipertensiune',
    status: 'stable',
    lastVisit: 'acum 2 zile',
    nextAppointment: 'Mâine, 09:00',
    vitals: { heartRate: 72, bloodPressure: '120/80', oxygenLevel: 98 },
  },
  {
    id: '2',
    name: 'Ion Ionescu',
    age: 62,
    condition: 'Diabet Tip 2',
    status: 'attention',
    lastVisit: 'acum 1 săptămână',
    nextAppointment: '15 Dec, 14:00',
    vitals: { heartRate: 78, bloodPressure: '135/88', oxygenLevel: 96 },
    aiInsight: {
      summary: 'Nivelurile glicemiei în tendință ascendentă față de valoarea de bază în ultimele 2 săptămâni. HbA1c posibil crescută.',
      recommendation: 'Luați în considerare ajustarea dozei de metformin sau adăugarea unui agonist GLP-1. Programați analize.',
      trend: 'declining',
      urgency: 'medium',
    },
  },
  {
    id: '3',
    name: 'Elena Dumitrescu',
    age: 34,
    condition: 'Astm',
    status: 'stable',
    lastVisit: 'acum 3 zile',
    nextAppointment: null,
    vitals: { heartRate: 68, bloodPressure: '118/75', oxygenLevel: 99 },
  },
  {
    id: '4',
    name: 'Gheorghe Munteanu',
    age: 71,
    condition: 'Boală Cardiacă',
    status: 'critical',
    lastVisit: 'Astăzi',
    nextAppointment: 'Astăzi, 16:00',
    vitals: { heartRate: 92, bloodPressure: '145/95', oxygenLevel: 94 },
    aiInsight: {
      summary: 'Frecvență cardiacă și TA crescute combinate cu saturație O2 redusă. Modelul sugerează posibilă exacerbare ICC.',
      recommendation: 'Ecocardiogramă urgentă recomandată. Luați în considerare ajustarea terapiei diuretice. Monitorizați pentru edeme.',
      trend: 'declining',
      urgency: 'high',
    },
  },
  {
    id: '5',
    name: 'Maria Georgescu',
    age: 52,
    condition: 'Boală Cronică de Rinichi',
    status: 'attention',
    lastVisit: 'acum 5 zile',
    nextAppointment: '18 Dec, 11:00',
    vitals: { heartRate: 74, bloodPressure: '128/82', oxygenLevel: 97 },
    aiInsight: {
      summary: 'eGFR arată declin gradual. Nivelurile creatininei ușor crescute față de luna trecută.',
      recommendation: 'Revizuiți medicamentele actuale pentru nefrotoxicitate. Luați în considerare trimitere la nefrolog dacă declinul continuă.',
      trend: 'declining',
      urgency: 'medium',
    },
  },
  {
    id: '6',
    name: 'Vasile Stoica',
    age: 58,
    condition: 'BPOC',
    status: 'stable',
    lastVisit: 'acum 1 săptămână',
    nextAppointment: '20 Dec, 15:30',
    vitals: { heartRate: 76, bloodPressure: '122/78', oxygenLevel: 95 },
  },
];

const statusConfig = {
  stable: {
    color: COLORS.success,
    bgColor: COLORS.successLight,
    icon: Heart,
    label: 'Stabil',
  },
  attention: {
    color: COLORS.warning,
    bgColor: COLORS.warningLight,
    icon: Activity,
    label: 'Atenție',
  },
  critical: {
    color: COLORS.error,
    bgColor: COLORS.errorLight,
    icon: AlertTriangle,
    label: 'Critic',
  },
};

const trendConfig = {
  improving: { icon: TrendingUp, color: COLORS.success },
  stable: { icon: Activity, color: COLORS.blue },
  declining: { icon: TrendingDown, color: COLORS.error },
};

export function PatientsList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [expandedPatient, setExpandedPatient] = useState<string | null>(null);

  const handlePatientClick = (patientId: string) => {
    navigate(`/patients/${patientId}`);
  };

  const filteredPatients = MOCK_PATIENTS.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !selectedStatus || patient.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: MOCK_PATIENTS.length,
    stable: MOCK_PATIENTS.filter((p) => p.status === 'stable').length,
    attention: MOCK_PATIENTS.filter((p) => p.status === 'attention').length,
    critical: MOCK_PATIENTS.filter((p) => p.status === 'critical').length,
  };

  const toggleExpand = (patientId: string) => {
    setExpandedPatient(expandedPatient === patientId ? null : patientId);
  };

  return (
    <GlassCard style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h2 style={styles.title}>Pacienți</h2>
          <div style={styles.aiIndicator}>
            <Sparkles size={14} color={COLORS.purple} />
            <span>Diagnostice AI Active</span>
          </div>
        </div>
        <span style={styles.count}>{MOCK_PATIENTS.length} total</span>
      </div>

      {/* Search bar */}
      <div style={styles.searchContainer}>
        <Search size={18} color={COLORS.textTertiary} />
        <input
          type="text"
          placeholder="Caută pacienți..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      {/* Status filters */}
      <div style={styles.statusFilters}>
        {(['all', 'critical', 'attention', 'stable'] as const).map((status) => {
          const isSelected = status === 'all' ? !selectedStatus : selectedStatus === status;
          const config = status === 'all' ? null : statusConfig[status];

          return (
            <button
              key={status}
              onClick={() => setSelectedStatus(status === 'all' ? null : status)}
              style={{
                ...styles.filterButton,
                backgroundColor: isSelected
                  ? config?.bgColor || COLORS.tealLight
                  : 'rgba(255, 255, 255, 0.5)',
                borderColor: isSelected ? config?.color || COLORS.teal : 'transparent',
                color: isSelected ? config?.color || COLORS.tealDark : COLORS.textSecondary,
              }}
            >
              {status === 'all' ? 'Toți' : config?.label}
              <span style={styles.filterCount}>
                {status === 'all' ? statusCounts.all : statusCounts[status]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Patient list */}
      <div style={styles.patientList}>
        {filteredPatients.length === 0 ? (
          <div style={styles.emptyState}>
            <User size={32} color={COLORS.textTertiary} />
            <p style={styles.emptyText}>Niciun pacient găsit</p>
          </div>
        ) : (
          filteredPatients.map((patient, index) => {
            const status = statusConfig[patient.status];
            const StatusIcon = status.icon;
            const isExpanded = expandedPatient === patient.id;
            const hasAIInsight = patient.aiInsight && patient.status !== 'stable';
            const isLast = index === filteredPatients.length - 1;

            return (
              <div key={patient.id}>
                <div
                  style={{
                    ...styles.patientCard,
                    ...(hasAIInsight && styles.patientCardWithAI),
                    borderLeftColor: hasAIInsight ? status.color : 'transparent',
                  }}
                >
                <div
                  style={styles.patientMainRow}
                  onClick={() => handlePatientClick(patient.id)}
                >
                  {/* Avatar */}
                  <div
                    style={{
                      ...styles.avatar,
                      backgroundColor: status.bgColor,
                    }}
                  >
                    <span style={{ ...styles.avatarText, color: status.color }}>
                      {patient.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </span>
                  </div>

                  {/* Patient info */}
                  <div style={styles.patientInfo}>
                    <div style={styles.patientHeader}>
                      <span style={styles.patientName}>{patient.name}</span>
                      <div
                        style={{
                          ...styles.statusBadge,
                          backgroundColor: status.bgColor,
                          color: status.color,
                        }}
                      >
                        <StatusIcon size={12} />
                        <span>{status.label}</span>
                      </div>
                      {hasAIInsight && (
                        <div style={styles.aiTag}>
                          <Sparkles size={10} />
                          <span>AI</span>
                        </div>
                      )}
                    </div>

                    <div style={styles.patientMeta}>
                      <span>{patient.age} ani</span>
                      <span style={styles.metaDivider}>|</span>
                      <span>{patient.condition}</span>
                    </div>

                    <div style={styles.patientDetails}>
                      <div style={styles.vitals}>
                        <Heart size={14} color={COLORS.error} />
                        <span>{patient.vitals.heartRate} bpm</span>
                        <Activity size={14} color={COLORS.teal} style={{ marginLeft: '8px' }} />
                        <span>{patient.vitals.bloodPressure}</span>
                        {patient.vitals.oxygenLevel && (
                          <>
                            <span style={{ marginLeft: '8px', color: COLORS.blue }}>O₂</span>
                            <span>{patient.vitals.oxygenLevel}%</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={styles.actions} onClick={(e) => e.stopPropagation()}>
                    {hasAIInsight && (
                      <button
                        style={{
                          ...styles.expandButton,
                          backgroundColor: isExpanded ? COLORS.purpleLight : 'transparent',
                        }}
                        onClick={() => toggleExpand(patient.id)}
                        title="View AI insight"
                      >
                        <Sparkles size={16} color={COLORS.purple} />
                      </button>
                    )}
                    <button style={styles.actionButton} title="Message">
                      <MessageSquare size={16} color={COLORS.textSecondary} />
                    </button>
                    <button
                      style={styles.viewProfileButton}
                      onClick={() => handlePatientClick(patient.id)}
                      title="View profile"
                    >
                      <ChevronRight size={16} color={COLORS.teal} />
                    </button>
                  </div>
                </div>

                {/* AI Insight Panel - Expanded */}
                {hasAIInsight && isExpanded && patient.aiInsight && (
                  <div style={styles.aiInsightPanel}>
                    <div style={styles.aiInsightHeader}>
                      <div style={styles.aiInsightTitle}>
                        <Sparkles size={16} color={COLORS.purple} />
                        <span>Rezumat Diagnostic AI</span>
                      </div>
                      <div
                        style={{
                          ...styles.trendBadge,
                          backgroundColor:
                            trendConfig[patient.aiInsight.trend].color + '15',
                          color: trendConfig[patient.aiInsight.trend].color,
                        }}
                      >
                        {(() => {
                          const TrendIcon = trendConfig[patient.aiInsight.trend].icon;
                          return <TrendIcon size={12} />;
                        })()}
                        <span style={{ textTransform: 'capitalize' }}>
                          {patient.aiInsight.trend === 'improving' ? 'În îmbunătățire' :
                           patient.aiInsight.trend === 'stable' ? 'Stabil' : 'În declin'}
                        </span>
                      </div>
                    </div>

                    <div style={styles.aiInsightContent}>
                      <div style={styles.insightSection}>
                        <div style={styles.insightLabel}>
                          <AlertCircle size={14} color={COLORS.warning} />
                          <span>Analiză</span>
                        </div>
                        <p style={styles.insightText}>{patient.aiInsight.summary}</p>
                      </div>

                      <div style={styles.insightSection}>
                        <div style={styles.insightLabel}>
                          <Activity size={14} color={COLORS.teal} />
                          <span>Recomandare</span>
                        </div>
                        <p style={styles.insightText}>{patient.aiInsight.recommendation}</p>
                      </div>
                    </div>

                    <div style={styles.aiInsightActions}>
                      <button style={styles.aiActionButton}>
                        <Calendar size={14} />
                        Programează Control
                      </button>
                      <button style={{ ...styles.aiActionButton, ...styles.aiActionButtonPrimary }}>
                        <Activity size={14} />
                        Comandă Analize
                      </button>
                    </div>
                  </div>
                )}

                {/* Compact AI Summary - Always visible for attention/critical */}
                {hasAIInsight && !isExpanded && patient.aiInsight && (
                  <div
                    style={styles.aiSummaryCompact}
                    onClick={() => toggleExpand(patient.id)}
                  >
                    <Sparkles size={12} color={COLORS.purple} />
                    <span style={styles.aiSummaryText}>
                      {patient.aiInsight.summary.length > 80
                        ? patient.aiInsight.summary.substring(0, 80) + '...'
                        : patient.aiInsight.summary}
                    </span>
                    <span style={styles.expandHint}>Click pentru detalii</span>
                  </div>
                )}
                </div>
                {/* Divider between patients */}
                {!isLast && <div style={styles.patientDivider} />}
              </div>
            );
          })
        )}
      </div>
    </GlassCard>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    height: '100%',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  title: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.semibold,
    color: COLORS.textPrimary,
    margin: 0,
  },
  aiIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 10px',
    backgroundColor: COLORS.purpleLight,
    borderRadius: BorderRadius.full,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.medium,
    color: COLORS.purple,
  },
  count: {
    fontSize: Typography.fontSize.sm,
    color: COLORS.textTertiary,
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 14px',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: BorderRadius.md,
    border: '1px solid rgba(255, 255, 255, 0.8)',
  },
  searchInput: {
    flex: 1,
    border: 'none',
    background: 'transparent',
    fontSize: Typography.fontSize.base,
    color: COLORS.textPrimary,
    outline: 'none',
  },
  statusFilters: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },
  filterButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 12px',
    borderRadius: BorderRadius.sm,
    border: '1px solid transparent',
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  filterCount: {
    opacity: 0.7,
    fontSize: Typography.fontSize.xs,
  },
  patientList: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '0px',
    overflow: 'auto',
  },
  patientDivider: {
    height: '1px',
    backgroundColor: COLORS.border,
    margin: '12px 0',
    opacity: 0.5,
  },
  emptyState: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    padding: '40px',
  },
  emptyText: {
    fontSize: Typography.fontSize.base,
    color: COLORS.textTertiary,
    margin: 0,
  },
  patientCard: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: BorderRadius.md,
    border: '1px solid rgba(255, 255, 255, 0.7)',
    borderLeftWidth: '4px',
    borderLeftStyle: 'solid',
    transition: 'all 150ms ease',
    overflow: 'hidden',
  },
  patientCardWithAI: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  patientMainRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '14px',
    cursor: 'pointer',
    transition: 'background-color 150ms ease',
  },
  avatar: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  avatarText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
  },
  patientInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    minWidth: 0,
  },
  patientHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexWrap: 'wrap',
  },
  patientName: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: COLORS.textPrimary,
  },
  statusBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '2px 8px',
    borderRadius: BorderRadius.sm,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.medium,
  },
  aiTag: {
    display: 'flex',
    alignItems: 'center',
    gap: '3px',
    padding: '2px 6px',
    backgroundColor: COLORS.purpleLight,
    borderRadius: BorderRadius.sm,
    fontSize: '10px',
    fontWeight: Typography.fontWeight.bold,
    color: COLORS.purple,
  },
  patientMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: Typography.fontSize.sm,
    color: COLORS.textSecondary,
  },
  metaDivider: {
    color: COLORS.textTertiary,
  },
  patientDetails: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '2px',
  },
  vitals: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: Typography.fontSize.xs,
    color: COLORS.textSecondary,
  },
  actions: {
    display: 'flex',
    gap: '4px',
    flexShrink: 0,
  },
  actionButton: {
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: BorderRadius.sm,
    cursor: 'pointer',
    transition: 'background-color 150ms ease',
  },
  viewProfileButton: {
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.tealLight,
    border: 'none',
    borderRadius: BorderRadius.sm,
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  expandButton: {
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    borderRadius: BorderRadius.sm,
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },

  // AI Insight Panel
  aiInsightPanel: {
    padding: '16px',
    backgroundColor: COLORS.purpleLight + '40',
    borderTop: `1px solid ${COLORS.purple}20`,
  },
  aiInsightHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  aiInsightTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: COLORS.purple,
  },
  trendBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 8px',
    borderRadius: BorderRadius.sm,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.medium,
  },
  aiInsightContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  insightSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  insightLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semibold,
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  insightText: {
    fontSize: Typography.fontSize.sm,
    color: COLORS.textPrimary,
    lineHeight: 1.5,
    margin: 0,
    paddingLeft: '20px',
  },
  aiInsightActions: {
    display: 'flex',
    gap: '8px',
    marginTop: '16px',
  },
  aiActionButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 14px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    border: `1px solid ${COLORS.border}`,
    borderRadius: BorderRadius.sm,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: COLORS.textSecondary,
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  aiActionButtonPrimary: {
    backgroundColor: COLORS.teal,
    borderColor: COLORS.teal,
    color: COLORS.cardWhite,
  },

  // Compact AI Summary
  aiSummaryCompact: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 14px',
    backgroundColor: COLORS.purpleLight + '30',
    borderTop: `1px solid ${COLORS.purple}15`,
    cursor: 'pointer',
    transition: 'background-color 150ms ease',
  },
  aiSummaryText: {
    flex: 1,
    fontSize: Typography.fontSize.xs,
    color: COLORS.textSecondary,
    lineHeight: 1.4,
  },
  expandHint: {
    fontSize: Typography.fontSize.xs,
    color: COLORS.purple,
    fontWeight: Typography.fontWeight.medium,
    whiteSpace: 'nowrap',
  },
};
