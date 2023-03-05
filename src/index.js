import Handlebars from 'handlebars';

Handlebars.registerHelper('isImg', function (value) {
    return value === 'img';
});
  
