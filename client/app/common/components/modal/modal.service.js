import angular from 'angular';
import _ from 'lodash';

import Alert from './alert-modal.component';
import Confirmation from './confirmation-modal.component';
import ConfirmationOverlay from './confirmation-overlay-modal.component';

export class ModalService {
  constructor($uibModal, $document) {
    'ngInject';
    this.Modal = $uibModal;
    this.modalOverlays = {};
    this.document = $document;
  }

  /**
   * Opens a modal
   * @param  {String} component - Registered component's name in angular responsible for the Modal presentation & logic
   * @param  {Object} resolve   - Data to be sent to the component through the bindings
   * @param  {Object} options   - Additional UI-bootstrap options to be passed (size, windowClass, animation, appendTo ...)
   *
   * @return {Object}           - Promise that will be resolved if the modal is closed (a.k.a accepted) or rejected in case the modal is dismissed
   */
  open(component, resolve, options = {}) {
    const modalSettings = angular.extend({}, {
      keyboard: true,
      animation: true,
      backdrop: 'static',

      component,
      resolve,
    }, options);

    return this.Modal.open(modalSettings).result;
  }

  confirm(title, question) {
    return this.Modal.open({
      keyboard: false,
      animation: true,
      component: 'confirmationModal',
      resolve: {
        title: () => title,
        question: () => question
      }
    }).result;
  }

  alert(title, message, buttonText, config) {
    let defaultConfig = {
      keyboard: false,
      animation: true,
      component: 'alertModal',
      resolve: {
        title: () => title,
        message: () => message,
        buttonText: () => buttonText || 'Ok'
      }
    };

    return this.Modal.open(_.merge(defaultConfig, config)).result;
  }

  registerOverlay(id, openUpFn) {
    this.modalOverlays[id] = openUpFn;
  }

  unregisterOverlay(id) {
    Reflect.deleteProperty(this.modalOverlays, id);
  }

  openOverlay(id, properties, scrollToTop = false) {
    if (scrollToTop) {
      this.document[0].querySelector('[uib-modal-window="modal-window"]').scrollTop = 0;
    }

    return this.modalOverlays[id](properties);
  }
}

export function ModalDirective() {
  return {
    restrict: 'A',
    link: (scope, element) => {
      Object.assign(scope.$uibModalInstance, {
        $addClassInDialog: cls => element.children().addClass(cls),
        $removeClassInDialog: cls => element.children().removeClass(cls),
        $toggleClassInDialog: cls => element.children().toggleClass(cls)
      });
    }
  };
}

export default angular.module('webpack-angular1.components.modal', [Alert, Confirmation, ConfirmationOverlay])
  .service('ModalService', ModalService)
  .directive('uibModalWindow', ModalDirective)
  .name;
