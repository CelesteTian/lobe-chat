import { Grid } from '@lobehub/ui';
import { Empty } from 'antd';
import { memo } from 'react';

import { useUserMemoryStore } from '@/store/userMemory';

import MemoryCard from './MemoryCard';

const PreferencesList = memo<{ mobile?: boolean }>(({ mobile }) => {
  const { data: preferences, isLoading } = useUserMemoryStore((s) => s.useFetchPreferences());

  if (isLoading) return <div>Loading preferences...</div>;

  if (!preferences || preferences.length === 0) {
    return <Empty description="No preferences found" />;
  }

  return (
    <Grid gap={16} rows={mobile ? 1 : 3}>
        {preferences.map((preference) => {
          const labels = [
            ...(Array.isArray(preference.labels) ? preference.labels : []),
            ...(Array.isArray(preference.extractedLabels) ? preference.extractedLabels : []),
          ] as string[];

          return (
            <MemoryCard
              key={preference.id}
              content={
                <>
                  {preference.conclusionDirectives && <div>{preference.conclusionDirectives}</div>}
                  {preference.suggestions && (
                    <div style={{ marginTop: 8 }}>
                      <strong>Suggestions:</strong> {preference.suggestions}
                    </div>
                  )}
                </>
              }
              footer={
                preference.scorePriority !== null && (
                  <div>Priority: {preference.scorePriority}</div>
                )
              }
              labels={labels}
              title={preference.type || 'Preference'}
              type="Preference"
            />
          );
        })}
    </Grid>
  );
});

export default PreferencesList;
