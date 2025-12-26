import { createContext } from 'react';

import type { MainLayoutContextVal } from '../../../../../core/interfaces';

export const MainLayoutContext = createContext<MainLayoutContextVal | null>(null);
