import type { Property } from './properties';

export const SAMPLE_PROPERTIES: Property[] = [
  {
    id: 'demo-001',
    slug: 'al-mansour-family-villa',
    type: 'villa',
    purpose: 'sale',
    governorate: 'baghdad',
    city: 'baghdad',
    district: 'al-mansour',
    priceIqd: 620_000_000,
    bedrooms: 5,
    bathrooms: 4,
    areaSqm: 420,
    featured: true,
    yearBuilt: 2021,
    image:
      'https://images.pexels.com/photos/29334668/pexels-photo-29334668.png?auto=compress&cs=tinysrgb&h=650&w=940',
    descriptionEn:
      'Sample listing. Detached family villa with private garden and garage, located in a quiet residential street. Open-plan living areas, modern kitchen, and a separate guest suite.',
    descriptionAr:
      'عرض توضيحي. فيلا عائلية منفصلة مع حديقة خاصة ومرأب، تقع في شارع سكني هادئ. مساحات معيشة مفتوحة، مطبخ حديث، وشقة ضيوف مستقلة.',
  },
  {
    id: 'demo-002',
    slug: 'erbil-downtown-apartment',
    type: 'apartment',
    purpose: 'rent',
    governorate: 'erbil',
    city: 'erbil',
    district: 'downtown',
    priceIqd: 1_100_000,
    bedrooms: 2,
    bathrooms: 2,
    areaSqm: 120,
    featured: true,
    yearBuilt: 2019,
    image:
      'https://images.pexels.com/photos/6585598/pexels-photo-6585598.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    descriptionEn:
      'Sample listing. Furnished two-bedroom apartment in a managed building with elevator and secure parking. Walking distance to shops and restaurants.',
    descriptionAr:
      'عرض توضيحي. شقة مفروشة بغرفتي نوم في مبنى مُدار مع مصعد ومرأب آمن. على مسافة قريبة من المحلات والمطاعم.',
  },
  {
    id: 'demo-003',
    slug: 'basra-corniche-office',
    type: 'office',
    purpose: 'rent',
    governorate: 'basra',
    city: 'basra',
    district: 'corniche',
    priceIqd: 1_800_000,
    bedrooms: 0,
    bathrooms: 2,
    areaSqm: 210,
    featured: true,
    yearBuilt: 2020,
    image:
      'https://images.pexels.com/photos/1313534/pexels-photo-1313534.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    descriptionEn:
      'Sample listing. Fitted office floor with meeting room and reception area, fronting the corniche. Fiber internet and backup generator included.',
    descriptionAr:
      'عرض توضيحي. طابق مكتبي مجهز مع غرفة اجتماعات ومنطقة استقبال، مطل على الكورنيش. يتضمن إنترنت فايبر ومولد احتياطي.',
  },
  {
    id: 'demo-004',
    slug: 'najaf-garden-house',
    type: 'house',
    purpose: 'sale',
    governorate: 'najaf',
    city: 'najaf',
    district: 'al-ghadir',
    priceIqd: 260_000_000,
    bedrooms: 4,
    bathrooms: 3,
    areaSqm: 260,
    featured: true,
    yearBuilt: 2018,
    image:
      'https://images.pexels.com/photos/7031600/pexels-photo-7031600.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    descriptionEn:
      'Sample listing. Two-storey house with internal courtyard, close to schools and services. Rear annex suitable for a small home office.',
    descriptionAr:
      'عرض توضيحي. منزل بطابقين مع فناء داخلي، قريب من المدارس والخدمات. ملحق خلفي مناسب لمكتب منزلي صغير.',
  },
  {
    id: 'demo-005',
    slug: 'sulaymaniyah-hills-apartment',
    type: 'apartment',
    purpose: 'sale',
    governorate: 'sulaymaniyah',
    city: 'sulaymaniyah',
    district: 'ashti',
    priceIqd: 195_000_000,
    bedrooms: 3,
    bathrooms: 2,
    areaSqm: 165,
    featured: false,
    yearBuilt: 2022,
    image:
      'https://images.pexels.com/photos/6920439/pexels-photo-6920439.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    descriptionEn:
      'Sample listing. New-build apartment with balcony views, underground parking, and a shared rooftop terrace.',
    descriptionAr:
      'عرض توضيحي. شقة حديثة بإطلالة من الشرفة، مرأب أرضي، وسطح مشترك.',
  },
  {
    id: 'demo-006',
    slug: 'erbil-family-villa',
    type: 'villa',
    purpose: 'sale',
    governorate: 'erbil',
    city: 'erbil',
    district: 'italian-village',
    priceIqd: 810_000_000,
    bedrooms: 6,
    bathrooms: 5,
    areaSqm: 540,
    featured: true,
    yearBuilt: 2023,
    image:
      'https://images.pexels.com/photos/7031594/pexels-photo-7031594.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    descriptionEn:
      'Sample listing. Modern villa with landscaped garden, swimming pool, and staff quarters in a gated community.',
    descriptionAr:
      'عرض توضيحي. فيلا حديثة مع حديقة منظمة ومسبح وغرف خدمة في مجتمع مسور.',
  },
  {
    id: 'demo-007',
    slug: 'mosul-riverside-land',
    type: 'land',
    purpose: 'sale',
    governorate: 'nineveh',
    city: 'mosul',
    district: 'al-zuhour',
    priceIqd: 120_000_000,
    bedrooms: 0,
    bathrooms: 0,
    areaSqm: 600,
    featured: false,
    yearBuilt: 0,
    image:
      'https://images.pexels.com/photos/20227375/pexels-photo-20227375.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    descriptionEn:
      'Sample listing. Residential plot in an emerging neighbourhood, corner position with two street frontages.',
    descriptionAr:
      'عرض توضيحي. قطعة سكنية في حيّ نامٍ، على الزاوية بواجهتين للشارع.',
  },
  {
    id: 'demo-008',
    slug: 'baghdad-jadriya-apartment',
    type: 'apartment',
    purpose: 'rent',
    governorate: 'baghdad',
    city: 'baghdad',
    district: 'jadriya',
    priceIqd: 900_000,
    bedrooms: 1,
    bathrooms: 1,
    areaSqm: 85,
    featured: false,
    yearBuilt: 2017,
    image:
      'https://images.pexels.com/photos/7546648/pexels-photo-7546648.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    descriptionEn:
      'Sample listing. Compact one-bedroom apartment near the university district, suitable for a professional or student.',
    descriptionAr:
      'عرض توضيحي. شقة بغرفة نوم واحدة قرب منطقة الجامعة، مناسبة لموظف أو طالب.',
  },
  {
    id: 'demo-009',
    slug: 'basra-qarmat-ali-house',
    type: 'house',
    purpose: 'rent',
    governorate: 'basra',
    city: 'basra',
    district: 'qarmat-ali',
    priceIqd: 700_000,
    bedrooms: 3,
    bathrooms: 2,
    areaSqm: 180,
    featured: false,
    yearBuilt: 2015,
    image:
      'https://images.pexels.com/photos/6758284/pexels-photo-6758284.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    descriptionEn:
      'Sample listing. Three-bedroom house with private entrance and small yard, on a quiet street.',
    descriptionAr:
      'عرض توضيحي. منزل بثلاث غرف مع مدخل خاص وفناء صغير، في شارع هادئ.',
  },
  {
    id: 'demo-010',
    slug: 'baghdad-karrada-apartment',
    type: 'apartment',
    purpose: 'sale',
    governorate: 'baghdad',
    city: 'baghdad',
    district: 'karrada',
    priceIqd: 210_000_000,
    bedrooms: 2,
    bathrooms: 2,
    areaSqm: 130,
    featured: false,
    yearBuilt: 2020,
    image:
      'https://images.pexels.com/photos/30386991/pexels-photo-30386991.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    descriptionEn:
      'Sample listing. Two-bedroom apartment in a mid-rise building, close to shops and public transport routes.',
    descriptionAr:
      'عرض توضيحي. شقة بغرفتي نوم في مبنى متوسط الارتفاع، قريبة من المحلات وخطوط النقل العام.',
  },
  {
    id: 'demo-011',
    slug: 'baghdad-adhamiyah-house',
    type: 'house',
    purpose: 'sale',
    governorate: 'baghdad',
    city: 'baghdad',
    district: 'adhamiyah',
    priceIqd: 340_000_000,
    bedrooms: 4,
    bathrooms: 3,
    areaSqm: 240,
    featured: false,
    yearBuilt: 2016,
    image:
      'https://images.pexels.com/photos/17174768/pexels-photo-17174768.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    descriptionEn:
      'Sample listing. Family house with a small courtyard and rooftop, in a well-established neighbourhood.',
    descriptionAr:
      'عرض توضيحي. منزل عائلي مع فناء صغير وسطح، في حيّ عريق.',
  },
  {
    id: 'demo-012',
    slug: 'baghdad-mansour-office',
    type: 'office',
    purpose: 'rent',
    governorate: 'baghdad',
    city: 'baghdad',
    district: 'al-mansour',
    priceIqd: 1_500_000,
    bedrooms: 0,
    bathrooms: 1,
    areaSqm: 140,
    featured: false,
    yearBuilt: 2019,
    image:
      'https://images.pexels.com/photos/946310/pexels-photo-946310.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    descriptionEn:
      'Sample listing. Ground-floor office space with reception area, suitable for a small business or clinic.',
    descriptionAr:
      'عرض توضيحي. مكتب في الطابق الأرضي مع منطقة استقبال، مناسب لعمل صغير أو عيادة.',
  },
];
