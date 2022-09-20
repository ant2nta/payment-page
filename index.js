const regexEmail = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

const getCountries = () => {
  return fetch('countries.json')
    .then(data => data.json());
};

$(function() {
  const select = $('.main__country');
  const months = $('.card__month');
  const years = $('.card__year');

  const year_now = (new Date()).getFullYear();

  getCountries().then(data => {
    for (let country of data) {
      select.append(`<option>${country}</option>`);
    }
  });
  
  for (let i = 1; i <= 31; i++) {
    months.append(`<option>${i}</option>`);
  }

  for (let i = year_now; i <= year_now + 10; i++) {
    years.append(`<option>${i.toString().slice(2)}</option>`);
  }

  const testError = $('.main__error');

  $('.main__email').keyup(function() {
    const emailValue = $(this).val();

    if (!regexEmail.test(emailValue)) {
      testError.css("visibility", "visible");
      $(this).css('border', '1px solid rgb(255, 0, 0)');
    } else {
      testError.css("visibility", "hidden");
      $(this).css('border', '1px solid rgb(255, 255, 255)');
    }
  });

  $('.images__image').click(function() {
    $('.images__image').fadeTo(0, 1);
    $(this).fadeTo(0, 0.7);
  });

  $('.form__btn').click(function() {
    if (regexEmail.test($('.main__email').val())) {
      alert('Form submitted');
    }
  });
});
