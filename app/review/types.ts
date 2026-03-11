import { ModuleKey } from '@/lib/types';

export interface GuideModule {
  moduleKey: ModuleKey;
  badge: string;
  title: string;
  overview: string[];
  sections: {
    title: string;
    bullets: string[];
  }[];
}
