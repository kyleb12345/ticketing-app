import mongoose from 'mongoose';
import { Password } from '../services/password';

//interface that describes the properties that are request to create a new user
interface UserAttrs {
    email: string;
    password: string;
}

//interface that describes the properties a User Model has
//the any word replaced withe UserDoc
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

//an interface that describes the properties that User Document has
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    }
}
);

userSchema.pre('save', async function(done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(
            this.get("password")
        );
        this.set("password", hashed);
    }
    done;
});

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

//does not follow mongo documentation, this is created to use typescript effectively 
//instead of just creating 'new User' as normal, then edited code to the userSchema above to not export multiple
// const buildUser = () => {
//     return new User(attrs);
// };
//now, typescript doesn't understand statics, need to create another interface for that, build model



export { User };