/**
 * Patients - Full patient management page with AI diagnostics
 */

import { PageLayout } from '../components/layout/PageLayout';
import { PatientsList } from '../components/PatientsList';

export function Patients() {
  return (
    <PageLayout
      activePage="patients"
      title="Pacienți"
      subtitle="Gestionați pacienții cu diagnostice bazate pe AI"
      showBackButton
    >
      <PatientsList />
    </PageLayout>
  );
}
