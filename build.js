const metalsmith = require('metalsmith')
const markdown = require('metalsmith-markdown')
const assets = require('metalsmith-assets')

const layouts = require('metalsmith-layouts')
const collections = require('metalsmith-collections')
const permalinks = require('metalsmith-permalinks')
const sass = require('metalsmith-sass')
const sitemap = require('metalsmith-sitemap')
const nunjucks = require('nunjucks')

metalsmith(__dirname)
    .metadata({
      site: {
        name: 'Paula Halldin',
        description: 'Paula Halldins Personal Site'
      }
    })
    .source('./src')
    .destination('./public')
    .clean(true)
    .use(collections({
      articles: {
        pattern: 'articles/**/*.md',
        sortBy: 'rank',
        reverse: true

      },
      social: {
        pattern: 'social/**/*.md',
        sortBy: 'rank',
        reverse: true
      }
    }))
    .use(markdown())
    .use(permalinks({
      relative: false,
      pattern: ':title',
        // each linkset defines a match, and any other desired option
      linksets: [{
        match: { collection: 'articles' },
        pattern: 'work/:title'
      }]
    }))
    .use(sass({
      outputStyle: 'expanded',
      outputDir: './assets/css/'
    }))
    .use(assets({
      source: './src/assets', // relative to the working directory
      destination: './assets' // relative to the build directory
    }))
    .use(layouts({
      engine: 'nunjucks',
      directory: './layouts',
      default: 'article.html',
      pattern: ['*/*/*.html', '*/*.html', '*.html'],
      partials: './layouts/partials'
    }))
    .use(sitemap({
      'hostname': 'http://www.halld.in',
      'pattern': ['**/*.html', '!page/**'],
      'omitIndex': true
    }))
    .build((err) => {
      if (err) {
        console.log(err)
      } else {
        console.log('Successfully forged boilerplate!')
      }
    })
