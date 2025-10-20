'use client';

import { FormGroup } from '@lobehub/ui';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { FORM_STYLE } from '@/const/layoutTokens';

import ContextsList from './features/ContextsList';
import ExperiencesList from './features/ExperiencesList';
import IdentitiesList from './features/IdentitiesList';
import MemoryTabs, { MemoryCategory } from './features/MemoryTabs';
import PreferencesList from './features/PreferencesList';

const Client = memo<{ mobile?: boolean }>(({ mobile }) => {
  const { t } = useTranslation('auth');
  const [activeCategory, setActiveCategory] = useState<MemoryCategory>('all');

  const renderList = () => {
    if (activeCategory === 'all') {
      return (
        <Flexbox gap={24}>
          <FormGroup style={FORM_STYLE.style} title={'Contexts'} variant={'borderless'}>
            <ContextsList mobile={mobile} />
          </FormGroup>
          <FormGroup style={FORM_STYLE.style} title={'Preferences'} variant={'borderless'}>
            <PreferencesList mobile={mobile} />
          </FormGroup>
          <FormGroup style={FORM_STYLE.style} title={'Identities'} variant={'borderless'}>
            <IdentitiesList mobile={mobile} />
          </FormGroup>
          <FormGroup style={FORM_STYLE.style} title={'Experiences'} variant={'borderless'}>
            <ExperiencesList mobile={mobile} />
          </FormGroup>
        </Flexbox>
      );
    }

    switch (activeCategory) {
      case 'contexts':
        return <ContextsList mobile={mobile} />;
      case 'preferences':
        return <PreferencesList mobile={mobile} />;
      case 'identities':
        return <IdentitiesList mobile={mobile} />;
      case 'experiences':
        return <ExperiencesList mobile={mobile} />;
      default:
        return null;
    }
  };

  return (
    <Flexbox gap={mobile ? 0 : 24}>
      <MemoryTabs onChange={setActiveCategory} value={activeCategory} />

      {renderList()}
    </Flexbox>
  );
});

export default Client;
