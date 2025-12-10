/**
 * Patients - Full patient management page with AI diagnostics
 */

import { PageLayout } from '../components/layout/PageLayout';
import { PatientsList } from '../components/PatientsList';

export function Patients() {
  return (
    <PageLayout
      activePage="patients"
      title="Patients"
      subtitle="Manage your patients with AI-powered diagnostics"
      showBackButton
    >
      <PatientsList />
    </PageLayout>
  );
}
