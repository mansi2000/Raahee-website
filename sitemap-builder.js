require('babel-register')({
  presets: ['es2015', 'react'],
});

const Sitemap = require('react-router-sitemap').default;
const router = require('./router').default;

(
  new Sitemap(router)
    .build('https://raahee.in')
    .save('./public/sitemap.xml')
);
