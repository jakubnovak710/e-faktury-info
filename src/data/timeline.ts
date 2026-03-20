/**
 * E-faktúra Legislative Timeline
 *
 * Chronological milestones for e-invoicing in Slovakia.
 * Used by: homepage countdown, /kedy-zacne-platit-e-faktura, /nastroje/casova-os
 *
 * Source: Zákon 385/2025 Z.z. (novela zákona o DPH)
 * Last verified: March 2026
 */

export interface TimelineMilestone {
  /** ISO date string (YYYY-MM-DD) */
  date: string;
  /** Short title */
  titleSk: string;
  titleEn: string;
  /** Detailed description */
  descriptionSk: string;
  descriptionEn: string;
  /** Status */
  status: 'completed' | 'active' | 'upcoming';
  /** Is this a major milestone? */
  major: boolean;
}

export const timeline: TimelineMilestone[] = [
  {
    date: '2025-12-09',
    titleSk: 'Schválenie zákona',
    titleEn: 'Law approved',
    descriptionSk:
      'Národná rada SR schválila novelu zákona o DPH (385/2025 Z.z.), ktorá zavádza povinnú elektronickú fakturáciu.',
    descriptionEn:
      'Slovak parliament approved the VAT Act amendment (385/2025 Z.z.) introducing mandatory e-invoicing.',
    status: 'completed',
    major: true,
  },
  {
    date: '2025-12-11',
    titleSk: 'Štart implementácie IS EFA',
    titleEn: 'IS EFA implementation started',
    descriptionSk:
      'Finančná správa spustila implementáciu informačného systému elektronickej fakturácie (IS EFA).',
    descriptionEn:
      'Financial Administration started implementing the Electronic Invoicing Information System (IS EFA).',
    status: 'completed',
    major: false,
  },
  {
    date: '2026-04-01',
    titleSk: 'Dobrovoľná fáza',
    titleEn: 'Voluntary phase begins',
    descriptionSk:
      'Podnikatelia sa môžu dobrovoľne zapojiť do systému e-faktúra. Finančná správa zverejňuje zoznam certifikovaných digitálnych poštárov.',
    descriptionEn:
      'Businesses can voluntarily join the e-invoice system. Financial Administration publishes the list of certified digital postmen.',
    status: 'active',
    major: true,
  },
  {
    date: '2027-01-01',
    titleSk: 'Povinná e-faktúra (tuzemské)',
    titleEn: 'Mandatory e-invoicing (domestic)',
    descriptionSk:
      'Všetci platitelia DPH musia vystavovať a prijímať e-faktúry pre tuzemské transakcie vo formáte XML (EN 16931, Peppol BIS).',
    descriptionEn:
      'All VAT payers must issue and receive e-invoices for domestic transactions in XML format (EN 16931, Peppol BIS).',
    status: 'upcoming',
    major: true,
  },
  {
    date: '2027-07-01',
    titleSk: 'Povinná certifikovaná doručovacia služba',
    titleEn: 'Mandatory certified delivery service',
    descriptionSk:
      'Používanie certifikovanej doručovacej služby (digitálneho poštára) sa stáva povinným pre všetkých.',
    descriptionEn:
      'Using a certified delivery service (digital postman) becomes mandatory for all.',
    status: 'upcoming',
    major: true,
  },
  {
    date: '2030-07-01',
    titleSk: 'Cezhraničná e-fakturácia',
    titleEn: 'Cross-border e-invoicing',
    descriptionSk:
      'Povinnosť e-fakturácie sa rozširuje na cezhraničné transakcie v rámci EÚ podľa smernice ViDA.',
    descriptionEn:
      'E-invoicing obligation extends to cross-border EU transactions under the ViDA directive.',
    status: 'upcoming',
    major: true,
  },
];
