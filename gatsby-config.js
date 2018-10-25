// const { aws } = require('./keys.json')

module.exports = {
  siteMetadata: {
    title: 'Gamepad News',
    author: 'Nathan Heller',
    description: 'Video game news blog',
    siteUrl: 'https://gamepad.news',
  },
  pathPrefix: '/',
  plugins: [
    `gatsby-plugin-sass`,
    {
        resolve: `gatsby-source-filesystem`,
        options: {
            path: `${__dirname}/src/pages`,
            name: 'pages',
        },
    },
    {
        resolve: 'gatsby-source-s3',
        options: {
            aws: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                region: process.env.AWS_REGION,
                // accessKeyId: aws.accessKey,
                // secretAccessKey: aws.secret,
                // region: aws.region
            },
            buckets: ['gamepad-images-east'],
        },
    },
    // {
    //     resolve: 'gatsby-source-s3-image',
    //     options: {
    //         bucketName: 'gamepad-images',
    //         domain: null, // defaults to `s3.amazonaws.com` // Oregon 's3-us-west-2.amazonaws.com'
    //         protocol: 'https',
    //     },
    // },
    // {
    //     resolve: `gatsby-source-filesystem`,
    //     options: {
    //         name: `img`,
    //         path: `${__dirname}/src/img/`
    //     }
    // },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
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
    // {
    //   resolve: 'gatsby-plugin-typography',
    //   options: {
    //     pathToConfigModule: 'src/utils/typography',
    //   },
    // },
  ]
}
