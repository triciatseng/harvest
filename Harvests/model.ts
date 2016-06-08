import * as mongoose from 'mongoose';

export interface IHarvestModel extends app.i.IHarvest, mongoose.Document{}

let harvestSchema = new mongoose.Schema({
  weight: {type: Number, required: true},
  dateHarvested: {type: Number, required: true},
  images: [],
  notes: {type: String},
  plant: {type: mongoose.Schema.Types.ObjectId, ref: 'Plants', required: true},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

export let Harvest = mongoose.model<IHarvestModel>('Harvests', harvestSchema);
