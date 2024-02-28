import { Ubuntu_Mono, Pixelify_Sans } from "next/font/google";


export const ubuntu_mono_init = Ubuntu_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-ubuntu_mono',
  weight: ['400', '700']
})

export const pixelify_sans_init = Pixelify_Sans({
  subsets: ['latin'],
  display: 'block',
  variable: '--font-pixelify_sans',
  weight: ['400', '500', '600', '700']
})

export const ubuntu_mono = ubuntu_mono_init.variable
export const pixelify_sans = pixelify_sans_init.variable