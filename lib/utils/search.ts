export function searchByText<T>(
  items: T[],
  query: string,
  fields: (keyof T)[],
): T[] {
  const lowerQuery = query.toLowerCase();
  return items.filter(item =>
    fields.some(field => {
      const value = String(item[field]).toLowerCase();
      return value.includes(lowerQuery);
    }),
  );
}

export function fuzzySearch<T>(
  items: T[],
  query: string,
  field: (item: T) => string,
): T[] {
  const queries = query.toLowerCase().split('');
  return items.filter(item => {
    const text = field(item).toLowerCase();
    let qIdx = 0;
    for (let i = 0; i < text.length && qIdx < queries.length; i++) {
      if (text[i] === queries[qIdx]) qIdx++;
    }
    return qIdx === queries.length;
  });
}