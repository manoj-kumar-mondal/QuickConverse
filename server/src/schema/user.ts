import mongoose, { Schema, model } from 'mongoose';

export const UserSchema = new Schema({
    userName: {
        type: String,
    },
    mobileNumber: {
        type: String,
        required: true
    },
    // key: {
    //     type: String,
    //     required: true,
    //     unique: true,
    // },
    email: {
        type: String,
    },
    recipientList: [
        {
            recipient: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users',
                required: true
            },
            messageList: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'chats',
                required: true,
            }
        }
    ]
}, { timestamps: true });

const UserModel = model('users', UserSchema);
export default UserModel;