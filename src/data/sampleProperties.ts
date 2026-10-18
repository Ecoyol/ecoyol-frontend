import type {
  Property,
  Governorate,
  City,
  PropertyType,
  ListingPurpose,
  District,
} from './properties';

export const GOVERNORATES: Record<Governorate, { en: string; ar: string }> = {
  baghdad: { en: 'Baghdad', ar: 'بغداد' },
  erbil: { en: 'Erbil', ar: 'أربيل' },
  basra: { en: 'Basra', ar: 'البصرة' },
  najaf: { en: 'Najaf', ar: 'النجف' },
  sulaymaniyah: { en: 'Sulaymaniyah', ar: 'السليمانية' },
  nineveh: { en: 'Nineveh', ar: 'نينوى' },
};

export const GOVERNORATE_CITIES: Record<Governorate, City[]> = {
  baghdad: ['baghdad'],
  erbil: ['erbil'],
  basra: ['basra'],
  najaf: ['najaf'],
  sulaymaniyah: ['sulaymaniyah'],
  nineveh: ['mosul'],
};

export const CITIES: Record<City, { en: string; ar: string }> = {
  baghdad: { en: 'Baghdad', ar: 'بغداد' },
  erbil: { en: 'Erbil', ar: 'أربيل' },
  basra: { en: 'Basra', ar: 'البصرة' },
  najaf: { en: 'Najaf', ar: 'النجف' },
  sulaymaniyah: { en: 'Sulaymaniyah', ar: 'السليمانية' },
  mosul: { en: 'Mosul', ar: 'الموصل' },
};

export const DISTRICTS: Record<District, { en: string; ar: string }> = {
  'al-mansour': { en: 'Al-Mansour', ar: 'المنصور' },
  jadriya: { en: 'Jadriya', ar: 'الجادرية' },
  karrada: { en: 'Karrada', ar: 'الكرادة' },
  adhamiyah: { en: 'Adhamiyah', ar: 'الأعظمية' },
  downtown: { en: 'Downtown', ar: 'وسط المدينة' },
  'italian-village': { en: 'Italian Village', ar: 'القرية الإيطالية' },
  corniche: { en: 'Corniche', ar: 'الكورنيش' },
  'qarmat-ali': { en: 'Qarmat Ali', ar: 'قرمت علي' },
  'al-ghadir': { en: 'Al-Ghadir', ar: 'الغدير' },
  ashti: { en: 'Ashti', ar: 'أشتي' },
  'al-zuhour': { en: 'Al-Zuhour', ar: 'الزهور' },
};

export const PROPERTY_TYPES: Record<PropertyType, { en: string; ar: string }> = {
  apartment: { en: 'Apartment', ar: 'شقة' },
  villa: { en: 'Villa', ar: 'فيلا' },
  house: { en: 'House', ar: 'منزل' },
  office: { en: 'Office', ar: 'مكتب' },
  land: { en: 'Land', ar: 'أرض' },
};

export const PURPOSES: Record<ListingPurpose, { en: string; ar: string }> = {
  sale: { en: 'For Sale', ar: 'للبيع' },
  rent: { en: 'For Rent', ar: 'للإيجار' },
};

export const SALE_BUDGET_STEPS_IQD = [100_000_000, 250_000_000, 500_000_000, 750_000_000, 1_000_000_000];

export const RENT_BUDGET_STEPS_IQD = [250_000, 500_000, 750_000, 1_000_000, 2_000_000];
