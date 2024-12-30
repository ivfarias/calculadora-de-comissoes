import localFont from 'next/font/local'

export const graphik = localFont({
  src: [
    {
      path: './fonts/Graphik-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/Graphik-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Graphik-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Graphik-Semibold.otf',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-graphik',
})

