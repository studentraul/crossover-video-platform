import { truncateString } from '../utils/string'

describe('Truncate string', () => {
  test('should return "A-tisket..."', () => {
    expect(
      truncateString('A-tisket a-tasket A green and yellow basket', 11),
    ).toBe('A-tisket...')
  })
  test('should return "Peter Piper...".', () => {
    expect(
      truncateString('Peter Piper picked a peck of pickled peppers', 14),
    ).toBe('Peter Piper...')
  })
  test('should return "A-tisket a-tasket A green and yellow basket".', () => {
    expect(
      truncateString(
        'A-tisket a-tasket A green and yellow basket',
        'A-tisket a-tasket A green and yellow basket'.length,
      ),
    ).toBe('A-tisket a-tasket A green and yellow basket')
  })
  test('should return "A-tisket a-tasket A green and yellow basket".', () => {
    expect(
      truncateString(
        'A-tisket a-tasket A green and yellow basket',
        'A-tisket a-tasket A green and yellow basket'.length + 2,
      ),
    ).toBe('A-tisket a-tasket A green and yellow basket')
  })
  test('should return "A...".', () => {
    expect(truncateString('A-', 1)).toBe('A...')
  })
  test('should return "Ab...".', () => {
    expect(truncateString('Absolutely Longer', 2)).toBe('Ab...')
  })
})
