import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateEstimate,
  defaultEstimate,
  estimateParams,
  parseEstimate,
  estimateText,
  packages,
  propertyTypes,
} from '../lib/estimate';
test('required 75 m² Standard example totals €55,875', () => {
  const r = calculateEstimate({ ...defaultEstimate, extras: ['design', 'kitchen'] });
  assert.equal(r.total, 55875);
  assert.deepEqual(
    r.lines.map((l) => l.amount),
    [45000, 4875, 6000],
  );
});
test('all rates, property types and area boundaries use no property coefficients', () => {
  for (const pkg of packages)
    for (const property of propertyTypes)
      for (const area of [25, 75, 250])
        assert.equal(
          calculateEstimate({ property, area, tier: pkg.id, extras: [] }).total,
          area * pkg.rate,
        );
});
test('all additional services apply once, with design per m²', () => {
  assert.equal(
    calculateEstimate({ ...defaultEstimate, extras: ['design', 'kitchen', 'bathroom', 'smart'] })
      .total,
    62375,
  );
  assert.equal(
    calculateEstimate({ ...defaultEstimate, extras: ['kitchen', 'kitchen'] }).total,
    51000,
  );
});
test('rejects invalid areas', () => {
  for (const area of [0, 24, 251, NaN, Infinity, 75.5])
    assert.throws(() => calculateEstimate({ ...defaultEstimate, area }));
});
test('consultation query roundtrip preserves every estimate parameter', () => {
  const input = { ...defaultEstimate, extras: ['design', 'kitchen'] as const };
  const e = { ...input, extras: [...input.extras] };
  assert.deepEqual(parseEstimate(new URLSearchParams(estimateParams(e))), e);
});
test('malformed query is rejected and unknown extras cannot affect pricing', () => {
  assert.equal(parseEstimate(new URLSearchParams('area=999&property=House&tier=Basic')), null);
  assert.equal(parseEstimate(new URLSearchParams('area=75&property=Boat&tier=Basic')), null);
  const e = parseEstimate(
    new URLSearchParams('area=75&property=House&tier=Basic&extras=unknown,design'),
  );
  assert.deepEqual(e?.extras, ['design']);
});
test('download includes breakdown, settings and demonstration notice', () => {
  const text = estimateText({ ...defaultEstimate, extras: ['design', 'kitchen'] });
  assert.match(text, /€55,875/);
  assert.match(text, /Demonstration prices only/);
  assert.match(text, /Area: 75 m²/);
  assert.match(text, /Kitchen Remodeling: €6,000/);
});
