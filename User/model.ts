import * as mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';


export interface IUserModel extends app.i.IUser, mongoose.Document{
  generateJWT(): string;
}

let userSchema = new mongoose.Schema({
  email: {type: String, lowercase: true, trim: true, unique: true, sparse: true, required: true},
  name: {type: String, required: true},
  plants: [{type: mongoose.Schema.Types.ObjectId, ref: 'Plants'}],
  harvests: [{type: mongoose.Schema.Types.ObjectId, ref: 'Harvets'}],
  facebook: {id: String, token: String}
});

userSchema.method('generateJWT', function() {
  return jwt.sign({
    name: this.name,
    email: this.email,
    _id: this._id
  }, process.env.JWT_SECRET);
});

export let User = mongoose.model<IUserModel>('User', userSchema);
