module.exports = {
  siteMetadata: {
    title: 'Gamepad News',
    tagline: 'Your daily news \'em up',
    description: 'Byte-sized news pixels for the busy gamer.',
    siteUrl: 'https://gamepad.news',
  },
  pathPrefix: '/',
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-sitemap',
    {
        resolve: 'gatsby-plugin-favicon',
        options: {
            logo: './static/img/favicon.png'
        }
    },
    {
        resolve: `gatsby-source-filesystem`,
        options: {
            path: `${__dirname}/src/pages`,
            name: 'pages',
        },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
            {
                resolve: `gatsby-remark-images`,
                options: {
                maxWidth: 700,
                },
            },
            {
                resolve: `gatsby-remark-responsive-iframe`,
                options: {
                wrapperStyle: `margin-bottom: 1.0725rem`,
                },
            },
            'gatsby-remark-copy-linked-files',
            'gatsby-remark-smartypants',
            {
                resolve: "gatsby-remark-external-links",
                options: {
                    target: "_blank",
                    rel: "noopener"
                }
            }
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {       
        resolve: `gatsby-plugin-typography`,       
        options: {         
            pathToConfigModule: `src/utils/typography.js` 
        }    
    }
  ]
}
