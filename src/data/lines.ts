export const lineColors: Record<string, string> = {
  '1호선': '#0052A4',
  '2호선': '#3CB44B',
  '3호선': '#EF7C1C',
  '4호선': '#00A5DE',
  '5호선': '#996CAC',
  '6호선': '#CD7C2F',
  '7호선': '#747F00',
  '8호선': '#E6186C',
  '9호선': '#BDB092',
  '신분당선': '#D4003B',
  'GTX-A': '#9A6292',
};

export const getLineColor = (line: string): string => {
  return lineColors[line] || '#666666';
};
