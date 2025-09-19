import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    _id: { type: string, require: true },
    name: { type: string, require: true },
    email: { type: string, require: true, unique: true },
    imageUrl: { type: string, require: true },
    cartItems: { type: Object, default: {} },
}, { minimize: false })

const User = mongoose.model.user || mongoose.model("user", UserSchema);

export default User
