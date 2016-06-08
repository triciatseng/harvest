import * as mongoose from 'mongoose';

export interface IPlantModel extends app.i.IPlant, mongoose.Document{}

let plantSchema = new mongoose.Schema({
  name: {type: String, required: true},
  images: [],
  datePlanted: {type: Number},
  notes: {type: String},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  harvests: [{type: mongoose.Schema.Types.ObjectId, ref: 'Harvests'}]
})

export let Plant = mongoose.model<IPlantModel>('Plants', plantSchema);
