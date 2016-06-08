namespace app.Services {
  interface IPlantResource extends ng.resource.IResource<IPlantResource>, app.i.IPlant {}
  interface IPlantClass extends ng.resource.IResourceClass<IPlantResource> {
    update(params: Object, body: Object)
  };

  export class PlantService {
    private PlantResource: IPlantClass;

    public getAll() {
      return this.PlantResource.query().$promise;
    }

    public getOne(id: string) {
      return this.PlantResource.get({id: id}).$promise;
    }

    public create(name, images, datePlanted, notes) {
      return this.PlantResource.save({name: name, images: images, datePlanted: datePlanted, notes: notes}).$promise;
    }

    public update(plant: app.i.IPlant) {
      return this.PlantResource.update({id: plant._id}, {name: plant.name, images: plant.images, datePlanted: plant.datePlanted, notes: plant.notes}).$promise;
    }

    public delete(id: string) {
      return this.PlantResource.remove({id: id}).$promise;
    }

    constructor(
      private $resource: ng.resource.IResourceService
    ) {this.PlantResource = <IPlantClass>$resource('/api/v1/plants/:id', null, {
        'update': { method: 'PUT'}
      });}
  };
  angular.module('app').service('PlantService', PlantService);
};
