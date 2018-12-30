import angular from 'angular';

export default angular.module('verizon-pnb-ppm.components.modal.confirmation', [])
  .component('confirmationModal', {
    template:
      `<div class="modal-header">
        <h3 class="modal-title" id="modal-title">{{::$ctrl.resolve.title}}</h3>
        <i class="fa fa-times pointer" ng-click="$ctrl.dismiss()"></i>
      </div>
      <div class="modal-body" id="modal-body">
        <p>{{ ::$ctrl.resolve.question }}</p>
      </div>
      <div class="modal-footer" style="padding: 15px 215px;">
        <button class="btn btn-secondary no-arrow-icon" ng-click="$ctrl.dismiss()">No</button>
        <button class="btn btn-primary no-arrow-icon" ng-click="$ctrl.close()">Yes</button>
      </div>`,
    bindings: {
      resolve: '<',
      dismiss: '&',
      close: '&'
    },
  })
  .name;
