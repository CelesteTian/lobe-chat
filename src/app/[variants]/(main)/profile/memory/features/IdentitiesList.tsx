import { Grid } from '@lobehub/ui';
import { Empty } from 'antd';
import { memo } from 'react';

import { useUserMemoryStore } from '@/store/userMemory';

import MemoryCard from './MemoryCard';

const IdentitiesList = memo<{ mobile?: boolean }>(({ mobile }) => {
  const { data: identities, isLoading } = useUserMemoryStore((s) => s.useFetchIdentities());

  if (isLoading) return <div>Loading identities...</div>;

  if (!identities || identities.length === 0) {
    return <Empty description="No identities found" />;
  }

  return (
    <Grid gap={16} rows={mobile ? 1 : 3}>
        {identities.map((identity) => {
          const labels = [
            ...(Array.isArray(identity.labels) ? identity.labels : []),
            ...(Array.isArray(identity.extractedLabels) ? identity.extractedLabels : []),
          ] as string[];

          return (
            <MemoryCard
              key={identity.id}
              content={
                <>
                  {identity.description && <div>{identity.description}</div>}
                  {identity.role && (
                    <div style={{ marginTop: 8 }}>
                      <strong>Role:</strong> {identity.role}
                    </div>
                  )}
                  {identity.relationship && (
                    <div style={{ marginTop: 4 }}>
                      <strong>Relationship:</strong> {identity.relationship}
                    </div>
                  )}
                  {identity.experience && (
                    <div style={{ marginTop: 4 }}>
                      <strong>Experience:</strong> {identity.experience}
                    </div>
                  )}
                  {identity.currentFocuses && (
                    <div style={{ marginTop: 4 }}>
                      <strong>Current Focuses:</strong> {identity.currentFocuses}
                    </div>
                  )}
                </>
              }
              labels={labels}
              title={identity.type || 'Identity'}
              type="Identity"
            />
          );
        })}
    </Grid>
  );
});

export default IdentitiesList;
