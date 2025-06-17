import { model, Schema } from "mongoose";

const accountSchema = new Schema({
  username: { type: String, required: true },
  funds: { type: Number, default: 0 },
  //   timeStamp: { timestamps: true },
  image: { type: String },
});
const Account = model("Account", accountSchema);

export default Account;
