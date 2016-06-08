namespace app.Controllers {
  export class PlantAddController {
    public plant: app.i.IPlant;
    public status;

    public create(){
        this.PlantService.create(this.plant.name, this.plant.images, this.plant.datePlanted, this.plant.notes).then(()=>{
            this.$state.go('Home');
        })
    }

    constructor(
      private PlantService: app.Services.PlantService,
      private $state: ng.ui.IStateService,
      private UserService: app.Services.UserService
    ) {
      this.status = UserService.status;
    }
  }
  angular.module('app').controller('PlantAddController', PlantAddController);
}
