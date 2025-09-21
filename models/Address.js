import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
    userId: { type: String, require: true, ref: "user" },
    fullName: { type: String, require: true },
    phoneNumber: { type: String, require: true },
    pincode: { type: Number, require: true },
    area: { type: String, require: true },
    city: { type: String, require: true },
    state: { type: String, require: true },
})

const Address = mongoose.models.address || mongoose.model('address', AddressSchema);

export default Address
