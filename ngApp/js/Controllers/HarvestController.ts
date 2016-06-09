namespace app.Controllers {
    export class HarvestController {
        public plant: app.i.IPlant;
        public status;
        public harvest: app.i.IHarvest;

        public addHarvest() {
            this.harvest.plant = this.plant._id;
            this.HarvestService.create(this.harvest).then((res) => {
                this.plant.harvests.push(res);
                this.harvest.dateHarvested;
                this.harvest.weightLB;
                this.harvest.weightOZ;
                this.harvest.images;
                this.harvest.notes="";
                this.$state.reload();
            });
        }

        public removeHarvest(harvest: app.i.IHarvest) {
            this.HarvestService.remove(harvest._id).then(() => {
                this.plant.harvests.splice(this.plant.harvests.indexOf(harvest), 1);
            });
        }

        public updateHarvest() {
          this.HarvestService.update(this.harvest).then(() => {
            this.$state.go('Home');
          })
        }

        constructor(
            private UserService: app.Services.UserService,
            private PlantService: app.Services.PlantService,
            private HarvestService: app.Services.HarvestService,
            private $stateParams: ng.ui.IStateParamsService,
            private $state: ng.ui.IStateService
            ) {
            this.status = UserService.status;
            PlantService.getOne($stateParams['id']).then((res) => {
              this.plant = res;
            });
        }
    }
    angular.module('app').controller("HarvestController", HarvestController);
}
