export function colorCalculationForeground (color: string) {
  return `color-mix(in srgb, ${color} 80%, black 20%)`;
}

export function colorCalculationBackground (color: string) {
  return `color-mix(in srgb, ${color} 15%, white)`;
}
