import { PrismaClient } from './generated/prisma';
import { createServiceLogger } from './src/lib/logger';

process.env['DATABASE_URL'] =
  'mysql://allu_user:allu_password@localhost:3306/allu_shop';

const prisma = new PrismaClient();
const logger = createServiceLogger('DatabaseSeed');

const ProductsMock = [
  {
    id: '805a4deb-e8b2-4690-b6ad-b96a16a8d434',
    title: 'Architect Extensible Relationships',
    description: 'Cup market nation room act state.',
    image:
      'https://v2-allugator-images.s3.amazonaws.com/products/Acer+Nitro+5+3050+2.jpeg',
    monthlyPrice: 340.38,
    yearlyPrice: 1162.09,
    price: 340.38,
  },
  {
    id: '5cd4476a-65ec-42b7-b1f6-a3a2feeefe64',
    title: 'Target World-Class Users',
    description: 'Of despite yet exist contain star.',
    image:
      'https://v2-allugator-images.s3.amazonaws.com/products/Acer+Nitro+5+3050+2.jpeg',
    monthlyPrice: 304.73,
    yearlyPrice: 2652.61,
    price: 304.73,
  },
  {
    id: '1572e790-2d98-4d42-b335-a0fd550ab074',
    title: 'Leverage Dot-Com E-Tailers',
    description: 'Somebody society message partner economy.',
    image:
      'https://v2-allugator-images.s3.amazonaws.com/products/Acer+Nitro+5+3050+3.jpeg',
    monthlyPrice: 278.77,
    yearlyPrice: 853.25,
    price: 278.77,
  },
  {
    id: '92487ee9-15b9-4678-9790-3afab8830440',
    title: 'Redefine Bricks-And-Clicks Eyeballs',
    description: 'Institution care boy help of believe them.',
    image:
      'https://v2-allugator-images.s3.amazonaws.com/products/Acer+Nitro+5+3050+4.jpeg',
    monthlyPrice: 222.52,
    yearlyPrice: 2192.89,
    price: 222.52,
  },
  {
    id: '81989327-03a3-4f52-9d2b-b2e2e60ffc19',
    title: 'Implement Wireless Relationships',
    description: 'True my administration road bring father reflect.',
    image:
      'https://v2-allugator-images.s3.amazonaws.com/products/Acer+Nitro+5+3050+5.jpeg',
    monthlyPrice: 266.61,
    yearlyPrice: 2545.26,
    price: 266.61,
  },
  {
    id: 'aaee3cca-48e2-4bb2-b848-564bc83d14d9',
    title: 'Utilize Bricks-And-Clicks Web Services',
    description: 'Call finish in agency feeling better.',
    image:
      'https://v2-allugator-images.s3.amazonaws.com/products/Acer+Nitro+5+3050+6.jpeg',
    monthlyPrice: 366.03,
    yearlyPrice: 874.29,
    price: 366.03,
  },
  {
    id: 'a1a1054e-6208-4541-a1b8-86d8cc5830cc',
    title: 'Iterate Cross-Media Architectures',
    description: 'Operation culture poor play deep describe.',
    image:
      'https://v2-allugator-images.s3.amazonaws.com/products/acer%20orion%201.png',
    monthlyPrice: 74.23,
    yearlyPrice: 2743.38,
    price: 74.23,
  },
  {
    id: '12d7888c-9268-4c4c-bae2-4d8045e1d0ed',
    title: 'Target Cross-Platform Markets',
    description: 'Pattern improve cause must game billion enough.',
    image:
      'https://v2-allugator-images.s3.amazonaws.com/products/acer%20orion%202.webp',
    monthlyPrice: 133.21,
    yearlyPrice: 2489.28,
    price: 133.21,
  },
  {
    id: 'cdcad9f4-4b20-4375-a42e-d39fef4ed97d',
    title: 'Maximize Visionary Functionalities',
    description: 'Some country loss common woman couple station.',
    image:
      'https://v2-allugator-images.s3.amazonaws.com/products/acer%20orion%202.png',
    monthlyPrice: 245.15,
    yearlyPrice: 2986.49,
    price: 245.15,
  },
  {
    id: '5cf96912-ce04-4522-8167-4f4b1ab73b1f',
    title: 'Engineer Plug-And-Play E-Business',
    description: 'Including three nearly probably.',
    image:
      'https://v2-allugator-images.s3.amazonaws.com/products/allu.nv_specs-acer_orion%20i5%203060%2016GB_PO5-620-BR12_900x900px.png',
    monthlyPrice: 305.18,
    yearlyPrice: 2547.56,
    price: 305.18,
  },
  {
    id: '82877969-c2da-4727-ae4e-15b1ab99b3c2',
    title: 'Generate Integrated E-Business',
    description: 'Organization meet foreign every top.',
    image:
      'https://v2-allugator-images.s3.amazonaws.com/products/acer%20orion%203.png',
    monthlyPrice: 226.76,
    yearlyPrice: 525.87,
    price: 226.76,
  },
  {
    id: '80b0fcea-ff07-4135-985c-dcae0a938b32',
    title: 'Utilize Magnetic Initiatives',
    description: 'Truth herself side upon despite age.',
    image:
      'https://v2-allugator-images.s3.amazonaws.com/products/allu.nv_specs-acer_orion%20i7%203060%2016GB_PO5-620-BR15_900x900px.png',
    monthlyPrice: 365.4,
    yearlyPrice: 1539.16,
    price: 365.4,
  },
  {
    id: '0d5db4ad-a05d-4e8e-b3d4-e745dbcaec35',
    title: 'Drive Killer Communities',
    description: 'Film like sort fire writer fill.',
    image:
      'https://v2-allugator-images.s3.amazonaws.com/products/acer%20orion%201.webp',
    monthlyPrice: 207.48,
    yearlyPrice: 1656.08,
    price: 207.48,
  },
  {
    id: 'e56b21fa-8de3-4197-8d4b-57c6f303f25f',
    title: 'Brand Cross-Platform Methodologies',
    description: 'Bar may turn dark eight image must role.',
    image:
      'https://v2-allugator-images.s3.amazonaws.com/products/acer%20vero%201.webp',
    monthlyPrice: 391.98,
    yearlyPrice: 2379.21,
    price: 391.98,
  },
  {
    id: 'd52c91a8-4945-4ad2-856b-aa8c623c7b74',
    title: 'Repurpose Intuitive Partnerships',
    description: 'Question morning deal century.',
    image:
      'https://v2-allugator-images.s3.amazonaws.com/products/acer%20vero%202.webp',
    monthlyPrice: 310.17,
    yearlyPrice: 1458.63,
    price: 310.17,
  },
  {
    id: '6eca099c-5b53-447d-86f7-2d2ce5072ca7',
    title: 'Seize Clicks-And-Mortar Markets',
    description: 'Actually that bank record building note.',
    image:
      'https://v2-allugator-images.s3.amazonaws.com/products/acer%20vero%203.webp',
    monthlyPrice: 82.94,
    yearlyPrice: 1503.19,
    price: 82.94,
  },
  {
    id: 'bc167e0c-7070-4a8c-8ec9-41c3afd0ef7b',
    title: 'Unleash Back-End Experiences',
    description: 'Per body water you onto account financial traditional.',
    image:
      'https://v2-allugator-images.s3.amazonaws.com/products/acer%20vero%204.webp',
    monthlyPrice: 159.03,
    yearlyPrice: 854.15,
    price: 159.03,
  },
  {
    id: 'b46432b4-118a-4d3a-8efd-687de49d44fd',
    title: 'Harness Holistic Users',
    description: 'Your race herself tax key news step.',
    image:
      'https://v2-allugator-images.s3.amazonaws.com/products/acer%20vero%205.webp',
    monthlyPrice: 160.4,
    yearlyPrice: 1762.1,
    price: 160.4,
  },
  {
    id: 'fe89fb1a-d910-4c96-9583-30d52abd86b4',
    title: 'Generate Virtual Web-Readiness',
    description: 'Pretty main community certain just exactly pull.',
    image:
      'https://v2-allugator-images.s3.amazonaws.com/products/acer%20vero%206.webp',
    monthlyPrice: 256.66,
    yearlyPrice: 1376.12,
    price: 256.66,
  },
  {
    id: 'e8da935e-a0ba-4d6b-b087-1820c2f5d74b',
    title: 'Brand Granular Experiences',
    description: 'Amount somebody sure maintain save born finish.',
    image:
      'https://v2-allugator-images.s3.amazonaws.com/products/acer%20vero%207.webp',
    monthlyPrice: 134.7,
    yearlyPrice: 2058.13,
    price: 134.7,
  },
  {
    id: 'daee4e83-6289-4ba5-aca6-f278b5e2dbb3',
    title: 'Monetize Back-End Infrastructures',
    description: 'Force mean kid green over.',
    image:
      'https://v2-allugator-images.s3.amazonaws.com/products/acer%20vero%208.webp',
    monthlyPrice: 53.52,
    yearlyPrice: 436.19,
    price: 53.52,
  },
  {
    id: 'dc4f7570-cbb0-424c-b994-a6336055b91b',
    title: 'Incubate Compelling Models',
    description: 'Physical ball family attorney relationship activity clear.',
    image:
      'https://v2-allugator-images.s3.amazonaws.com/products/acer%20helios%20neo%20phn16-71-74ue.png',
    monthlyPrice: 118.46,
    yearlyPrice: 859.81,
    price: 118.46,
  },
  {
    id: 'ee9e86b6-69db-4b1a-bfb1-0d788faaacd8',
    title: 'Maximize Back-End Web-Readiness',
    description: 'Congress sea low time share.',
    image:
      'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/ACER+PREDATOR+300+SE/Acer+Predator+300+SE+Thumb.png',
    monthlyPrice: 92.78,
    yearlyPrice: 1671.52,
    price: 92.78,
  },
  {
    id: '04617d98-77bc-4036-b3db-4c69a95f64d4',
    title: 'Embrace Cutting-Edge Vortals',
    description: 'Society I news.',
    image:
      'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/ACER+PREDATOR+300+SE/Acer+Predator+300+SE+2.jpg',
    monthlyPrice: 331.83,
    yearlyPrice: 1820.26,
    price: 331.83,
  },
  {
    id: '88837e26-b318-430a-b09e-bfa9d5913562',
    title: 'Iterate Interactive Vortals',
    description: 'Difficult professor meeting customer certain.',
    image:
      'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/ACER+PREDATOR+300+SE/Acer+Predator+300+SE+3.jpg',
    monthlyPrice: 364.61,
    yearlyPrice: 2638.35,
    price: 364.61,
  },
  {
    id: '2b6a89f5-8748-4eab-912c-67c224a58210',
    title: 'Utilize Integrated Supply-Chains',
    description: 'Politics itself however player race.',
    image:
      'https://v2-allugator-images.s3.amazonaws.com/products/allu.nv_specs-acer_triton_PT316-51s-72XA_900x900px.png',
    monthlyPrice: 240.2,
    yearlyPrice: 2527.04,
    price: 240.2,
  },
  {
    id: 'ed407f9a-42da-42f3-9866-e871bb539f41',
    title: 'Enable Next-Generation Communities',
    description: 'Mother road thing information bar.',
    image:
      'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/POLAR+PACER+PRO/Polar+Pacer+Pro+Thumb+2.png',
    monthlyPrice: 373.04,
    yearlyPrice: 1832.02,
    price: 373.04,
  },
  {
    id: 'cdd21cfd-4329-4677-9165-8867069df36d',
    title: 'Enable Cross-Platform Bandwidth',
    description: 'Say amount position little.',
    image:
      'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/POLAR+PACER+PRO/Polar+Pacer+Pro+2.jpg',
    monthlyPrice: 275.89,
    yearlyPrice: 1239.89,
    price: 275.89,
  },
  {
    id: 'b4e7cbf4-6c78-4d69-8186-8a2b85e16f7d',
    title: 'Syndicate Integrated Paradigms',
    description: 'Official plant rich.',
    image:
      'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/POLAR+PACER+PRO/Polar+Pacer+Pro+3.jpg',
    monthlyPrice: 360.27,
    yearlyPrice: 2994.21,
    price: 360.27,
  },
  {
    id: 'aeabe4c1-cf5c-4ed4-ba58-7971eafa0b5c',
    title: 'Transform Real-Time Initiatives',
    description: 'Discussion game share class case.',
    image:
      'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/POLAR+PACER+PRO/Polar+Pacer+Pro+4.jpg',
    monthlyPrice: 358.92,
    yearlyPrice: 2142.18,
    price: 358.92,
  },
  {
    id: '84a5fe34-f65d-407b-951c-87ae4223f41b',
    title: 'Target Robust Infrastructures',
    description: 'Indicate off material fast clear about.',
    image:
      'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/POLAR+PACER/Polar+Pacer+Thumb+2.png',
    monthlyPrice: 268.99,
    yearlyPrice: 2177.07,
    price: 268.99,
  },
  {
    id: '1026c880-b44c-47a5-afe2-187237259fe8',
    title: 'Cultivate Visionary Supply-Chains',
    description: 'Something growth accept require ball.',
    image:
      'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/POLAR+PACER/Polar+Pacer+2.jpg',
    monthlyPrice: 277.62,
    yearlyPrice: 2789.77,
    price: 277.62,
  },
  {
    id: 'caa0c456-afdd-492b-8284-3a42d7bee096',
    title: 'Embrace Mission-Critical Infrastructures',
    description: 'Camera go western box senior like consider.',
    image:
      'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/POLAR+PACER/Polar+Pacer+3.jpg',
    monthlyPrice: 121.41,
    yearlyPrice: 1986.08,
    price: 121.41,
  },
  {
    id: '4e75e82b-9396-4b2e-be70-f2e0744e47c4',
    title: 'Engineer Next-Generation E-Tailers',
    description: 'Management job policy do explain stay.',
    image:
      'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/POLAR+PACER+PRO/Polar+Pacer+Pro+Thumb+2.png',
    monthlyPrice: 346.72,
    yearlyPrice: 523.47,
    price: 346.72,
  },
  {
    id: 'a293d30e-a3d7-47d9-8d74-6b1b1359e56c',
    title: 'Strategize Transparent Content',
    description: 'Citizen far person body owner practice today.',
    image:
      'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/POLAR+PACER+PRO/Polar+Pacer+Pro+2.jpg',
    monthlyPrice: 198.04,
    yearlyPrice: 624.87,
    price: 198.04,
  },
  {
    id: '33e42f26-ffd4-4151-9a49-6843801b1e07',
    title: 'Empower Back-End Functionalities',
    description: 'Trouble a cut medical various beautiful management.',
    image:
      'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/POLAR+PACER+PRO/Polar+Pacer+Pro+3.jpg',
    monthlyPrice: 390.86,
    yearlyPrice: 1364.72,
    price: 390.86,
  },
  {
    id: '7762a6f0-b97d-4a40-9b28-58357e46dc7b',
    title: 'Engineer Bricks-And-Clicks Supply-Chains',
    description: 'Tell set heavy not.',
    image:
      'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/POLAR+PACER+PRO/Polar+Pacer+Pro+4.jpg',
    monthlyPrice: 226.02,
    yearlyPrice: 1998.86,
    price: 226.02,
  },
  {
    id: '9b72f0c9-7500-44fe-85d1-5aa36c82c2df',
    title: 'Engineer Virtual Technologies',
    description: 'Modern police particularly should.',
    image:
      'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/IPHONE+15+PRO+MAX/iPhone+15+Pro+Max+Thumb.png',
    monthlyPrice: 269.95,
    yearlyPrice: 1930.53,
    price: 269.95,
  },
  {
    id: '8d8c4858-b99f-46d1-b9f1-a354ddf71817',
    title: 'Disintermediate Bleeding-Edge Supply-Chains',
    description: 'May key build what them quality.',
    image:
      'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/IPHONE+15+PRO+MAX/iPhone+15+Pro+Max+-+2.jpg',
    monthlyPrice: 74.99,
    yearlyPrice: 2371.93,
    price: 74.99,
  },
  {
    id: '3bd45eae-5ed8-4299-af85-2de879945bf8',
    title: 'Target Mission-Critical Functionalities',
    description: 'Budget work point together full very call.',
    image:
      'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/IPHONE+15+PRO+MAX/iPhone+15+Pro+Max+-+3.jpg',
    monthlyPrice: 202.9,
    yearlyPrice: 2695.52,
    price: 202.9,
  },
  {
    id: '2845d3c9-adc5-40a3-955b-6c8aae300e05',
    title: 'Re-Contextualize Proactive E-Commerce',
    description: 'Staff practice in.',
    image:
      'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/IPHONE+15+PRO/iPhone+15+Pro+Thumb.png',
    monthlyPrice: 205.44,
    yearlyPrice: 1243.62,
    price: 205.44,
  },
  {
    id: 'b0875cfb-6b5e-4158-bab7-21325efc9032',
    title: 'Scale Extensible Communities',
    description: 'Audience daughter job water character return conference.',
    image:
      'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/IPHONE+15+PRO/iPhone+15+Pro+-+2.jpg',
    monthlyPrice: 53.12,
    yearlyPrice: 1271.17,
    price: 53.12,
  },
  {
    id: '3cafde7b-f018-43dc-8a81-dc4710b7676d',
    title: 'Embrace End-To-End Eyeballs',
    description: 'Full yourself heart story.',
    image:
      'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/IPHONE+15+PRO/iPhone+15+Pro+-+3.jpg',
    monthlyPrice: 123.77,
    yearlyPrice: 1755.75,
    price: 123.77,
  },
  {
    id: 'b2056d93-08c2-44d8-803e-0d90a4b28fe6',
    title: 'Transform Strategic Functionalities',
    description: 'Whatever civil drop most.',
    image:
      'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/IPHONE+15/iPhone+15+Thumb.png',
    monthlyPrice: 75.14,
    yearlyPrice: 564.77,
    price: 75.14,
  },
  {
    id: '7498f2e5-bd9f-43a9-a10b-b9728b229a4f',
    title: 'Generate End-To-End E-Commerce',
    description: 'Send final budget.',
    image:
      'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/IPHONE+15/iPhone+15++-+2.jpg',
    monthlyPrice: 155.55,
    yearlyPrice: 2134.67,
    price: 155.55,
  },
  {
    id: 'd758aaa5-6faf-4f5d-887c-d9cf05e28e6a',
    title: 'Generate Best-Of-Breed Web-Readiness',
    description: 'Themselves standard realize wear per fly people.',
    image:
      'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/IPHONE+15/iPhone+15++-+3.jpg',
    monthlyPrice: 373.12,
    yearlyPrice: 1567.75,
    price: 373.12,
  },
  {
    id: '0892e3ce-98cf-4c2a-8533-09b8f777cd82',
    title: 'Drive Wireless Initiatives',
    description: 'Data before here manage or majority everybody style.',
    image:
      'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/IPHONE+14+PRO/iPhone+14+Pro+Thumb.png',
    monthlyPrice: 285.04,
    yearlyPrice: 1813.19,
    price: 285.04,
  },
  {
    id: 'e393ab4d-5d2a-4816-b8d2-d34bd21dcaed',
    title: 'Expedite Virtual Bandwidth',
    description: 'Huge continue door inside.',
    image:
      'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/IPHONE+14+PRO/iPhone+14+Pro+-+2.jpg',
    monthlyPrice: 385.11,
    yearlyPrice: 1193.05,
    price: 385.11,
  },
  {
    id: '49706855-08f0-4f8e-809e-0ea908230836',
    title: 'Enhance Robust Experiences',
    description: 'Them whatever agreement particular suddenly human order.',
    image:
      'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/IPHONE+14+PRO/iPhone+14+Pro+-+3.jpg',
    monthlyPrice: 396.89,
    yearlyPrice: 1220.95,
    price: 396.89,
  },
  {
    id: '533ded5d-9d4a-4b6a-a6c4-5d55b737b3c2',
    title: 'Empower Intuitive E-Commerce',
    description: 'Actually head table sense product.',
    image:
      'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/IPHONE+14+PRO/iPhone+14+Pro+-+4.jpg',
    monthlyPrice: 394.82,
    yearlyPrice: 1444.75,
    price: 394.82,
  },
  {
    id: 'd681f6b4-6b0a-4372-9882-89e9a69e64cd',
    title: 'Deliver Ubiquitous Communities',
    description: 'Bed hold away teach describe talk.',
    image:
      'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/IPHONE+14+PRO/iPhone+14+Pro+-+4.jpg',
    monthlyPrice: 220.25,
    yearlyPrice: 2371.76,
    price: 220.25,
  },
];

function determineCategory(title: string, image: string): string {
  const titleLower = title.toLowerCase();
  const imageLower = image.toLowerCase();

  if (
    imageLower.includes('iphone') ||
    imageLower.includes('samsung') ||
    imageLower.includes('galaxy')
  ) {
    return 'Smartphones';
  }
  if (
    imageLower.includes('macbook') ||
    imageLower.includes('lenovo') ||
    imageLower.includes('thinkpad') ||
    imageLower.includes('asus')
  ) {
    return 'Laptops';
  }
  if (imageLower.includes('ipad')) {
    return 'Tablets';
  }
  if (imageLower.includes('dji') || imageLower.includes('drone')) {
    return 'Drones';
  }
  if (imageLower.includes('logitech') || imageLower.includes('mouse')) {
    return 'Periféricos';
  }
  if (imageLower.includes('polar') || imageLower.includes('pacer')) {
    return 'Wearables';
  }
  if (
    titleLower.includes('web') ||
    titleLower.includes('digital') ||
    titleLower.includes('cloud')
  ) {
    return 'Software';
  }
  if (titleLower.includes('gaming') || titleLower.includes('game')) {
    return 'Gaming';
  }

  return 'Electronics';
}

function generateRandomStock(): number {
  return Math.floor(Math.random() * 100) + 1;
}

async function main() {
  logger.info('🌱 Iniciando seed com ProductsMock...');

  try {
    await prisma.$connect();
    logger.info('Conexão estabelecida');

    logger.info('Limpando produtos existentes...');
    await prisma.product.deleteMany({});
    logger.info('Produtos existentes removidos');

    logger.info('Inserindo produtos...');

    const productsToInsert = ProductsMock.map((product) => ({
      name: product.title,
      description: product.description,
      price: product.price,
      category: determineCategory(product.title, product.image),
      stock: generateRandomStock(),
      image: product.image,
      monthlyPrice: product.monthlyPrice,
      yearlyPrice: product.yearlyPrice,
    }));

    for (let i = 0; i < productsToInsert.length; i += 10) {
      const batch = productsToInsert.slice(i, i + 10);
      await prisma.product.createMany({
        data: batch,
      });
      logger.info(
        `Inseridos produtos ${i + 1} a ${Math.min(
          i + 10,
          productsToInsert.length
        )}`
      );
    }

    logger.info(`Seed concluído!`);
    logger.info(`Total de produtos: ${productsToInsert.length}`);

    const categories = [...new Set(productsToInsert.map((p) => p.category))];
    logger.info('Produtos por categoria:');
    for (const category of categories) {
      const count = productsToInsert.filter(
        (p) => p.category === category
      ).length;
      logger.info(`  ${category}: ${count} produtos`);
    }
  } catch (error) {
    logger.error('Erro durante o seed:', { error });
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  logger.error('❌ Falha no seed:', { error: e });
  process.exit(1);
});
