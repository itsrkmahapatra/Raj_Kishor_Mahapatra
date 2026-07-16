const fs = require('fs');
const path = require('path');

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("Cert");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("sitemap.xml");

  return {
    dir: {
      input: "src",
      includes: "components",
      layouts: "layouts",
      output: "dist"
    },
    templateFormats: ["html", "njk", "md"]
  };
};
