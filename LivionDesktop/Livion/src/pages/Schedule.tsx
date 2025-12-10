/**
 * Schedule - Full calendar and appointments page
 */

import { PageLayout } from '../components/layout/PageLayout';
import { Calendar } from '../components/Calendar';

export function Schedule() {
  return (
    <PageLayout
      activePage="schedule"
      title="Program"
      subtitle="Gestionați programările și disponibilitatea dumneavoastră"
      showBackButton
    >
      <Calendar />
    </PageLayout>
  );
}
