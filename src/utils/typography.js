import Typography from 'typography'
// import Alton from 'typography-theme-alton'


// Alton.baseFontSize = '18px'
// Alton.baseLineHeight = 1.666
// Alton.headerFontFamily = 'OctLight'
// Alton.bodyFontFamily = ['Noto Sans', 'sans-serif']

// Alton.overrideThemeStyles = ({ rhythm }, options) => ({
//     baseFontSize: '18px',
//     baseLineHeight: 1.666,
//     'h1': {
//         color: '#191919',
//         // letterSpacing: '-1px'
//     },
//     'h2,h3': {
//         color: '#191919',
//         marginBottom: rhythm(1),
//         marginTop: rhythm(2),
//     }
//   })

const typography = new Typography({
    baseFontSize: '18px',
    baseLineHeight: 1.666,
    'h1,h2,h3,p': {
        color: '#191919',
        // letterSpacing: '-1px'
    }
  })
typography.toString()

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
