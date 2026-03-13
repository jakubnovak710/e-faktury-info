import type { NavigationConfig } from '@jakubnovak710/universal-web-core/types';

export const navigationConfig: NavigationConfig & {
  phone?: string;
  ctaLabel?: string;
  ctaTarget?: string;
} = {
  header: [
    { label: 'Domov', href: '/' },
    { label: 'O nás', href: '/about' },
    { label: 'Služby', href: '/services' },
  ],
  phone: '+421 XXX XXX XXX',
  ctaLabel: 'Konzultácia',
  ctaTarget: '/contact',
  footer: {
    columns: [
      {
        title: 'Navigácia',
        links: [
          { label: 'Domov', href: '/' },
          { label: 'O nás', href: '/about' },
          { label: 'Služby', href: '/services' },
          { label: 'Kontakt', href: '/contact' },
        ],
      },
      {
        title: 'Právne',
        links: [
          { label: 'Ochrana súkromia', href: '/privacy' },
          { label: 'Obchodné podmienky', href: '/terms' },
        ],
      },
    ],
  },
  bottomBar: [
    { label: 'Domov', href: '/', icon: 'Home' },
    { label: 'Služby', href: '/services', icon: 'Briefcase' },
    { label: 'O nás', href: '/about', icon: 'Users' },
    { label: 'Kontakt', href: '/contact', icon: 'Mail' },
  ],
};
