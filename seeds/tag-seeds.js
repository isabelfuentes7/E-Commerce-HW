const { Tag } = require('../models');

const tagData = [
  {
    tagName: 'white',
  },
  {
    tagName: 'black',
  },
  {
    tagName: 'gray',
  },
  {
    tagName: 'darkgary',
  }
];

const seedTags = () => Tag.bulkCreate(tagData);

module.exports = seedTags;
