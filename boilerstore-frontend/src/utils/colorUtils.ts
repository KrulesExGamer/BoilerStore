import { hex, rgb } from 'color-convert';

// Function to find the middle point between two colors
export function findMiddleColor(color1: string, color2: string): string {
  const rgb1 = hex.rgb(color1);
  const rgb2 = hex.rgb(color2);

  const averageRgb = [
    Math.floor((rgb1[0] + rgb2[0]) / 2),
    Math.floor((rgb1[1] + rgb2[1]) / 2),
    Math.floor((rgb1[2] + rgb2[2]) / 2)
  ];

  return rgb.hex(averageRgb[0], averageRgb[1], averageRgb[2]);
}

