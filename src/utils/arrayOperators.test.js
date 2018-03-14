import { areEqual } from './arrayOperators';

describe('Array Operator Utils', () => {
  describe('areEqual operator', () => {
    it('should return true on arrays with the same entry and order', () => {
      expect(areEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    });

    it('should not return true on arrays that have the same entries but are ordered differently', () => {
      expect(areEqual([1, 2, 3], [1, 3, 2])).toBe(false);
    });

    it('should not return true on arrays that have different elements altogether', () => {
      expect(areEqual([1, 2, 3], [7, 8, 9])).toBe(false);
    });
  });
});
