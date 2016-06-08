import * as mongoose from 'mongoose';
import * as express from 'express';
import {Harvest, IHarvestModel} from './model';
import {Plant, IPlantModel} from '../Plants/model';

export function create(req: express.Request, res: express.Response, next: Function) {
  req.body.user = req['payload']._id;
  Harvest.create(req.body, (err, harvest) => {
    if(err) return next(err);
    Plant.update({_id: harvest.plant}, {$push: {'harvests': harvest._id}}, (err, result) => {
      if(err) return next(err);
      res.json(harvest);
    });
  });
}

export function remove(req: express.Request, res: express.Response, next: Function) {
  Harvest.remove({_id: req.params.id}, (err) => {
    if(err) return next(err)
        res.json({message: 'Removed'});
  });
}

export function update(req: express.Request, res: express.Response, next: Function) {
  Harvest.update({_id: req.params.id, user: req['payload']._id}, req.body,(err, numRows: any) => {
    if (err) return next(err);
    res.json({message: 'Updated'});
  })
}
