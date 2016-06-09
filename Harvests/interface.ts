namespace app.i {
  export interface IHarvest {
    _id: any;
    dateHarvested: number;
    weightLB: number;
    weightOZ: number;
    images: [any];
    notes: string;
    plant: (string | IPlant);
    user: (string | IUser);
  }
}
