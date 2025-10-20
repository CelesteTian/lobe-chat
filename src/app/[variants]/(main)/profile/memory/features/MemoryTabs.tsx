'use client';

import { Segmented } from 'antd';
import { createStyles } from 'antd-style';
import { BookmarkCheck, Brain, Lightbulb, Target, LayoutGrid } from 'lucide-react';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

const useStyles = createStyles(({ css, token }) => ({
  container: css`
    padding: 16px 0;
  `,
  segmented: css`
    .ant-segmented-item-label {
      display: flex;
      align-items: center;
      gap: 8px;
      min-height: 32px;
    }
  `,
}));

export type MemoryCategory = 'all' | 'contexts' | 'preferences' | 'identities' | 'experiences';

interface MemoryTabsProps {
  onChange: (category: MemoryCategory) => void;
  value: MemoryCategory;
}

const MemoryTabs = memo<MemoryTabsProps>(({ value, onChange }) => {
  const { styles } = useStyles();

  return (
    <Flexbox className={styles.container} horizontal justify={'center'}>
      <Segmented
        className={styles.segmented}
        onChange={onChange as any}
        options={[
          {
            icon: <LayoutGrid size={16} />,
            label: 'All',
            value: 'all',
          },
          {
            icon: <Target size={16} />,
            label: 'Contexts',
            value: 'contexts',
          },
          {
            icon: <BookmarkCheck size={16} />,
            label: 'Preferences',
            value: 'preferences',
          },
          {
            icon: <Brain size={16} />,
            label: 'Identities',
            value: 'identities',
          },
          {
            icon: <Lightbulb size={16} />,
            label: 'Experiences',
            value: 'experiences',
          },
        ]}
        size="large"
        value={value}
      />
    </Flexbox>
  );
});

export default MemoryTabs;
