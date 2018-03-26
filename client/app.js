function ready(fn) {
  if (document.readyState != 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

var getValues = function() {
  // grab our form values
  var name = document.querySelector('input[name=lion-name]').value;
  var pride = document.querySelector('input[name=lion-pride]').value;
  var age = document.querySelector('input[type=number]').value;
  var gender = document.querySelector('select');
  gender = gender.options[gender.selectedIndex].value;

  document.querySelector('input[name=lion-name]').value = '';
  document.querySelector('input[name=lion-pride]').value = '';
  document.querySelector('input[type=number]').value = '';

  return {
    name: name,
    pride: pride,
    age: age,
    gender: gender
  };
};

var lions = [];

const lionTemplate =
  '<h3><%= name %></h3>' + '<h3><%= pride %></h3>' + '<small>age: <%= age %></small>' + '<small><%= gender %></small>';

const makeTemplate = data => {
  const li = document.createElement('li');
  const lionList = document.querySelector('.lion-list');
  const compiled = _.template(lionTemplate);
  const lionHtml = compiled(data);
  li.innerHTML = lionHtml;
  lionList.insertBefore(li, lionList.firstChild);
};

const updateLionList = () => {
  const lionData = lions[lions.length - 1];
  makeTemplate(lionData);
};

const makeLionList = () => {
  lions.forEach(lion => {
    makeTemplate(lion);
  });
};

const getAllLions = () => {
  fetch('/lions')
    .then(res => {
      console.log(res);
      return res.json();
    })
    .then(data => {
      lions = lions.concat(data);
      makeLionList();
    });
};

ready(function() {
  getAllLions();
  var form = document.querySelector('form');

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    var values = getValues();

    fetch('/lions', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(values)
    })
      .then(function(res) {
        return res.json();
      })
      .then(function(createdLion) {
        lions.push(createdLion);
        updateLionsList();
      });
    return false;
  });
});
