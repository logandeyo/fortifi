import initModule from './lib/initModule';
import navToggle from '../../components/01-fragments/nav-toggle/nav-toggle';
import AlertModal from '../../components/02-components/alert-modal/alert-modal';
import Modal from '../../components/02-components/modal/modal';
import ApplyNowForm from '../../components/02-components/apply-now-form/apply-now-form';
import FormsConditionalValidation from '../../components/02-components/forms/conditional-validation';
import multiStepForm from './forms/multi-step';
import validateForm from './forms/validateForm';

initModule(navToggle, '.js-nav-toggle');
initModule(AlertModal, '.alert-modal');
initModule(ApplyNowForm, '.apply-now-form');
initModule(FormsConditionalValidation, '#get-started');
initModule(Modal, '.modal:not(.modal--consent)');
initModule(multiStepForm, '.form--multistep');
initModule(validateForm, '.form--validate');
