import 'react'

declare module 'react' {
  // Required to match React's generic interface shape during declaration merging.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ImgHTMLAttributes<_T> {
    fetchpriority?: 'high' | 'low' | 'auto'
  }
}
