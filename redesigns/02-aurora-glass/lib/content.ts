import raw from "@/content/source-content.json";

export type LinkRef = { label: string; href: string; icon?: string };

export type CTA = { label: string; href?: string; kind?: "primary" | "secondary" };


export type HomeSection =
  | { id: string; kind: "hero"; brand_mark: string; tagline: string }
  | { id: string; kind: "text-block"; heading: string; body_lead?: string; body: string }
  | { id: string; kind: "three-column"; heading: string; columns: { subheading: string; body: string }[] }
  | { id: string; kind: "two-column"; columns: { heading: string; body: string }[] }
  | { id: string; kind: "tagline-block"; lines: string[] };

export interface MasterclassCourse {
  id: string;
  title: string;
  description: string;
  details?: string[];
  ctas: CTA[];
}

export interface AnotherCometCourse {
  id: string;
  title: string;
  description: string;
  details?: string[];
  tag?: string;
  badge?: string;
  cta?: CTA;
}

export interface Mentor {
  id: string;
  name: string;
  role_attribution: string;
  bio: string;
  details: string;
  quote: string;
}

export interface JoinOption {
  id: string;
  title: string;
  body: string;
  cta: CTA;
  secondary_cta?: CTA;
}

export const content = raw as unknown as {
  source: { url: string; fetched_at: string; method: string; lang: string; title: string; note: string };
  navigation: { links: { label: string; href: string; id: string }[] };
  pages: {
    home: { id: string; label: string; sections: HomeSection[] };
    masterclasses: {
      id: string;
      label: string;
      header: { title: string; subtitle: string };
      courses: MasterclassCourse[];
      contact: { label: string; email_label: string; email: string };
    };
    "another-comet": {
      id: string;
      label: string;
      header: { title: string; subtitle: string };
      intro: { heading: string; body: string; tag: string; cta: CTA };
      courses: AnotherCometCourse[];
    };
    "our-mentors": {
      id: string;
      label: string;
      header: { title: string; subtitle: string };
      intro: { heading: string; body: string };
      back_to_top_label: string;
      mentors: Mentor[];
    };
    "coming-soon": {
      id: string;
      label: string;
      brand_mark: string;
      headline: string;
      body: string;
      contact_lead: string;
      contact_email: string;
    };
    "join-us": {
      id: string;
      label: string;
      header: { title: string; subtitle: string };
      options: JoinOption[];
      documents: { title: string; body: string };
    };
  };
  footer: {
    brand_mark: string;
    tagline: string;
    columns: { title: string; links: LinkRef[] }[];
    canva_attribution: {
      subject_text: string;
      terms_of_use_link: LinkRef;
      breaches_text: string;
      acceptable_use_link: LinkRef;
      report_text: string;
      privacy_lead: string;
      privacy_link: LinkRef;
      privacy_tail: string;
      designed_with: LinkRef;
    };
  };
  contact: {
    email: string;
    instagram: string;
    youtube: string;
    forms: { mentor: string; donor: string; sustainer: string };
  };
};
