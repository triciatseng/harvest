namespace app.Controllers{
  export class PlantUpdateController {
      public status;
      public plant: app.i.IPlant;

      public update() {
        this.PlantService.update(this.plant).then((res) => {
            this.$state.go('Home');
        });
      }

      public remove() {
        this.PlantService.delete(this.plant._id).then(() => {
            this.$state.go('Home');
        });
      }

      constructor(private UserService: app.Services.UserService,
          private PlantService: app.Services.PlantService,
          private $stateParams: ng.ui.IStateParamsService,
          private $state: ng.ui.IStateService,
          private $http: ng.IHttpService) {
          this.status = UserService.status;
          PlantService.getOne($stateParams['id']).then((res) => {
              this.plant = res;
          });
      }
  }
  angular.module('app').controller('PlantUpdateController', PlantUpdateController);
}
