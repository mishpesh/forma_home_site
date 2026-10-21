export const propertyTypes = ['Apartment', 'House', 'Commercial Space'] as const;
export type PropertyType = (typeof propertyTypes)[number];
export const packages = [
  {
    id: 'Basic',
    rate: 350,
    description: 'A thoughtful refresh.',
    details: 'Surface updates, new finishes and essential improvements.',
  },
  {
    id: 'Standard',
    rate: 600,
    description: 'A complete new chapter.',
    details: 'A full renovation with considered materials and practical upgrades.',
  },
  {
    id: 'Premium',
    rate: 950,
    description: 'Every detail, elevated.',
    details: 'Bespoke finishes, refined materials and exceptional attention to detail.',
  },
] as const;
export const extras = [
  {
    id: 'design',
    label: 'Interior Design',
    price: 65,
    unit: 'm²',
    description: 'A cohesive vision for your space.',
  },
  {
    id: 'kitchen',
    label: 'Kitchen Remodeling',
    price: 6000,
    unit: 'fixed',
    description: 'A kitchen made for your everyday.',
  },
  {
    id: 'bathroom',
    label: 'Bathroom Remodeling',
    price: 4000,
    unit: 'fixed',
    description: 'A considered private retreat.',
  },
  {
    id: 'smart',
    label: 'Smart Home Integration',
    price: 2500,
    unit: 'fixed',
    description: 'Thoughtful technology, seamlessly integrated.',
  },
] as const;
export type ExtraId = (typeof extras)[number]['id'];
export type Estimate = {
  property: PropertyType;
  area: number;
  tier: (typeof packages)[number]['id'];
  extras: ExtraId[];
};
export const defaultEstimate: Estimate = {
  property: 'Apartment',
  area: 75,
  tier: 'Standard',
  extras: [],
};
export const money = (n: number) =>
  new Intl.NumberFormat('en-IE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(n);
export function calculateEstimate(estimate: Estimate) {
  if (!Number.isInteger(estimate.area) || estimate.area < 25 || estimate.area > 250)
    throw new Error('Area must be a whole number between 25 and 250 m².');
  const pkg = packages.find((p) => p.id === estimate.tier);
  if (!pkg) throw new Error('Choose a valid renovation package.');
  const lines = [
    {
      label: `${pkg.id} renovation · ${estimate.area} m² × ${money(pkg.rate)}`,
      amount: estimate.area * pkg.rate,
    },
    ...extras
      .filter((e) => estimate.extras.includes(e.id))
      .map((e) => ({
        label: e.unit === 'm²' ? `${e.label} · ${estimate.area} m² × ${money(e.price)}` : e.label,
        amount: e.unit === 'm²' ? estimate.area * e.price : e.price,
      })),
  ];
  return { lines, total: lines.reduce((sum, l) => sum + l.amount, 0), rate: pkg.rate };
}
export function estimateParams(e: Estimate) {
  return new URLSearchParams({
    property: e.property,
    area: String(e.area),
    tier: e.tier,
    extras: e.extras.join(','),
  }).toString();
}
export function parseEstimate(params: { get: (key: string) => string | null }): Estimate | null {
  const property = params.get('property'),
    area = Number(params.get('area')),
    tier = params.get('tier');
  if (
    !propertyTypes.includes(property as PropertyType) ||
    !Number.isInteger(area) ||
    area < 25 ||
    area > 250 ||
    !packages.some((p) => p.id === tier)
  )
    return null;
  return {
    property: property as PropertyType,
    area,
    tier: tier as Estimate['tier'],
    extras: extras
      .filter((e) => (params.get('extras') || '').split(',').includes(e.id))
      .map((e) => e.id),
  };
}
export function estimateText(e: Estimate) {
  const result = calculateEstimate(e);
  return [
    'FORMA — Concept renovation estimate',
    'Barcelona, Spain',
    '',
    `Property: ${e.property}`,
    `Area: ${e.area} m²`,
    `Package: ${e.tier}`,
    '',
    ...result.lines.map((l) => `${l.label}: ${money(l.amount)}`),
    '',
    `Estimated total: ${money(result.total)}`,
    '',
    'Demonstration prices only. This is not a commercial quotation. No property-type multipliers, taxes, fees or other markups have been added. Actual scope and pricing require a professional assessment.',
    'Concept website — portfolio demonstration',
  ].join('\n');
}
