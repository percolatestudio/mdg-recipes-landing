$(function() {
  FastClick.attach(document.body);

  var url = 'http://meetsous.com';

  $('[data-facebook=button]').social({
    network: 'facebook',
    counter: '[data-facebook=counter]',
    url: url
  });
  
  $('[data-twitter=button]').social({
    network: 'twitter',
    counter: '[data-twitter=counter]',
    url: url
  });
  
  $().social({
    network: 'github',
    counter: '[data-github=counter]',
    prefix: 'meteor', //XXX: changeme, github user
    url: 'meteor' //XXX: changeme, github repo
  });

});