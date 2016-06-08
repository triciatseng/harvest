namespace app.i{
  export interface IPlant{
    _id: any;
    name: string;
    images: [any];
    datePlanted: number;
    notes: string;
    user: (string | IUser);
    harvests: [string | IHarvest];
  }
}
