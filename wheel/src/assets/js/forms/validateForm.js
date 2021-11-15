import $ from 'jquery';
import 'jquery-validation';

const validateForm = (el) => {
  $(el).validate({
    ignore: '.is-hidden *',
    ignoreTitle: true,
    validClass: 'is-valid',
    errorClass: 'error',
    errorElement: 'p',
    errorPlacement: (error, element) => {
      $(element).closest('.input__group').append(error);
    }
  });
};

export default validateForm;
