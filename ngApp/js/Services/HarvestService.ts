namespace app.Services{
  interface IHarvestResourceClass extends app.i.IHarvest, ng.resource.IResource<IHarvestResourceClass>{}
  interface IHarvestResource extends ng.resource.IResourceClass<IHarvestResourceClass>{
    update(params: Object, body: Object)
  }

  export class HarvestService{
    private HarvestResource: IHarvestResource;

    public create(harvest:app.i.IHarvest) {
      return this.HarvestResource.save(harvest).$promise;
    }

    public remove(id: string) {
      return this.HarvestResource.remove({id:id}).$promise;
    }

    public update(harvest: app.i.IHarvest) {
      return this.HarvestResource.update({id: harvest._id}, {images: harvest.images, weight: harvest.weight, dateHarvested: harvest.dateHarvested, notes: harvest.notes}).$promise;
    }

    constructor(private $resource: ng.resource.IResourceService) {
      this.HarvestResource = <IHarvestResource>$resource('/api/v1/harvests/:id', null, {
        'update': {method: 'PUT'}
      });
    }
  }
  angular.module('app').service('HarvestService', HarvestService);
}
