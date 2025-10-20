import { UserMemoryItem } from '@/database/schemas/userMemories';

export interface UserMemoryStoreState {
  memories: UserMemoryItem[];
}

export const initialState: UserMemoryStoreState = {
  memories: [],
};
