/**
 * Schedule - Full calendar and appointments page
 */

import { PageLayout } from '../components/layout/PageLayout';
import { Calendar } from '../components/Calendar';

export function Schedule() {
  return (
    <PageLayout
      activePage="schedule"
      title="Schedule"
      subtitle="Manage your appointments and availability"
      showBackButton
    >
      <Calendar />
    </PageLayout>
  );
}
