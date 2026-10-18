export type PropertyType = 'apartment' | 'villa' | 'house' | 'office' | 'land';
export type ListingPurpose = 'sale' | 'rent';
export type Governorate =
  | 'baghdad'
  | 'erbil'
  | 'basra'
  | 'najaf'
  | 'sulaymaniyah'
  | 'nineveh';
export type City =
  | 'baghdad'
  | 'erbil'
  | 'basra'
  | 'najaf'
  | 'sulaymaniyah'
  | 'mosul';

export type District =
  | 'al-mansour'
  | 'jadriya'
  | 'karrada'
  | 'adhamiyah'
  | 'downtown'
  | 'italian-village'
  | 'corniche'
  | 'qarmat-ali'
  | 'al-ghadir'
  | 'ashti'
  | 'al-zuhour';

export interface Property {
  id: string;
  slug: string;
  type: PropertyType;
  purpose: ListingPurpose;
  governorate: Governorate;
  city: City;
  district: District;
  priceIqd: number;
  bedrooms: number;
  bathrooms: number;
  areaSqm: number;
  featured: boolean;
  yearBuilt: number;
  image: string;
  descriptionEn: string;
  descriptionAr: string;
}

export interface Filters {
  type: PropertyType | 'any';
  governorate: Governorate | 'any';
  city: City | 'any';
  purpose: ListingPurpose | 'any';
  minPriceIqd: number | null;
  maxPriceIqd: number | null;
  minBedrooms: number | 'any';
  query: string;
}
