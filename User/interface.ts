namespace app.i{
  export interface IUser{
    _id: any;
    email: string;
    name: string;
    plants?: Array<string>;
    harvests?: Array<string>;
    facebook: {id: string, token: string},
  }
}
