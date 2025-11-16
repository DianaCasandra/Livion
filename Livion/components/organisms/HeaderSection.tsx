import { motion } from 'framer-motion';
import { ThemedText } from '../../components/atoms/ThemedText';

interface HeaderSectionProps {
  patientName: string;
}

export const HeaderSection = ({ patientName }: HeaderSectionProps) => (
  <motion.header
    initial={{ opacity: 0, y: -24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
    className="mb-10"
  >
    <ThemedText variant="caption" color="tertiary" className="uppercase tracking-[0.3rem]">
      Daily Pulse
    </ThemedText>
    <ThemedText variant="display" weight="bold" className="mt-3 text-white">
      Welcome back, {patientName}
    </ThemedText>
    <ThemedText variant="subtitle" color="secondary" className="mt-3 max-w-xl text-balance">
      Your care team curated today’s insights and gentle nudges just for you. Keep your rhythm steady.
    </ThemedText>
  </motion.header>
);
