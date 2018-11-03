import Typography from 'typography'
import parnassusTheme from 'typography-theme-parnassus'

parnassusTheme.baseFontSize = '18px' 
parnassusTheme.overrideThemeStyles = ({ rhythm }, options) => ({
    'p, li': {
      fontFamily: 'Noto Sans, Open Sans, sans-serif'
    },
    'li': {
        marginBottom: '0.5rem',
        listStyleType: 'none'
    },
    'ul': {
        marginLeft: '0'
    }
  })

const typography = new Typography(parnassusTheme)

export default typography