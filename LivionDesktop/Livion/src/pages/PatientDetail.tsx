/**
 * PatientDetail - Comprehensive patient view with tabs
 * Shows medical records, lab results, imaging, and consultations with AI summaries
 */

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FileText,
  TestTube,
  Image as ImageIcon,
  Video,
  Clock,
  Calendar,
  ChevronRight,
  Download,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Activity,
  AlertTriangle,
  User,
  Phone,
  Mail,
  MapPin,
  Pill,
  Stethoscope,
  Brain,
  Send,
  X,
  FileSignature,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  Settings,
} from 'lucide-react';
import { PageLayout } from '../components/layout/PageLayout';
import { GlassCard } from '../components/GlassCard';
import { COLORS, Typography, BorderRadius, Shadows } from '../constants/colors';
import { PATIENTS, getPatientById, PATIENT_DETAILS, areVitalsStale, formatVitalsTimestamp } from '../constants/patientDetailData';
import type { PatientStatus } from '../constants/statusConfig';

type TabId = 'overview' | 'records' | 'labs' | 'imaging' | 'consultations';

const tabs: { id: TabId; label: string; icon: typeof FileText }[] = [
  { id: 'overview', label: 'Prezentare', icon: User },
  { id: 'records', label: 'Fișă Medicală', icon: FileText },
  { id: 'labs', label: 'Analize', icon: TestTube },
  { id: 'imaging', label: 'Imagistică', icon: ImageIcon },
  { id: 'consultations', label: 'Consultații', icon: Video },
];

const statusConfig: Record<PatientStatus, { color: string; bgColor: string; label: string }> = {
  stable: { color: COLORS.success, bgColor: COLORS.successLight, label: 'Stabil' },
  attention: { color: COLORS.warning, bgColor: COLORS.warningLight, label: 'Atenție' },
  critical: { color: COLORS.error, bgColor: COLORS.errorLight, label: 'Critic' },
};

// Mock: In a real app, this would come from a context/store
const hasDigitalCertificate = false;

export function PatientDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [showSignatureWarning, setShowSignatureWarning] = useState(false);

  const patient = id ? getPatientById(id) : null;
  const details = id ? PATIENT_DETAILS[id] : null;

  const handleSendPrescription = () => {
    if (!hasDigitalCertificate) {
      setShowSignatureWarning(true);
    } else {
      setShowPrescriptionModal(true);
    }
  };

  if (!patient || !details) {
    return (
      <PageLayout
        activePage="patients"
        title="Pacient Negăsit"
        showBackButton
      >
        <GlassCard padding="lg" style={styles.notFound}>
          <User size={48} color={COLORS.textTertiary} />
          <h2 style={styles.notFoundTitle}>Pacient negăsit</h2>
          <p style={styles.notFoundText}>Pacientul pe care îl căutați nu există.</p>
          <button style={styles.backButton} onClick={() => navigate('/patients')}>
            Înapoi la Pacienți
          </button>
        </GlassCard>
      </PageLayout>
    );
  }

  const status = statusConfig[patient.status];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab patient={patient} details={details} />;
      case 'records':
        return <RecordsTab records={details.medicalRecords} />;
      case 'labs':
        return <LabsTab labs={details.labResults} />;
      case 'imaging':
        return <ImagingTab imaging={details.imaging} />;
      case 'consultations':
        return <ConsultationsTab consultations={details.consultations} />;
      default:
        return null;
    }
  };

  return (
    <PageLayout
      activePage="patients"
      title={patient.name}
      subtitle={`${patient.age} ani • ${patient.condition}`}
      showBackButton
    >
      {/* Missing Certificate Banner */}
      {!hasDigitalCertificate && (
        <div
          style={styles.certificateBanner}
          onClick={() => navigate('/settings')}
        >
          <div style={styles.certificateBannerContent}>
            <AlertCircle size={20} color={COLORS.amber} />
            <div style={styles.certificateBannerText}>
              <span style={styles.certificateBannerTitle}>Certificat digital neconfigurat</span>
              <span style={styles.certificateBannerSubtitle}>
                Trebuie să încărcați certificatul digital pentru a trimite rețete și documente medicale.
              </span>
            </div>
          </div>
          <div style={styles.certificateBannerAction}>
            <Settings size={16} />
            <span>Mergi la Setări</span>
            <ChevronRight size={16} />
          </div>
        </div>
      )}

      {/* Patient header card */}
      <GlassCard padding="md" style={styles.headerCard}>
        <div style={styles.headerContent}>
          <div style={styles.patientAvatar}>
            <span style={styles.avatarText}>{patient.initials}</span>
          </div>
          <div style={styles.patientInfo}>
            <div style={styles.nameRow}>
              <h2 style={styles.patientName}>{patient.name}</h2>
              <div style={{ ...styles.statusBadge, backgroundColor: status.bgColor, color: status.color }}>
                {status.label}
              </div>
              {patient.aiInsight && (
                <div style={styles.aiTag}>
                  <Sparkles size={12} />
                  <span>Analize AI Disponibile</span>
                </div>
              )}
            </div>
            <div style={styles.contactRow}>
              <span style={styles.contactItem}>
                <Phone size={14} /> {details.contact.phone}
              </span>
              <span style={styles.contactItem}>
                <Mail size={14} /> {details.contact.email}
              </span>
              <span style={styles.contactItem}>
                <MapPin size={14} /> {details.contact.address}
              </span>
            </div>
          </div>
          <div style={styles.headerActions}>
            <button style={styles.actionBtn}>
              <Phone size={18} />
              Sună
            </button>
            <button
              style={{ ...styles.actionBtn, ...styles.actionBtnSecondary }}
              onClick={handleSendPrescription}
            >
              <FileSignature size={18} />
              Trimite Rețetă
            </button>
            <button style={{ ...styles.actionBtn, ...styles.actionBtnPrimary }}>
              <Video size={18} />
              Începe Consultația
            </button>
          </div>
        </div>
      </GlassCard>

      {/* Tabs */}
      <div style={styles.tabsContainer}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              style={{
                ...styles.tab,
                ...(isActive && styles.tabActive),
              }}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={18} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div style={styles.tabContent}>
        {renderTabContent()}
      </div>

      {/* Prescription Modal */}
      {showPrescriptionModal && (
        <PrescriptionModal
          patient={patient}
          onClose={() => setShowPrescriptionModal(false)}
        />
      )}

      {/* Certificate Warning Modal */}
      {showSignatureWarning && (
        <div style={styles.modalOverlay} onClick={() => setShowSignatureWarning(false)}>
          <div style={styles.warningModalContent} onClick={e => e.stopPropagation()}>
            <div style={styles.warningIcon}>
              <AlertCircle size={48} color={COLORS.amber} />
            </div>
            <h2 style={styles.warningTitle}>Digital Certificate Required</h2>
            <p style={styles.warningText}>
              You need to upload your digital certificate before you can send prescriptions or medical documents to patients.
            </p>
            <div style={styles.warningActions}>
              <button
                style={styles.warningCancelBtn}
                onClick={() => setShowSignatureWarning(false)}
              >
                Cancel
              </button>
              <button
                style={styles.warningSettingsBtn}
                onClick={() => {
                  setShowSignatureWarning(false);
                  navigate('/settings');
                }}
              >
                <Settings size={16} />
                Go to Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
}

// ============ TAB COMPONENTS ============

interface OverviewTabProps {
  patient: typeof PATIENTS[0];
  details: typeof PATIENT_DETAILS[string];
}

function OverviewTab({ patient, details }: OverviewTabProps) {
  const isStale = areVitalsStale(patient.vitals.timestamp);
  const vitalsLabel = isStale ? 'Last Vitals' : 'Current Vitals';
  const vitalsColor = isStale ? COLORS.warning : COLORS.success;

  return (
    <div style={styles.overviewGrid}>
      {/* Vitals card */}
      <GlassCard padding="md" style={styles.vitalsCard}>
        <div style={styles.vitalsHeader}>
          <h3 style={styles.cardTitle}>
            <Activity size={18} color={vitalsColor} />
            {vitalsLabel}
          </h3>
          <div style={{
            ...styles.vitalsTimestamp,
            backgroundColor: isStale ? COLORS.warningLight : COLORS.successLight,
            color: isStale ? COLORS.warning : COLORS.success,
          }}>
            <Clock size={12} />
            <span>{formatVitalsTimestamp(patient.vitals.timestamp)}</span>
          </div>
        </div>
        <div style={styles.vitalsGrid}>
          <div style={styles.vitalItem}>
            <span style={styles.vitalLabel}>Blood Pressure</span>
            <span style={styles.vitalValue}>{patient.vitals.bp}</span>
          </div>
          <div style={styles.vitalItem}>
            <span style={styles.vitalLabel}>Heart Rate</span>
            <span style={styles.vitalValue}>{patient.vitals.hr} bpm</span>
          </div>
          <div style={styles.vitalItem}>
            <span style={styles.vitalLabel}>Temperature</span>
            <span style={styles.vitalValue}>{patient.vitals.temp}°F</span>
          </div>
          <div style={styles.vitalItem}>
            <span style={styles.vitalLabel}>O₂ Saturation</span>
            <span style={styles.vitalValue}>{patient.vitals.o2}</span>
          </div>
        </div>
      </GlassCard>

      {/* AI Insights */}
      {patient.aiInsight && (
        <GlassCard padding="md" style={styles.aiCard}>
          <h3 style={styles.cardTitle}>
            <Sparkles size={18} color={COLORS.purple} />
            AI Analysis
          </h3>
          <div style={styles.aiContent}>
            <div style={styles.aiTrend}>
              {patient.aiInsight.trend === 'improving' ? (
                <TrendingUp size={20} color={COLORS.success} />
              ) : patient.aiInsight.trend === 'declining' ? (
                <TrendingDown size={20} color={COLORS.error} />
              ) : (
                <Activity size={20} color={COLORS.blue} />
              )}
              <span style={{
                color: patient.aiInsight.trend === 'improving' ? COLORS.success :
                       patient.aiInsight.trend === 'declining' ? COLORS.error : COLORS.blue,
                fontWeight: Typography.fontWeight.semibold,
                textTransform: 'capitalize',
              }}>
                {patient.aiInsight.trend}
              </span>
            </div>
            <p style={styles.aiSummary}>{patient.aiInsight.summary}</p>
            <div style={styles.aiRecommendation}>
              <strong>Recommendation:</strong> {patient.aiInsight.recommendation}
            </div>
          </div>
        </GlassCard>
      )}

      {/* Current Medications */}
      <GlassCard padding="md" style={styles.medicationsCard}>
        <h3 style={styles.cardTitle}>
          <Pill size={18} color={COLORS.amber} />
          Current Medications
        </h3>
        <div style={styles.medicationsList}>
          {details.medications.map((med, idx) => (
            <div key={idx} style={styles.medicationItem}>
              <div style={styles.medInfo}>
                <span style={styles.medName}>{med.name}</span>
                <span style={styles.medDosage}>{med.dosage}</span>
              </div>
              <span style={styles.medFrequency}>{med.frequency}</span>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Allergies & Conditions */}
      <GlassCard padding="md" style={styles.conditionsCard}>
        <h3 style={styles.cardTitle}>
          <AlertTriangle size={18} color={COLORS.error} />
          Allergies & Conditions
        </h3>
        <div style={styles.tagsList}>
          {details.allergies.map((allergy, idx) => (
            <span key={idx} style={styles.allergyTag}>{allergy}</span>
          ))}
          {details.conditions.map((condition, idx) => (
            <span key={idx} style={styles.conditionTag}>{condition}</span>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

interface RecordsTabProps {
  records: typeof PATIENT_DETAILS[string]['medicalRecords'];
}

function RecordsTab({ records }: RecordsTabProps) {
  return (
    <GlassCard padding="md">
      <h3 style={styles.sectionTitle}>Medical Records</h3>
      <div style={styles.recordsList}>
        {records.map((record) => (
          <div key={record.id} style={styles.recordItem}>
            <div style={styles.recordIcon}>
              <FileText size={20} color={COLORS.teal} />
            </div>
            <div style={styles.recordInfo}>
              <span style={styles.recordTitle}>{record.title}</span>
              <span style={styles.recordMeta}>
                {record.type} • {record.date} • Dr. {record.doctor}
              </span>
              {record.summary && (
                <p style={styles.recordSummary}>{record.summary}</p>
              )}
            </div>
            <button style={styles.downloadBtn}>
              <Download size={16} />
            </button>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

interface LabsTabProps {
  labs: typeof PATIENT_DETAILS[string]['labResults'];
}

function LabsTab({ labs }: LabsTabProps) {
  return (
    <GlassCard padding="md">
      <h3 style={styles.sectionTitle}>Laboratory Results</h3>
      <div style={styles.labsList}>
        {labs.map((lab) => (
          <div key={lab.id} style={styles.labItem}>
            <div style={styles.labHeader}>
              <div style={styles.labIcon}>
                <TestTube size={20} color={COLORS.blue} />
              </div>
              <div style={styles.labInfo}>
                <span style={styles.labTitle}>{lab.testName}</span>
                <span style={styles.labDate}>{lab.date}</span>
              </div>
              <div style={{
                ...styles.labStatus,
                backgroundColor: lab.status === 'normal' ? COLORS.successLight :
                                 lab.status === 'abnormal' ? COLORS.errorLight : COLORS.warningLight,
                color: lab.status === 'normal' ? COLORS.success :
                       lab.status === 'abnormal' ? COLORS.error : COLORS.warning,
              }}>
                {lab.status}
              </div>
            </div>
            <div style={styles.labResults}>
              {lab.results.map((result, idx) => (
                <div key={idx} style={styles.labResultItem}>
                  <span style={styles.resultName}>{result.name}</span>
                  <span style={{
                    ...styles.resultValue,
                    color: result.flag === 'high' ? COLORS.error :
                           result.flag === 'low' ? COLORS.warning : COLORS.textPrimary,
                  }}>
                    {result.value} {result.unit}
                    {result.flag && <span style={styles.resultFlag}> ({result.flag})</span>}
                  </span>
                  <span style={styles.resultRange}>Ref: {result.reference}</span>
                </div>
              ))}
            </div>
            {lab.aiInterpretation && (
              <div style={styles.labAI}>
                <Sparkles size={14} color={COLORS.purple} />
                <span>{lab.aiInterpretation}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

interface ImagingTabProps {
  imaging: typeof PATIENT_DETAILS[string]['imaging'];
}

function ImagingTab({ imaging }: ImagingTabProps) {
  return (
    <GlassCard padding="md">
      <h3 style={styles.sectionTitle}>Imaging Studies</h3>
      <div style={styles.imagingGrid}>
        {imaging.map((study) => (
          <div key={study.id} style={styles.imagingItem}>
            <div style={styles.imagingPreview}>
              {study.type === 'MRI' ? (
                <Brain size={48} color={COLORS.purple} />
              ) : study.type === 'X-Ray' ? (
                <Stethoscope size={48} color={COLORS.blue} />
              ) : (
                <ImageIcon size={48} color={COLORS.teal} />
              )}
            </div>
            <div style={styles.imagingInfo}>
              <span style={styles.imagingType}>{study.type}</span>
              <span style={styles.imagingTitle}>{study.title}</span>
              <span style={styles.imagingDate}>{study.date}</span>
              {study.findings && (
                <p style={styles.imagingFindings}>{study.findings}</p>
              )}
              {study.aiAnalysis && (
                <div style={styles.imagingAI}>
                  <Sparkles size={12} color={COLORS.purple} />
                  <span>{study.aiAnalysis}</span>
                </div>
              )}
            </div>
            <button style={styles.viewBtn}>
              <ChevronRight size={16} />
              View
            </button>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

interface ConsultationsTabProps {
  consultations: typeof PATIENT_DETAILS[string]['consultations'];
}

function ConsultationsTab({ consultations }: ConsultationsTabProps) {
  return (
    <GlassCard padding="md">
      <h3 style={styles.sectionTitle}>Consultation History</h3>
      <div style={styles.consultationsList}>
        {consultations.map((consultation) => (
          <div key={consultation.id} style={styles.consultationItem}>
            <div style={styles.consultationHeader}>
              <div style={styles.consultationIcon}>
                <Video size={20} color={COLORS.teal} />
              </div>
              <div style={styles.consultationInfo}>
                <span style={styles.consultationTitle}>{consultation.title}</span>
                <span style={styles.consultationMeta}>
                  <Calendar size={12} /> {consultation.date}
                  <Clock size={12} style={{ marginLeft: '12px' }} /> {consultation.duration} min
                </span>
              </div>
              <div style={{
                ...styles.consultationType,
                backgroundColor: consultation.type === 'video' ? COLORS.tealLight :
                                 consultation.type === 'in-person' ? COLORS.blueLight : COLORS.purpleLight,
                color: consultation.type === 'video' ? COLORS.tealDark :
                       consultation.type === 'in-person' ? COLORS.blue : COLORS.purple,
              }}>
                {consultation.type === 'video' && <Video size={12} />}
                {consultation.type}
              </div>
            </div>

            {/* AI Summary */}
            <div style={styles.aiSummarySection}>
              <div style={styles.aiSummaryHeader}>
                <Sparkles size={16} color={COLORS.purple} />
                <span>AI Summary</span>
              </div>
              <p style={styles.aiSummaryText}>{consultation.aiSummary}</p>

              {consultation.keyPoints && consultation.keyPoints.length > 0 && (
                <div style={styles.keyPoints}>
                  <span style={styles.keyPointsTitle}>Key Points:</span>
                  <ul style={styles.keyPointsList}>
                    {consultation.keyPoints.map((point, idx) => (
                      <li key={idx} style={styles.keyPointItem}>{point}</li>
                    ))}
                  </ul>
                </div>
              )}

              {consultation.followUp && (
                <div style={styles.followUp}>
                  <Calendar size={14} color={COLORS.amber} />
                  <span>Follow-up: {consultation.followUp}</span>
                </div>
              )}
            </div>

            <div style={styles.consultationActions}>
              <button style={styles.consultationBtn}>
                <FileText size={14} />
                View Notes
              </button>
              <button style={styles.consultationBtn}>
                <Download size={14} />
                Export
              </button>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

// ============ PRESCRIPTION MODAL ============

interface PrescriptionMedication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

interface PrescriptionModalProps {
  patient: typeof PATIENTS[0];
  onClose: () => void;
}

function PrescriptionModal({ patient, onClose }: PrescriptionModalProps) {
  const [medications, setMedications] = useState<PrescriptionMedication[]>([
    { name: '', dosage: '', frequency: '', duration: '', instructions: '' }
  ]);
  const [diagnosis, setDiagnosis] = useState('');
  const [notes, setNotes] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  const addMedication = () => {
    setMedications([...medications, { name: '', dosage: '', frequency: '', duration: '', instructions: '' }]);
  };

  const removeMedication = (index: number) => {
    if (medications.length > 1) {
      setMedications(medications.filter((_, i) => i !== index));
    }
  };

  const updateMedication = (index: number, field: keyof PrescriptionMedication, value: string) => {
    const updated = [...medications];
    updated[index][field] = value;
    setMedications(updated);
  };

  const handleSend = () => {
    setIsSending(true);
    // Simulate sending
    setTimeout(() => {
      setIsSending(false);
      setSent(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    }, 1500);
  };

  const isValid = medications.some(m => m.name && m.dosage) && diagnosis;

  if (sent) {
    return (
      <div style={styles.modalOverlay} onClick={onClose}>
        <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
          <div style={styles.sentConfirmation}>
            <div style={styles.sentIcon}>
              <CheckCircle size={48} color={COLORS.success} />
            </div>
            <h2 style={styles.sentTitle}>Prescription Sent!</h2>
            <p style={styles.sentText}>
              The prescription has been sent to {patient.name} at their registered email and phone.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
        {/* Modal Header */}
        <div style={styles.modalHeader}>
          <div style={styles.modalTitleRow}>
            <FileSignature size={24} color={COLORS.teal} />
            <h2 style={styles.modalTitle}>New Prescription</h2>
          </div>
          <button style={styles.closeButton} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Patient Info */}
        <div style={styles.prescriptionPatient}>
          <div style={styles.prescriptionPatientAvatar}>
            <span>{patient.initials}</span>
          </div>
          <div>
            <span style={styles.prescriptionPatientName}>{patient.name}</span>
            <span style={styles.prescriptionPatientInfo}>
              {patient.age} years • {patient.condition}
            </span>
          </div>
        </div>

        {/* Form */}
        <div style={styles.prescriptionForm}>
          {/* Diagnosis */}
          <div style={styles.formSection}>
            <label style={styles.formLabel}>Diagnosis / Reason</label>
            <input
              type="text"
              value={diagnosis}
              onChange={e => setDiagnosis(e.target.value)}
              placeholder="e.g., Hypertension management, Upper respiratory infection"
              style={styles.formInput}
            />
          </div>

          {/* Medications */}
          <div style={styles.formSection}>
            <div style={styles.formLabelRow}>
              <label style={styles.formLabel}>Medications</label>
              <button style={styles.addMedButton} onClick={addMedication}>
                <Plus size={14} />
                Add Medication
              </button>
            </div>

            {medications.map((med, index) => (
              <div key={index} style={styles.medicationCard}>
                <div style={styles.medicationHeader}>
                  <span style={styles.medicationNumber}>Medication {index + 1}</span>
                  {medications.length > 1 && (
                    <button
                      style={styles.removeMedButton}
                      onClick={() => removeMedication(index)}
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
                <div style={styles.medicationGrid}>
                  <div style={styles.formGroup}>
                    <label style={styles.smallLabel}>Drug Name</label>
                    <input
                      type="text"
                      value={med.name}
                      onChange={e => updateMedication(index, 'name', e.target.value)}
                      placeholder="e.g., Amoxicillin"
                      style={styles.formInputSmall}
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.smallLabel}>Dosage</label>
                    <input
                      type="text"
                      value={med.dosage}
                      onChange={e => updateMedication(index, 'dosage', e.target.value)}
                      placeholder="e.g., 500mg"
                      style={styles.formInputSmall}
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.smallLabel}>Frequency</label>
                    <input
                      type="text"
                      value={med.frequency}
                      onChange={e => updateMedication(index, 'frequency', e.target.value)}
                      placeholder="e.g., Twice daily"
                      style={styles.formInputSmall}
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.smallLabel}>Duration</label>
                    <input
                      type="text"
                      value={med.duration}
                      onChange={e => updateMedication(index, 'duration', e.target.value)}
                      placeholder="e.g., 7 days"
                      style={styles.formInputSmall}
                    />
                  </div>
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.smallLabel}>Special Instructions</label>
                  <input
                    type="text"
                    value={med.instructions}
                    onChange={e => updateMedication(index, 'instructions', e.target.value)}
                    placeholder="e.g., Take with food, avoid alcohol"
                    style={styles.formInputSmall}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Additional Notes */}
          <div style={styles.formSection}>
            <label style={styles.formLabel}>Additional Notes (Optional)</label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Any additional instructions or notes for the patient..."
              style={styles.formTextarea}
              rows={3}
            />
          </div>
        </div>

        {/* Footer */}
        <div style={styles.modalFooter}>
          <div style={styles.signaturePreview}>
            <FileSignature size={16} color={COLORS.textTertiary} />
            <span>Will be signed as Dr. Sarah Harper, MD</span>
          </div>
          <div style={styles.modalActions}>
            <button style={styles.cancelButton} onClick={onClose}>
              Cancel
            </button>
            <button
              style={{
                ...styles.sendButton,
                opacity: isValid && !isSending ? 1 : 0.5,
                cursor: isValid && !isSending ? 'pointer' : 'not-allowed',
              }}
              onClick={handleSend}
              disabled={!isValid || isSending}
            >
              <Send size={16} />
              {isSending ? 'Sending...' : 'Send Prescription'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ STYLES ============

const styles: Record<string, React.CSSProperties> = {
  // Not found state
  notFound: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    padding: '60px',
  },
  notFoundTitle: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.semibold,
    color: COLORS.textPrimary,
    margin: 0,
  },
  notFoundText: {
    fontSize: Typography.fontSize.base,
    color: COLORS.textSecondary,
    margin: 0,
  },
  backButton: {
    padding: '12px 24px',
    backgroundColor: COLORS.teal,
    color: COLORS.cardWhite,
    border: 'none',
    borderRadius: BorderRadius.md,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
    cursor: 'pointer',
  },

  // Header card
  headerCard: {
    marginBottom: '8px',
  },
  headerContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  patientAvatar: {
    width: '72px',
    height: '72px',
    borderRadius: '50%',
    backgroundColor: COLORS.tealLight,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  avatarText: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: COLORS.teal,
  },
  patientInfo: {
    flex: 1,
  },
  nameRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '8px',
  },
  patientName: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: COLORS.textPrimary,
    margin: 0,
  },
  statusBadge: {
    padding: '4px 12px',
    borderRadius: BorderRadius.full,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
  },
  aiTag: {
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
  contactRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: Typography.fontSize.sm,
    color: COLORS.textSecondary,
  },
  headerActions: {
    display: 'flex',
    gap: '12px',
  },
  actionBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    border: `1px solid ${COLORS.border}`,
    borderRadius: BorderRadius.md,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: COLORS.textSecondary,
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  actionBtnPrimary: {
    backgroundColor: COLORS.teal,
    borderColor: COLORS.teal,
    color: COLORS.cardWhite,
  },
  actionBtnSecondary: {
    backgroundColor: COLORS.purpleLight,
    borderColor: COLORS.purple,
    color: COLORS.purple,
  },

  // Tabs
  tabsContainer: {
    display: 'flex',
    gap: '8px',
    padding: '4px',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: BorderRadius.lg,
    marginBottom: '16px',
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: BorderRadius.md,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: COLORS.textSecondary,
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  tabActive: {
    backgroundColor: COLORS.cardWhite,
    color: COLORS.teal,
    boxShadow: Shadows.sm,
  },
  tabContent: {
    flex: 1,
  },

  // Overview tab
  overviewGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
  },
  cardTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: COLORS.textPrimary,
    margin: 0,
  },
  vitalsCard: {},
  vitalsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  vitalsTimestamp: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    borderRadius: BorderRadius.full,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.medium,
  },
  vitalsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
  },
  vitalItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  vitalLabel: {
    fontSize: Typography.fontSize.sm,
    color: COLORS.textSecondary,
  },
  vitalValue: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: COLORS.textPrimary,
  },
  aiCard: {},
  aiContent: {},
  aiTrend: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '12px',
  },
  aiSummary: {
    fontSize: Typography.fontSize.base,
    color: COLORS.textPrimary,
    lineHeight: 1.6,
    margin: '0 0 12px 0',
  },
  aiRecommendation: {
    padding: '12px',
    backgroundColor: COLORS.purpleLight,
    borderRadius: BorderRadius.md,
    fontSize: Typography.fontSize.sm,
    color: COLORS.textPrimary,
    lineHeight: 1.5,
  },
  medicationsCard: {},
  medicationsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  medicationItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: BorderRadius.sm,
  },
  medInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  medName: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
    color: COLORS.textPrimary,
  },
  medDosage: {
    fontSize: Typography.fontSize.sm,
    color: COLORS.textSecondary,
  },
  medFrequency: {
    fontSize: Typography.fontSize.sm,
    color: COLORS.teal,
    fontWeight: Typography.fontWeight.medium,
  },
  conditionsCard: {},
  tagsList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  allergyTag: {
    padding: '6px 12px',
    backgroundColor: COLORS.errorLight,
    color: COLORS.error,
    borderRadius: BorderRadius.full,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
  },
  conditionTag: {
    padding: '6px 12px',
    backgroundColor: COLORS.blueLight,
    color: COLORS.blue,
    borderRadius: BorderRadius.full,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
  },

  // Section title
  sectionTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.semibold,
    color: COLORS.textPrimary,
    margin: '0 0 20px 0',
  },

  // Records tab
  recordsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  recordItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
    padding: '16px',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: BorderRadius.md,
    border: `1px solid ${COLORS.border}`,
  },
  recordIcon: {
    width: '44px',
    height: '44px',
    borderRadius: BorderRadius.sm,
    backgroundColor: COLORS.tealLight,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  recordInfo: {
    flex: 1,
  },
  recordTitle: {
    display: 'block',
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: COLORS.textPrimary,
    marginBottom: '4px',
  },
  recordMeta: {
    display: 'block',
    fontSize: Typography.fontSize.sm,
    color: COLORS.textSecondary,
    marginBottom: '8px',
  },
  recordSummary: {
    fontSize: Typography.fontSize.sm,
    color: COLORS.textSecondary,
    lineHeight: 1.5,
    margin: 0,
  },
  downloadBtn: {
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    border: `1px solid ${COLORS.border}`,
    borderRadius: BorderRadius.sm,
    color: COLORS.textSecondary,
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },

  // Labs tab
  labsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  labItem: {
    padding: '16px',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: BorderRadius.md,
    border: `1px solid ${COLORS.border}`,
  },
  labHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
  },
  labIcon: {
    width: '40px',
    height: '40px',
    borderRadius: BorderRadius.sm,
    backgroundColor: COLORS.blueLight,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labInfo: {
    flex: 1,
  },
  labTitle: {
    display: 'block',
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: COLORS.textPrimary,
  },
  labDate: {
    fontSize: Typography.fontSize.sm,
    color: COLORS.textSecondary,
  },
  labStatus: {
    padding: '4px 12px',
    borderRadius: BorderRadius.full,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.medium,
    textTransform: 'capitalize',
  },
  labResults: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
    marginBottom: '12px',
  },
  labResultItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    padding: '10px',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: BorderRadius.sm,
  },
  resultName: {
    fontSize: Typography.fontSize.sm,
    color: COLORS.textSecondary,
  },
  resultValue: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
  },
  resultFlag: {
    fontSize: Typography.fontSize.xs,
    textTransform: 'uppercase',
  },
  resultRange: {
    fontSize: Typography.fontSize.xs,
    color: COLORS.textTertiary,
  },
  labAI: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
    padding: '12px',
    backgroundColor: COLORS.purpleLight,
    borderRadius: BorderRadius.sm,
    fontSize: Typography.fontSize.sm,
    color: COLORS.purple,
    lineHeight: 1.5,
  },

  // Imaging tab
  imagingGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
  },
  imagingItem: {
    display: 'flex',
    flexDirection: 'column',
    padding: '16px',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: BorderRadius.md,
    border: `1px solid ${COLORS.border}`,
  },
  imagingPreview: {
    width: '100%',
    height: '140px',
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius: BorderRadius.sm,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '12px',
  },
  imagingInfo: {
    flex: 1,
  },
  imagingType: {
    display: 'inline-block',
    padding: '2px 8px',
    backgroundColor: COLORS.purpleLight,
    color: COLORS.purple,
    borderRadius: BorderRadius.sm,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.medium,
    marginBottom: '8px',
  },
  imagingTitle: {
    display: 'block',
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: COLORS.textPrimary,
    marginBottom: '4px',
  },
  imagingDate: {
    display: 'block',
    fontSize: Typography.fontSize.sm,
    color: COLORS.textSecondary,
    marginBottom: '8px',
  },
  imagingFindings: {
    fontSize: Typography.fontSize.sm,
    color: COLORS.textSecondary,
    lineHeight: 1.5,
    margin: '0 0 8px 0',
  },
  imagingAI: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '6px',
    padding: '8px',
    backgroundColor: COLORS.purpleLight,
    borderRadius: BorderRadius.sm,
    fontSize: Typography.fontSize.xs,
    color: COLORS.purple,
    lineHeight: 1.4,
  },
  viewBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    padding: '10px',
    backgroundColor: COLORS.tealLight,
    border: 'none',
    borderRadius: BorderRadius.sm,
    color: COLORS.tealDark,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    cursor: 'pointer',
    marginTop: '12px',
  },

  // Consultations tab
  consultationsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  consultationItem: {
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: BorderRadius.md,
    border: `1px solid ${COLORS.border}`,
  },
  consultationHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
  },
  consultationIcon: {
    width: '44px',
    height: '44px',
    borderRadius: BorderRadius.sm,
    backgroundColor: COLORS.tealLight,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  consultationInfo: {
    flex: 1,
  },
  consultationTitle: {
    display: 'block',
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: COLORS.textPrimary,
    marginBottom: '4px',
  },
  consultationMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: Typography.fontSize.sm,
    color: COLORS.textSecondary,
  },
  consultationType: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    borderRadius: BorderRadius.full,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    textTransform: 'capitalize',
  },
  aiSummarySection: {
    padding: '16px',
    backgroundColor: COLORS.purpleLight + '40',
    borderRadius: BorderRadius.md,
    marginBottom: '16px',
  },
  aiSummaryHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: COLORS.purple,
    marginBottom: '10px',
  },
  aiSummaryText: {
    fontSize: Typography.fontSize.base,
    color: COLORS.textPrimary,
    lineHeight: 1.6,
    margin: '0 0 12px 0',
  },
  keyPoints: {
    marginTop: '12px',
  },
  keyPointsTitle: {
    display: 'block',
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: COLORS.textSecondary,
    marginBottom: '8px',
  },
  keyPointsList: {
    margin: 0,
    paddingLeft: '20px',
  },
  keyPointItem: {
    fontSize: Typography.fontSize.sm,
    color: COLORS.textPrimary,
    marginBottom: '4px',
    lineHeight: 1.5,
  },
  followUp: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '12px',
    padding: '10px 12px',
    backgroundColor: COLORS.amberLight,
    borderRadius: BorderRadius.sm,
    fontSize: Typography.fontSize.sm,
    color: COLORS.amber,
    fontWeight: Typography.fontWeight.medium,
  },
  consultationActions: {
    display: 'flex',
    gap: '8px',
  },
  consultationBtn: {
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

  // Prescription Modal
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modalContent: {
    width: '100%',
    maxWidth: '640px',
    maxHeight: '90vh',
    backgroundColor: COLORS.cardWhite,
    borderRadius: BorderRadius.lg,
    boxShadow: Shadows.lg,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 24px',
    borderBottom: `1px solid ${COLORS.border}`,
  },
  modalTitleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  modalTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.semibold,
    color: COLORS.textPrimary,
    margin: 0,
  },
  closeButton: {
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: BorderRadius.sm,
    color: COLORS.textSecondary,
    cursor: 'pointer',
    transition: 'background-color 150ms ease',
  },
  prescriptionPatient: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px 24px',
    backgroundColor: COLORS.tealLight,
  },
  prescriptionPatientAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: COLORS.teal,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: COLORS.cardWhite,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
  },
  prescriptionPatientName: {
    display: 'block',
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: COLORS.textPrimary,
  },
  prescriptionPatientInfo: {
    display: 'block',
    fontSize: Typography.fontSize.sm,
    color: COLORS.textSecondary,
  },
  prescriptionForm: {
    flex: 1,
    padding: '24px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  formSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  formLabel: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: COLORS.textPrimary,
  },
  formLabelRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  formInput: {
    padding: '12px 14px',
    fontSize: Typography.fontSize.base,
    color: COLORS.textPrimary,
    backgroundColor: COLORS.cardWhite,
    border: `1px solid ${COLORS.border}`,
    borderRadius: BorderRadius.md,
    outline: 'none',
    transition: 'border-color 150ms ease',
  },
  formTextarea: {
    padding: '12px 14px',
    fontSize: Typography.fontSize.base,
    color: COLORS.textPrimary,
    backgroundColor: COLORS.cardWhite,
    border: `1px solid ${COLORS.border}`,
    borderRadius: BorderRadius.md,
    outline: 'none',
    resize: 'vertical',
    fontFamily: 'inherit',
    transition: 'border-color 150ms ease',
  },
  addMedButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    backgroundColor: COLORS.tealLight,
    border: 'none',
    borderRadius: BorderRadius.sm,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: COLORS.tealDark,
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  medicationCard: {
    padding: '16px',
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    borderRadius: BorderRadius.md,
    border: `1px solid ${COLORS.border}`,
    marginTop: '8px',
  },
  medicationHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  medicationNumber: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: COLORS.textSecondary,
  },
  removeMedButton: {
    width: '28px',
    height: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.errorLight,
    border: 'none',
    borderRadius: BorderRadius.sm,
    color: COLORS.error,
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  medicationGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
    marginBottom: '12px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  smallLabel: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.medium,
    color: COLORS.textSecondary,
  },
  formInputSmall: {
    padding: '8px 10px',
    fontSize: Typography.fontSize.sm,
    color: COLORS.textPrimary,
    backgroundColor: COLORS.cardWhite,
    border: `1px solid ${COLORS.border}`,
    borderRadius: BorderRadius.sm,
    outline: 'none',
    transition: 'border-color 150ms ease',
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 24px',
    borderTop: `1px solid ${COLORS.border}`,
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
  },
  signaturePreview: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: Typography.fontSize.sm,
    color: COLORS.textTertiary,
  },
  modalActions: {
    display: 'flex',
    gap: '12px',
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: 'transparent',
    border: `1px solid ${COLORS.border}`,
    borderRadius: BorderRadius.md,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: COLORS.textSecondary,
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  sendButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    backgroundColor: COLORS.teal,
    border: 'none',
    borderRadius: BorderRadius.md,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: COLORS.cardWhite,
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  sentConfirmation: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    padding: '60px 40px',
    textAlign: 'center',
  },
  sentIcon: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: COLORS.successLight,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sentTitle: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.semibold,
    color: COLORS.textPrimary,
    margin: 0,
  },
  sentText: {
    fontSize: Typography.fontSize.base,
    color: COLORS.textSecondary,
    margin: 0,
    maxWidth: '300px',
  },

  // Certificate Banner
  certificateBanner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 20px',
    backgroundColor: COLORS.amberLight,
    borderRadius: BorderRadius.md,
    border: `1px solid ${COLORS.amber}30`,
    marginBottom: '16px',
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  certificateBannerContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
  },
  certificateBannerText: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  certificateBannerTitle: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: COLORS.amber,
  },
  certificateBannerSubtitle: {
    fontSize: Typography.fontSize.xs,
    color: COLORS.textSecondary,
  },
  certificateBannerAction: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 14px',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: BorderRadius.sm,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: COLORS.amber,
  },

  // Warning Modal
  warningModalContent: {
    width: '100%',
    maxWidth: '420px',
    backgroundColor: COLORS.cardWhite,
    borderRadius: BorderRadius.lg,
    boxShadow: Shadows.lg,
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  warningIcon: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: COLORS.amberLight,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  warningTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.semibold,
    color: COLORS.textPrimary,
    margin: '0 0 12px 0',
  },
  warningText: {
    fontSize: Typography.fontSize.base,
    color: COLORS.textSecondary,
    lineHeight: 1.6,
    margin: '0 0 24px 0',
  },
  warningActions: {
    display: 'flex',
    gap: '12px',
    width: '100%',
  },
  warningCancelBtn: {
    flex: 1,
    padding: '12px 20px',
    backgroundColor: 'transparent',
    border: `1px solid ${COLORS.border}`,
    borderRadius: BorderRadius.md,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: COLORS.textSecondary,
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  warningSettingsBtn: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '12px 20px',
    backgroundColor: COLORS.amber,
    border: 'none',
    borderRadius: BorderRadius.md,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: COLORS.cardWhite,
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
};
