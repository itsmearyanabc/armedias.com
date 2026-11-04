// How we work with clients, shown in the dark "How we work with you" section. Delhi NCR
// clients can meet us in person; everywhere else projects run on Google Meet.

export interface WorkingStyleItem { t: string; d: string; icon: string }

// 24x24 stroke icon paths
const icons = {
  office: 'M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6',
  meet: 'M15 10l5-3v10l-5-3M3 7h12v10H3z',
  updates: 'M8 7V3M16 7V3M3 11h18M5 5h14v16H5z',
  followUps: 'M12 7v5l3 3M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z',
  quote: 'M7 4h10M7 8h10M7 4c5 0 5 8 0 8l7 8',
  invoice: 'M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6',
  own: 'M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM12 10v11M12 15h4M12 19h3',
};

const updates = { t: 'Project update meetings', d: 'Regular update meetings with a live demo of what is done, what is next and anything we need from you.', icon: icons.updates };

// Delhi NCR: in-person meetings at our office or yours.
export const delhiWorkingStyle: WorkingStyleItem[] = [
  { t: 'Offline meetings', d: 'Meet us at our Kirti Nagar office, or we come to yours anywhere in Delhi NCR for discovery workshops, demos and handover.', icon: icons.office },
  { t: 'Google Meet calls', d: 'When meeting in person is not practical, we talk on Google Meet and share screens to review designs and builds together.', icon: icons.meet },
  updates,
  { t: 'Timely follow-ups', d: 'We reply within one business day and follow up after every meeting with clear next steps, so nothing waits on a reminder.', icon: icons.followUps },
  { t: 'Fixed quote in INR', d: 'A written scope and a fixed price before work starts, with milestone payments. No surprise invoices.', icon: icons.quote },
  { t: 'GST invoices', d: 'GST-compliant invoices from a registered New Delhi business, ready for your accounts team.', icon: icons.invoice },
];

// Outside Delhi NCR: calls in the client's working hours. Indian clients get INR quotes
// with GST invoices; other markets get a fixed quote in their own currency.
export function remoteWorkingStyle({ city, currency }: { city: string; currency: string }): WorkingStyleItem[] {
  return [
    { t: 'Calls in your working hours', d: `Google Meet calls scheduled inside ${city} business hours, with screen sharing to review designs and builds together.`, icon: icons.meet },
    updates,
    { t: 'Timely follow-ups', d: 'We reply within one business day and follow up after every meeting with clear next steps.', icon: icons.followUps },
    currency === 'INR'
      ? { t: 'Fixed quote and GST invoices', d: 'A written scope and a fixed price in INR before work starts, with milestone payments and GST-compliant invoices.', icon: icons.quote }
      : { t: `Fixed quote in ${currency}`, d: 'A written scope and a fixed price before work starts, with milestone payments. No surprise invoices.', icon: icons.quote },
    { t: 'You own everything', d: 'Source code, designs, domains and accounts are yours from day one.', icon: icons.own },
    { t: 'Visit us in New Delhi', d: 'Visiting Delhi? Meet the team at our Kirti Nagar office for a workshop or handover.', icon: icons.office },
  ];
}

// Russian city pages (/locations/russia/<city>/): the remote list in Russian, quotes in USD.
export function remoteWorkingStyleRu(cityIn: string): WorkingStyleItem[] {
  return [
    { t: 'Созвоны в ваше рабочее время', d: `Встречи в Google Meet в рабочие часы ${cityIn}, с демонстрацией экрана для разбора дизайна и сборок.`, icon: icons.meet },
    { t: 'Регулярные демо', d: 'Регулярные встречи с живой демонстрацией: что готово, что дальше и что нужно от вас.', icon: icons.updates },
    { t: 'Быстрые ответы', d: 'Отвечаем в течение одного рабочего дня и после каждой встречи присылаем следующие шаги.', icon: icons.followUps },
    { t: 'Фиксированная цена в USD', d: 'Письменное ТЗ и фиксированная цена до начала работ, оплата по этапам. Без неожиданных счетов.', icon: icons.quote },
    { t: 'Всё принадлежит вам', d: 'Исходный код, дизайн, домены и аккаунты принадлежат вам с первого дня.', icon: icons.own },
    { t: 'Офис в Нью-Дели', d: 'Будете в Дели? Приезжайте в наш офис в Кирти Нагар на воркшоп или сдачу проекта.', icon: icons.office },
  ];
}
