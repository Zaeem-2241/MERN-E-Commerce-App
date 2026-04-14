import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      require: true,
      minlength: true,
    },
    isAdmin : {
      type : Boolean
    }
  },
  { timestamps: true },
);

 

//password hash before save

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    const salt =await  bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    // next();
});

//compare password for login
userSchema.methods.matchPassword = async function (enteredpassword) {
    return bcrypt.compare(enteredpassword, this.password)
    
};

export default mongoose.model("User", userSchema);
