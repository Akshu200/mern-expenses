import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema(
    {

        firstName: { type: String, required: ['Firstname field is required'] },
        lastName: { type: String, required: ['lastname field is required'] },
        email: { type: String, required: ['email field is required'] },
        password: { type: String, required: ['password field is required'] },
        categories: [{ label: String, icon: String }],


    },
    { timestamps: true }

);

export default new mongoose.model("User", UserSchema)