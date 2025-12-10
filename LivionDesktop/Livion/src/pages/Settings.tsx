/**
 * Settings - Doctor profile, digital certificate, and practice settings
 * Allows doctors to manage their profile and upload digital certificate
 */

import { useState, useRef } from 'react';
import {
  User,
  Building2,
  FileSignature,
  Upload,
  Trash2,
  Save,
  Phone,
  Mail,
  MapPin,
  Clock,
  Award,
  Briefcase,
  Calendar,
  Shield,
  Bell,
  Globe,
  CheckCircle,
} from 'lucide-react';
import { PageLayout } from '../components/layout/PageLayout';
import { GlassCard } from '../components/GlassCard';
import { COLORS, Typography, BorderRadius, Shadows } from '../constants/colors';

// Mock doctor data
const DOCTOR_DATA = {
  name: 'Dr. Alexandru Radu',
  title: 'MD, Primar',
  specialty: 'Cardiolog',
  licenseNumber: 'RO-MD-2015-78234',
  npi: '1234567890',
  email: 'dr.radu@livion.ro',
  phone: '0721 123 456',
  yearsExperience: 12,
};

const PRACTICE_DATA = {
  name: 'Centrul Cardiovascular Livion',
  address: 'Str. Medicilor 456, Etaj 3',
  city: 'București',
  state: 'Sector 1',
  zip: '010101',
  phone: '021 987 6543',
  fax: '021 987 6544',
  email: 'contact@livion.ro',
  website: 'www.livion.ro',
  hours: {
    weekdays: '08:00 - 17:00',
    saturday: '09:00 - 12:00',
    sunday: 'Închis',
  },
  acceptingPatients: true,
};

export function Settings() {
  const [signature, setSignature] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state for editable fields
  const [doctorInfo, setDoctorInfo] = useState(DOCTOR_DATA);
  const [practiceInfo, setPracticeInfo] = useState(PRACTICE_DATA);

  const handleSignatureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSignature(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveSignature = () => {
    setSignature(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  return (
    <PageLayout
      activePage="settings"
      title="Setări"
      subtitle="Gestionați profilul, informațiile cabinetului și preferințele"
    >
      <div style={styles.container}>
        {/* Left Column */}
        <div style={styles.leftColumn}>
          {/* Doctor Profile Card */}
          <GlassCard padding="lg" style={styles.card}>
            <div style={styles.cardHeader}>
              <User size={20} color={COLORS.teal} />
              <h2 style={styles.cardTitle}>Profil Medic</h2>
            </div>

            <div style={styles.profileHeader}>
              <div style={styles.avatar}>
                <span style={styles.avatarText}>AR</span>
              </div>
              <div style={styles.profileInfo}>
                <h3 style={styles.doctorName}>{doctorInfo.name}</h3>
                <span style={styles.doctorTitle}>{doctorInfo.title}</span>
                <span style={styles.doctorSpecialty}>{doctorInfo.specialty}</span>
              </div>
            </div>

            <div style={styles.formGrid}>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  <Mail size={14} /> Email
                </label>
                <input
                  type="email"
                  value={doctorInfo.email}
                  onChange={(e) => setDoctorInfo({ ...doctorInfo, email: e.target.value })}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  <Phone size={14} /> Telefon
                </label>
                <input
                  type="tel"
                  value={doctorInfo.phone}
                  onChange={(e) => setDoctorInfo({ ...doctorInfo, phone: e.target.value })}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  <Award size={14} /> Nr. Licență
                </label>
                <input
                  type="text"
                  value={doctorInfo.licenseNumber}
                  readOnly
                  style={{ ...styles.input, ...styles.inputReadonly }}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  <Shield size={14} /> Cod Parafă
                </label>
                <input
                  type="text"
                  value={doctorInfo.npi}
                  readOnly
                  style={{ ...styles.input, ...styles.inputReadonly }}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  <Briefcase size={14} /> Specialitate
                </label>
                <input
                  type="text"
                  value={doctorInfo.specialty}
                  onChange={(e) => setDoctorInfo({ ...doctorInfo, specialty: e.target.value })}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  <Calendar size={14} /> Ani Experiență
                </label>
                <input
                  type="number"
                  value={doctorInfo.yearsExperience}
                  onChange={(e) => setDoctorInfo({ ...doctorInfo, yearsExperience: parseInt(e.target.value) || 0 })}
                  style={styles.input}
                />
              </div>
            </div>
          </GlassCard>

          {/* Digital Certificate Card */}
          <GlassCard padding="lg" style={styles.card}>
            <div style={styles.cardHeader}>
              <FileSignature size={20} color={COLORS.purple} />
              <h2 style={styles.cardTitle}>Certificat Digital</h2>
            </div>

            <p style={styles.cardDescription}>
              Încărcați certificatul digital pentru utilizare în rețete, documente medicale și acte oficiale.
            </p>

            <div style={styles.signatureSection}>
              {signature ? (
                <div style={styles.signaturePreview}>
                  <div style={styles.signatureImageContainer}>
                    <img src={signature} alt="Digital Certificate" style={styles.signatureImage} />
                  </div>
                  <div style={styles.signatureActions}>
                    <button
                      style={styles.changeButton}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload size={14} />
                      Schimbă
                    </button>
                    <button
                      style={styles.removeButton}
                      onClick={handleRemoveSignature}
                    >
                      <Trash2 size={14} />
                      Șterge
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  style={styles.uploadArea}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload size={32} color={COLORS.textTertiary} />
                  <span style={styles.uploadText}>Click pentru a încărca certificatul</span>
                  <span style={styles.uploadHint}>.cert, .pfx, .p12 până la 2MB</span>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept=".cert,.pfx,.p12,.pem,.crt,.cer"
                onChange={handleSignatureUpload}
                style={{ display: 'none' }}
              />
            </div>

            <div style={styles.signatureInfo}>
              <Shield size={14} color={COLORS.teal} />
              <span>Certificatul dumneavoastră este stocat securizat și criptat</span>
            </div>
          </GlassCard>
        </div>

        {/* Right Column */}
        <div style={styles.rightColumn}>
          {/* Practice Information Card */}
          <GlassCard padding="lg" style={styles.card}>
            <div style={styles.cardHeader}>
              <Building2 size={20} color={COLORS.blue} />
              <h2 style={styles.cardTitle}>Informații Cabinet</h2>
            </div>

            <div style={styles.practiceHeader}>
              <div style={styles.practiceIcon}>
                <Building2 size={24} color={COLORS.blue} />
              </div>
              <div>
                <h3 style={styles.practiceName}>{practiceInfo.name}</h3>
                <div style={styles.acceptingBadge}>
                  <CheckCircle size={12} />
                  <span>Acceptă Pacienți Noi</span>
                </div>
              </div>
            </div>

            <div style={styles.formGrid}>
              <div style={{ ...styles.formGroup, gridColumn: '1 / -1' }}>
                <label style={styles.label}>
                  <Building2 size={14} /> Nume Cabinet
                </label>
                <input
                  type="text"
                  value={practiceInfo.name}
                  onChange={(e) => setPracticeInfo({ ...practiceInfo, name: e.target.value })}
                  style={styles.input}
                />
              </div>
              <div style={{ ...styles.formGroup, gridColumn: '1 / -1' }}>
                <label style={styles.label}>
                  <MapPin size={14} /> Adresă
                </label>
                <input
                  type="text"
                  value={practiceInfo.address}
                  onChange={(e) => setPracticeInfo({ ...practiceInfo, address: e.target.value })}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Oraș</label>
                <input
                  type="text"
                  value={practiceInfo.city}
                  onChange={(e) => setPracticeInfo({ ...practiceInfo, city: e.target.value })}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Sector/Județ</label>
                <input
                  type="text"
                  value={practiceInfo.state}
                  onChange={(e) => setPracticeInfo({ ...practiceInfo, state: e.target.value })}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  <Phone size={14} /> Telefon
                </label>
                <input
                  type="tel"
                  value={practiceInfo.phone}
                  onChange={(e) => setPracticeInfo({ ...practiceInfo, phone: e.target.value })}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Fax</label>
                <input
                  type="tel"
                  value={practiceInfo.fax}
                  onChange={(e) => setPracticeInfo({ ...practiceInfo, fax: e.target.value })}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  <Mail size={14} /> Email
                </label>
                <input
                  type="email"
                  value={practiceInfo.email}
                  onChange={(e) => setPracticeInfo({ ...practiceInfo, email: e.target.value })}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  <Globe size={14} /> Website
                </label>
                <input
                  type="text"
                  value={practiceInfo.website}
                  onChange={(e) => setPracticeInfo({ ...practiceInfo, website: e.target.value })}
                  style={styles.input}
                />
              </div>
            </div>

            {/* Office Hours */}
            <div style={styles.hoursSection}>
              <h4 style={styles.hoursTitle}>
                <Clock size={16} color={COLORS.amber} />
                Program de Lucru
              </h4>
              <div style={styles.hoursGrid}>
                <div style={styles.hoursRow}>
                  <span style={styles.hoursDay}>Luni - Vineri</span>
                  <span style={styles.hoursTime}>{practiceInfo.hours.weekdays}</span>
                </div>
                <div style={styles.hoursRow}>
                  <span style={styles.hoursDay}>Sâmbătă</span>
                  <span style={styles.hoursTime}>{practiceInfo.hours.saturday}</span>
                </div>
                <div style={styles.hoursRow}>
                  <span style={styles.hoursDay}>Duminică</span>
                  <span style={styles.hoursClosed}>{practiceInfo.hours.sunday}</span>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Notification Preferences */}
          <GlassCard padding="lg" style={styles.card}>
            <div style={styles.cardHeader}>
              <Bell size={20} color={COLORS.amber} />
              <h2 style={styles.cardTitle}>Preferințe Notificări</h2>
            </div>

            <div style={styles.toggleList}>
              <ToggleItem
                label="Notificări email"
                description="Primește actualizări prin email"
                defaultChecked={true}
              />
              <ToggleItem
                label="Alerte pacienți critici"
                description="Alerte imediate pentru schimbări de status critic"
                defaultChecked={true}
              />
              <ToggleItem
                label="Memento programări"
                description="Rezumat zilnic al programărilor viitoare"
                defaultChecked={true}
              />
              <ToggleItem
                label="Notificări rezultate analize"
                description="Alerte când sunt disponibile rezultate noi"
                defaultChecked={false}
              />
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Save Button */}
      <div style={styles.saveSection}>
        {saveSuccess && (
          <div style={styles.saveSuccess}>
            <CheckCircle size={16} />
            <span>Setările au fost salvate cu succes!</span>
          </div>
        )}
        <button
          style={{
            ...styles.saveButton,
            opacity: isSaving ? 0.7 : 1,
          }}
          onClick={handleSave}
          disabled={isSaving}
        >
          <Save size={18} />
          {isSaving ? 'Se salvează...' : 'Salvează Modificările'}
        </button>
      </div>
    </PageLayout>
  );
}

// Toggle Item Component
interface ToggleItemProps {
  label: string;
  description: string;
  defaultChecked: boolean;
}

function ToggleItem({ label, description, defaultChecked }: ToggleItemProps) {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <div style={styles.toggleItem}>
      <div style={styles.toggleInfo}>
        <span style={styles.toggleLabel}>{label}</span>
        <span style={styles.toggleDescription}>{description}</span>
      </div>
      <button
        style={{
          ...styles.toggle,
          backgroundColor: checked ? COLORS.teal : COLORS.border,
        }}
        onClick={() => setChecked(!checked)}
      >
        <div
          style={{
            ...styles.toggleKnob,
            transform: checked ? 'translateX(20px)' : 'translateX(0)',
          }}
        />
      </button>
    </div>
  );
}

// ============ STYLES ============

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  cardTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: COLORS.textPrimary,
    margin: 0,
  },
  cardDescription: {
    fontSize: Typography.fontSize.sm,
    color: COLORS.textSecondary,
    lineHeight: 1.5,
    margin: 0,
  },

  // Profile section
  profileHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: BorderRadius.md,
  },
  avatar: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    backgroundColor: COLORS.tealLight,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: COLORS.teal,
  },
  profileInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  doctorName: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: COLORS.textPrimary,
    margin: 0,
  },
  doctorTitle: {
    fontSize: Typography.fontSize.sm,
    color: COLORS.teal,
    fontWeight: Typography.fontWeight.medium,
  },
  doctorSpecialty: {
    fontSize: Typography.fontSize.sm,
    color: COLORS.textSecondary,
  },

  // Form
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: COLORS.textSecondary,
  },
  input: {
    padding: '10px 14px',
    fontSize: Typography.fontSize.base,
    color: COLORS.textPrimary,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    border: `1px solid ${COLORS.border}`,
    borderRadius: BorderRadius.md,
    outline: 'none',
    transition: 'border-color 150ms ease, box-shadow 150ms ease',
  },
  inputReadonly: {
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    color: COLORS.textSecondary,
    cursor: 'not-allowed',
  },

  // Signature section
  signatureSection: {
    marginTop: '8px',
  },
  uploadArea: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    padding: '40px',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    border: `2px dashed ${COLORS.border}`,
    borderRadius: BorderRadius.md,
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  uploadText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
    color: COLORS.textPrimary,
  },
  uploadHint: {
    fontSize: Typography.fontSize.sm,
    color: COLORS.textTertiary,
  },
  signaturePreview: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  signatureImageContainer: {
    padding: '20px',
    backgroundColor: COLORS.cardWhite,
    borderRadius: BorderRadius.md,
    border: `1px solid ${COLORS.border}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signatureImage: {
    maxWidth: '100%',
    maxHeight: '100px',
    objectFit: 'contain',
  },
  signatureActions: {
    display: 'flex',
    gap: '8px',
  },
  changeButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    border: `1px solid ${COLORS.border}`,
    borderRadius: BorderRadius.sm,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: COLORS.textSecondary,
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  removeButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    backgroundColor: COLORS.errorLight,
    border: 'none',
    borderRadius: BorderRadius.sm,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: COLORS.error,
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  signatureInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 14px',
    backgroundColor: COLORS.tealLight,
    borderRadius: BorderRadius.sm,
    fontSize: Typography.fontSize.sm,
    color: COLORS.tealDark,
  },

  // Practice section
  practiceHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: BorderRadius.md,
  },
  practiceIcon: {
    width: '56px',
    height: '56px',
    borderRadius: BorderRadius.md,
    backgroundColor: COLORS.blueLight,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  practiceName: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: COLORS.textPrimary,
    margin: 0,
  },
  acceptingBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 10px',
    backgroundColor: COLORS.successLight,
    color: COLORS.success,
    borderRadius: BorderRadius.full,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.medium,
    marginTop: '6px',
  },

  // Hours section
  hoursSection: {
    padding: '16px',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: BorderRadius.md,
  },
  hoursTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: COLORS.textPrimary,
    margin: '0 0 12px 0',
  },
  hoursGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  hoursRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hoursDay: {
    fontSize: Typography.fontSize.sm,
    color: COLORS.textSecondary,
  },
  hoursTime: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: COLORS.textPrimary,
  },
  hoursClosed: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: COLORS.error,
  },

  // Toggle list
  toggleList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  toggleItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: BorderRadius.sm,
  },
  toggleInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  toggleLabel: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: COLORS.textPrimary,
  },
  toggleDescription: {
    fontSize: Typography.fontSize.xs,
    color: COLORS.textTertiary,
  },
  toggle: {
    position: 'relative',
    width: '44px',
    height: '24px',
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 150ms ease',
    padding: 0,
  },
  toggleKnob: {
    position: 'absolute',
    top: '2px',
    left: '2px',
    width: '20px',
    height: '20px',
    backgroundColor: COLORS.cardWhite,
    borderRadius: '50%',
    boxShadow: Shadows.sm,
    transition: 'transform 150ms ease',
  },

  // Save section
  saveSection: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '16px',
    marginTop: '8px',
    paddingTop: '20px',
    borderTop: `1px solid ${COLORS.border}`,
  },
  saveSuccess: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    backgroundColor: COLORS.successLight,
    color: COLORS.success,
    borderRadius: BorderRadius.sm,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
  },
  saveButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    backgroundColor: COLORS.teal,
    color: COLORS.cardWhite,
    border: 'none',
    borderRadius: BorderRadius.md,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    cursor: 'pointer',
    transition: 'all 150ms ease',
    boxShadow: Shadows.md,
  },
};
