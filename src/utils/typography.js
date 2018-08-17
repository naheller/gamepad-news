import Typography from 'typography'
import Alton from 'typography-theme-alton'


Alton.baseFontSize = '19px'
Alton.baseLineHeight = 1.666
// Alton.headerFontFamily = ['Open Sans', 'sans-serif']
// Alton.bodyFontFamily = ['Georgia', 'serif']

Alton.overrideThemeStyles = ({ rhythm }, options) => ({
    'h1': {
        color: '#191919',
        letterSpacing: '-1px'
    },
    'h2,h3': {
        color: '#191919',
        marginBottom: rhythm(1),
        marginTop: rhythm(2),
    }
  })

const typography = new Typography(Alton)
typography.toString()

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
