export function jsonParse<T = any>(json: string): T | null {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function jsonStringify(obj: any): string | null {
  try {
    return JSON.stringify(obj);
  } catch {
    return null;
  }
}

export function csvToJson(csv: string): Record<string, any>[] {
  const lines = csv.trim().split('\n');
  const headers = lines[0].split(',');
  return lines.slice(1).map(line => {
    const obj: Record<string, any> = {};
    const values = line.split(',');
    headers.forEach((header, i) => {
      obj[header.trim()] = values[i]?.trim() || '';
    });
    return obj;
  });
}