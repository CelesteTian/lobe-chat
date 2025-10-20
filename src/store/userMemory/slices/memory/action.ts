import { SWRResponse } from 'swr';
import { StateCreator } from 'zustand/vanilla';

import {
  UserMemoryContext,
  UserMemoryExperience,
  UserMemoryIdentity,
  UserMemoryItem,
  UserMemoryPreference,
} from '@/database/schemas/userMemories';
import { useClientDataSWR } from '@/libs/swr';
import { lambdaClient } from '@/libs/trpc/client';

import { UserMemoryStore } from '../../store';

export interface MemoryAction {
  useFetchContexts: () => SWRResponse<UserMemoryContext[]>;
  useFetchExperiences: () => SWRResponse<UserMemoryExperience[]>;
  useFetchIdentities: () => SWRResponse<UserMemoryIdentity[]>;
  useFetchMemories: () => SWRResponse<UserMemoryItem[]>;
  useFetchMemoryCount: () => SWRResponse<number>;
  useFetchPreferences: () => SWRResponse<UserMemoryPreference[]>;
}

const FETCH_MEMORIES_KEY = 'useFetchMemories';
const FETCH_MEMORY_COUNT_KEY = 'useFetchMemoryCount';
const FETCH_CONTEXTS_KEY = 'useFetchContexts';
const FETCH_PREFERENCES_KEY = 'useFetchPreferences';
const FETCH_IDENTITIES_KEY = 'useFetchIdentities';
const FETCH_EXPERIENCES_KEY = 'useFetchExperiences';

export const createMemorySlice: StateCreator<
  UserMemoryStore,
  [['zustand/devtools', never]],
  [],
  MemoryAction
> = (set, get) => ({
  useFetchContexts: () =>
    useClientDataSWR<UserMemoryContext[]>(FETCH_CONTEXTS_KEY, () =>
      lambdaClient.userMemory.getContexts.query(),
    ),

  useFetchExperiences: () =>
    useClientDataSWR<UserMemoryExperience[]>(FETCH_EXPERIENCES_KEY, () =>
      lambdaClient.userMemory.getExperiences.query(),
    ),

  useFetchIdentities: () =>
    useClientDataSWR<UserMemoryIdentity[]>(FETCH_IDENTITIES_KEY, () =>
      lambdaClient.userMemory.getIdentities.query(),
    ),

  useFetchMemories: () =>
    useClientDataSWR<UserMemoryItem[]>(FETCH_MEMORIES_KEY, () =>
      lambdaClient.userMemory.getMemories.query(),
    ),

  useFetchMemoryCount: () =>
    useClientDataSWR<number>(FETCH_MEMORY_COUNT_KEY, () =>
      lambdaClient.userMemory.countMemories.query(),
    ),

  useFetchPreferences: () =>
    useClientDataSWR<UserMemoryPreference[]>(FETCH_PREFERENCES_KEY, () =>
      lambdaClient.userMemory.getPreferences.query(),
    ),
});
