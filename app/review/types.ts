export interface GuideModule {
  id: number;
  title: string;
  intro: string[];
  sections: {
    title: string;
    bullets: string[];
  }[];
}
