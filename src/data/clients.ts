// Companies AR Medias has worked with, shown in the swapping logo wall above "Industries" on
// the homepage. Only list clients Aryan has confirmed. Visitors see the logo; the name appears
// when they hover, tap or tab to it.
//
// Logos are 256x256 PNG circles in src/assets/clients/ (cropped from the client's own avatar,
// website or brand files). Keep new ones the same shape so the wall stays even, then:
//   import acme from '../assets/clients/acme.png';
//   { name: 'Acme Realty', logo: acme },
import type { ImageMetadata } from 'astro';
import digiParadise from '../assets/clients/digi-paradise.png';
import district from '../assets/clients/district.png';
import giva from '../assets/clients/giva.png';
import globalPeace from '../assets/clients/global-peace-overseas.png';
import goldmine from '../assets/clients/goldmine-sanger.png';
import rak from '../assets/clients/rak.png';
import rian from '../assets/clients/rian-cullet.png';
import timezone from '../assets/clients/timezone.png';
import toothsi from '../assets/clients/toothsi.png';
import trezuh from '../assets/clients/trezuh.png';
import vault from '../assets/clients/vault-kirti-nagar.png';
import vijaySales from '../assets/clients/vijay-sales.png';
import dubaiBurqa from '../assets/clients/dubai-burqa.png';
import manipal from '../assets/clients/online-manipal.png';
import packlive from '../assets/clients/packlive.png';
import peterEngland from '../assets/clients/peter-england.png';
import raj from '../assets/clients/raj-real-estate.png';

export interface Client { name: string; logo: ImageMetadata }

// The first ones fill the wall on load; after that the others swap in one at a time.
export const clients: Client[] = [
  { name: 'District', logo: district },
  { name: 'Vijay Sales', logo: vijaySales },
  { name: 'GIVA', logo: giva },
  { name: 'Peter England', logo: peterEngland },
  { name: 'Timezone', logo: timezone },
  { name: 'toothsi', logo: toothsi },
  { name: 'Online Manipal', logo: manipal },
  { name: 'Vault Kirti Nagar', logo: vault },
  { name: 'TREZUH', logo: trezuh },
  { name: 'PackLive', logo: packlive },
  { name: 'Raj Real Estate', logo: raj },
  { name: 'Dubai Burqa Collections', logo: dubaiBurqa },
  { name: 'Rian Cullet', logo: rian },
  { name: 'Digi Paradise Studio', logo: digiParadise },
  { name: 'Goldmine Sanger', logo: goldmine },
  { name: 'RAK LED', logo: rak },
  { name: 'Global Peace Overseas', logo: globalPeace },
];
