//import clsx from 'clsx';
import { motion } from 'framer-motion';
import { ThemedText } from '../atoms/ThemedText';
import { CareTaskTile } from '../molecules/CareTaskTile';

interface CareTask {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'completed' | 'due' | 'overdue';
}

interface CareTasksSectionProps {
  tasks: CareTask[];
}

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const CareTasksSection = ({ tasks }: CareTasksSectionProps) => {
  const remaining = tasks.filter((task) => task.status !== 'completed').length;

  return (
    <section className="mt-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.22, ease }}
        className="flex flex-col gap-2"
      >
        {/* Înlocuiește className cu style */}
        <ThemedText 
          variant="heading" 
          weight="semibold" 
          style={{ color: 'white' }}
        >
          Today’s Tasks
        </ThemedText>
        <ThemedText variant="caption" color="tertiary">
          {remaining} remaining
        </ThemedText>
      </motion.div>

      <div className="mt-6 grid gap-5">
        {tasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.24, ease, delay: index * 0.08 }}
           // className={clsx(index > 0 && 'mt-2')}
          >
            <CareTaskTile
              title={task.title}
              description={task.description}
              dueDate={new Date(task.dueDate)}
              status={task.status}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};