import { Schema, model } from 'mongoose';

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
    isRegistered: {
        type: Boolean,
        required: true
    },
    email: {
        type: String,
    },
    recipientList: [
        {
            recipient: {
                type: Schema.Types.ObjectId,
                ref: 'users',
                required: true
            },
            messageList: {
                type: Schema.Types.ObjectId,
                ref: 'chats',
                required: true,
            }
        }
    ]
}, { timestamps: true });

const UserModel = model('users', UserSchema);
export default UserModel;