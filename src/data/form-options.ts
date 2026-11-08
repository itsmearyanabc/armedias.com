// Choices offered by the contact form. The server accepts only these values (see
// api/contact.ts), so the form and the validation can't drift apart.
import { markets } from './site';
import { services } from './services';

export const budgets = ['Under $2,000', '$2,000 – $5,000', '$5,000 – $15,000', '$15,000 – $50,000', '$50,000+', "Let's talk", 'Not sure yet'];
export const serviceChoices = [...services.map((s) => s.name), 'Not sure yet'];
export const countryChoices = [...markets.map((m) => m.country), 'Other'];
