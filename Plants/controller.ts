import * as mongoose from 'mongoose';
import * as express from 'express';
import {Plant, IPlantModel} from './model';
import {User, IUserModel} from '../User/model';
import {Harvest, IHarvestModel} from '../Harvests/model';

export function getAll(req: express.Request, res: express.Response, next: Function) {
    Plant.find({_id: req.params.id})
    .populate('user', 'name')
    .exec((err, items)=>{
        if (err) return next (err);
        res.json(items);
    });
}

export function getOne(req: express.Request, res: express.Response, next: Function) {
    Plant.findOne({_id: req.params.id})
    .populate('user', 'name')
    .populate('harvests', '-plant')
    .exec((err, data)=>{
        if (err) return next(err);
        Harvest.populate(data.harvests, {path: 'user', select:'name', model: 'User'}, (err, response) => {
            if (err) return next(err);
            res.json(data);
        });
    });
}

export function create(req: express.Request, res: express.Response, next: Function) {
    req.body.user = req['payload']._id;
    Plant.create(req.body, (err, plant:IPlantModel) => {
      if (err) return next(err);
      res.json(plant);
    });
}

export function update(req: express.Request, res: express.Response, next: Function) {
    Plant.update({_id: req.params.id, user: req['payload']._id}, req.body,(err, numRows: any) => {
        if (err) return next(err);
        res.json({message: 'Updated!'});
    })
}

export function remove(req: express.Request, res: express.Response, next: Function) {
    Plant.findOneAndRemove({_id: req.params.id, user: req['payload']._id}, (err, plant) => {
        if (err) return next(err);
        if (plant) {
            Harvest.remove({plant: req.params.id}, (err) => {
                if (err) return next (err);
                User.update({_id: req['payload']._id}, {$pull: {plants: plant._id}}, (err, numRows: any) =>{
                    if (err) return next (err);
                    if (numRows.nModified === 0) return next({ message: "Could not update.", status: 500 });
                    res.json({message: 'Removed'});
                })
            });
        }else {
            next({message: 'Unable to delete', status: 500});
        }
    });
}
