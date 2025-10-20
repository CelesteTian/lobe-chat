import { Grid } from '@lobehub/ui';
import { Empty } from 'antd';
import { memo } from 'react';

import { useUserMemoryStore } from '@/store/userMemory';

import MemoryCard from './MemoryCard';

const ExperiencesList = memo<{ mobile?: boolean }>(({ mobile }) => {
  const { data: experiences, isLoading } = useUserMemoryStore((s) => s.useFetchExperiences());

  if (isLoading) return <div>Loading experiences...</div>;

  if (!experiences || experiences.length === 0) {
    return <Empty description="No experiences found" />;
  }

  return (
    <Grid gap={16} rows={mobile ? 1 : 3}>
        {experiences.map((experience) => {
          const labels = [
            ...(Array.isArray(experience.labels) ? experience.labels : []),
            ...(Array.isArray(experience.extractedLabels) ? experience.extractedLabels : []),
          ] as string[];

          return (
            <MemoryCard
              key={experience.id}
              content={
                <>
                  {experience.situation && (
                    <div>
                      <strong>Situation:</strong> {experience.situation}
                    </div>
                  )}
                  {experience.reasoning && (
                    <div style={{ marginTop: 8 }}>
                      <strong>Reasoning:</strong> {experience.reasoning}
                    </div>
                  )}
                  {experience.action && (
                    <div style={{ marginTop: 8 }}>
                      <strong>Action:</strong> {experience.action}
                    </div>
                  )}
                  {experience.possibleOutcome && (
                    <div style={{ marginTop: 8 }}>
                      <strong>Possible Outcome:</strong> {experience.possibleOutcome}
                    </div>
                  )}
                  {experience.keyLearning && (
                    <div style={{ marginTop: 8 }}>
                      <strong>Key Learning:</strong> {experience.keyLearning}
                    </div>
                  )}
                </>
              }
              footer={
                experience.scoreConfidence !== null && (
                  <div>Confidence: {experience.scoreConfidence}</div>
                )
              }
              labels={labels}
              title={experience.type || 'Experience'}
              type="Experience"
            />
          );
        })}
    </Grid>
  );
});

export default ExperiencesList;
