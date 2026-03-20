/**
 * English translations — international version
 *
 * Mirrors the exact structure of sk.ts.
 * Type-checked against Translations type from sk.ts.
 */

import type { Translations } from './sk';

const en: Translations = {
  nav: {
    home: 'Home',
    guide: 'Guide',
    whatIsEfaktura: 'What is e-Invoice',
    whenStarts: 'When does it start',
    howToPrepare: 'How to prepare',
    legislation: 'Legislation',
    penalties: 'Penalties',
    forWhom: 'For whom',
    forFreelancers: 'For freelancers',
    forSmallBusiness: 'For small businesses',
    forAccountants: 'For accountants',
    integrations: 'Integrations',
    glossary: 'Glossary',
    blog: 'Blog',
    contact: 'Contact',
    about: 'About',
    services: 'Services',
    readinessCheck: 'Readiness check',
  },

  common: {
    readMore: 'Read more',
    learnMore: 'Learn more',
    backToHome: 'Back to home',
    share: 'Share',
    lastUpdated: 'Last updated',
    tableOfContents: 'Table of contents',
    relatedArticles: 'Related articles',
    youMightAlsoLike: 'You might also like',
    search: 'Search',
    filter: 'Filter',
    all: 'All',
    categories: 'Categories',
    tags: 'Tags',
    author: 'Author',
    publishedOn: 'Published on',
    minuteRead: 'min read',
    previous: 'Previous',
    next: 'Next',
    yes: 'Yes',
    no: 'No',
    close: 'Close',
    language: 'Language',
  },

  home: {
    heroTitle: 'Electronic Invoicing in Slovakia',
    heroSubtitle: 'Everything you need to know about mandatory e-invoicing from 1 January 2027',
    heroDescription:
      'Complete guide to electronic invoicing — legislation, preparation, Peppol, digital postmen, software solutions.',
    countdownLabel: 'Until mandatory e-invoicing',
    days: 'days',
    hours: 'hours',
    minutes: 'minutes',
    seconds: 'seconds',
    ctaPrimary: 'Start preparing',
    ctaSecondary: 'Test your readiness',
  },

  meta: {
    defaultTitle: 'e-Faktúry.info',
    defaultDescription:
      'Complete guide to electronic invoicing in Slovakia. Everything about mandatory e-invoicing from 1 January 2027 — legislation, preparation, Peppol, certified providers, software solutions.',
    titleTemplate: '%s | e-Faktúry.info',
  },

  footer: {
    description:
      'Independent information portal about electronic invoicing in Slovakia. Operated by 8888 Servis s. r. o.',
    allRightsReserved: 'All rights reserved.',
    madeWith: 'Made with',
    inSlovakia: 'in Slovakia',
    columns: {
      guide: 'Guide',
      solutions: 'Solutions',
      about: 'About',
      legal: 'Legal',
    },
  },

  legal: {
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
  },

  cta: {
    needHelp: 'Need help?',
    bookConsultation: 'Book a consultation',
    accountingHelp: 'Need help with accounting?',
    visitAccountant: 'Visit 8888.sk',
    startBusiness: 'Starting a new business?',
    visitSro: 'Register your company easily',
    findPostman: 'Looking for a digital postman?',
    visitPostmen: 'Compare digital postmen',
    subscribeNewsletter: 'Subscribe to our newsletter',
    emailPlaceholder: 'Your email',
    subscribe: 'Subscribe',
  },

  errors: {
    notFound: 'Page not found',
    notFoundDescription: 'The page you are looking for does not exist or has been moved.',
    serverError: 'Something went wrong',
    serverErrorDescription: 'An error occurred. Please try again.',
    tryAgain: 'Try again',
  },

  breadcrumbs: {
    home: 'Home',
  },
};

export default en;
