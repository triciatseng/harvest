namespace app.i {
  export interface IHarvest {
    _id: any;
    dateHarvested: number;
    weight: number;
    images: [any];
    notes: string;
    plant: (string | IPlant);
    user: (string | IUser);
  }
}
