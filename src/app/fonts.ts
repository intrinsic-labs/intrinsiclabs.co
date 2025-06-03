import localFont from 'next/font/local';

export const callingCode = localFont({
  src: [
    { path: './fonts/calling_code/CallingCode-Regular.ttf', weight: '400', style: 'normal' },
  ],
  variable: '--font-calling-code',
  display: 'swap',
});

export const neueMontreal = localFont({
  src: [
    { path: './fonts/neue_montreal/NeueMontreal-Regular.otf', weight: '400', style: 'normal' },
    { path: './fonts/neue_montreal/NeueMontreal-Bold.otf', weight: '700', style: 'normal' },
    { path: './fonts/neue_montreal/NeueMontreal-Medium.otf', weight: '500', style: 'normal' },
  ],
  variable: '--font-neue-montreal',
  display: 'swap',
});

export const cardo = localFont({
  src: [
    { path: './fonts/cardo/Cardo-Regular.ttf', weight: '400', style: 'normal' },
    { path: './fonts/cardo/Cardo-Bold.ttf', weight: '700', style: 'normal' },
    { path: './fonts/cardo/Cardo-Italic.ttf', weight: '400', style: 'italic' },
  ],
  variable: '--font-cardo',
  display: 'swap',
});

export const lato = localFont({
  src: [
    { path: './fonts/lato/Lato-Regular.ttf', weight: '400', style: 'normal' },
    { path: './fonts/lato/Lato-Bold.ttf', weight: '700', style: 'normal' },
    { path: './fonts/lato/Lato-Italic.ttf', weight: '400', style: 'italic' },
    { path: './fonts/lato/Lato-BoldItalic.ttf', weight: '700', style: 'italic' },
  ],
  variable: '--font-lato',
  display: 'swap',
}); 