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
    { path: './fonts/neue_montreal/NeueMontreal-Light.otf', weight: '300', style: 'normal' },
    { path: './fonts/neue_montreal/NeueMontreal-Italic.otf', weight: '400', style: 'italic' },
    { path: './fonts/neue_montreal/NeueMontreal-BoldItalic.otf', weight: '700', style: 'italic' },
    { path: './fonts/neue_montreal/NeueMontreal-MediumItalic.otf', weight: '500', style: 'italic' },
    { path: './fonts/neue_montreal/NeueMontreal-LightItalic.otf', weight: '300', style: 'italic' },
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

export const jetbrainsMono = localFont({
  src: [
    { path: './fonts/jetbrains_mono/JetBrainsMono-VariableFont_wght.ttf', weight: '100 900', style: 'normal' },
    { path: './fonts/jetbrains_mono/JetBrainsMono-Italic-VariableFont_wght.ttf', weight: '100 900', style: 'italic' },
  ],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const lato = localFont({
  src: [
    { path: './fonts/lato/Lato-Regular.ttf', weight: '400', style: 'normal' },
    { path: './fonts/lato/Lato-Bold.ttf', weight: '700', style: 'normal' },
    { path: './fonts/lato/Lato-Light.ttf', weight: '300', style: 'normal' },
    { path: './fonts/lato/Lato-Thin.ttf', weight: '100', style: 'normal' },
    { path: './fonts/lato/Lato-Italic.ttf', weight: '400', style: 'italic' },
    { path: './fonts/lato/Lato-BoldItalic.ttf', weight: '700', style: 'italic' },
    { path: './fonts/lato/Lato-LightItalic.ttf', weight: '300', style: 'italic' },
    { path: './fonts/lato/Lato-ThinItalic.ttf', weight: '100', style: 'italic' },
  ],
  variable: '--font-lato',
  display: 'swap',
}); 