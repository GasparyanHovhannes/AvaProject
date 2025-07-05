export function serializeUnavailable(unavailable: any): string[] {
  if (!unavailable) return [];
  if (Array.isArray(unavailable)) {
    return unavailable.map(ts =>
      ts && typeof ts.toDate === "function"
        ? ts.toDate().toISOString()
        : typeof ts === "string"
          ? ts
          : ""
    ).filter(Boolean);
  }
  if (typeof unavailable?.toDate === "function") {
    return [unavailable.toDate().toISOString()];
  }
  if (typeof unavailable === "string") {
    return [unavailable];
  }
  return [];
}