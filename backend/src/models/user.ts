import mongoose, { Schema, Document, Model } from 'mongoose';
import jwt from 'jsonwebtoken';

const UserSchema: Schema = new Schema({
  username: String,
  email: String,
  profileImage: String,
  loginType: String,
});

interface IUserDocument extends Document {
  username: String;
  email: String;
  profileImage: String;
  loginType: String;
}

interface IUser extends IUserDocument {
  generateToken: () => string;
}

interface IUserModel extends Model<IUser> {
  findByEmail: (email: string) => mongoose.Query<IUser>;
}

UserSchema.static('findByEmail', function (email: string) {
  return this.findOne({ email });
});

UserSchema.method('generateToken', function () {
  const token = jwt.sign( 
    {
      _id: this.id,
      email: this.email,
      username: this.username,
      loginType: this.loginType,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d',
    },
  );
  return token;
});

const User: IUserModel = mongoose.model<IUser, IUserModel>('User', UserSchema);
export default User;
