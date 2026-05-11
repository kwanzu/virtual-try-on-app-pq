export function sortBy<T>(arr: T[], key: (item: T) => any, order: 'asc' | 'desc' = 'asc'): T[] {
  const sorted = [...arr];
  sorted.sort((a, b) => {
    const aVal = key(a);
    const bVal = key(b);
    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;
    return 0;
  });
  return sorted;
}

export function sortByMultiple<T>(
  arr: T[],
  keys: { key: (item: T) => any; order?: 'asc' | 'desc' }[],
): T[] {
  return [...arr].sort((a, b) => {
    for (const { key, order = 'asc' } of keys) {
      const aVal = key(a);
      const bVal = key(b);
      if (aVal !== bVal) {
        return (aVal < bVal ? -1 : 1) * (order === 'asc' ? 1 : -1);
      }
    }
    return 0;
  });
}