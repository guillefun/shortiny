import { Ubuntu_Mono } from "next/font/google";


export const ubuntu_mono_init = Ubuntu_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-ubuntu-mono',
  weight: ['400', '700']
})

export const ubuntu_mono = ubuntu_mono_init.variable