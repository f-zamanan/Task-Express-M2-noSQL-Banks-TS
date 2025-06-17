import express from "express";
const accountsRouter = express.Router();
import {
  accountsGet,
  accountUpdate,
  accountDelete,
  accountCreate,
  getAccountByUsername,
  //   getAccByUsernameAmount,
} from "./accounts.controller";
import upload from "../../middlewares/multer";

accountsRouter.get("/", accountsGet);
accountsRouter.get("/:username", getAccountByUsername);
accountsRouter.post("/", upload.single("image"), accountCreate); // multer middleware used here

accountsRouter.delete("/:accountId", accountDelete);

accountsRouter.put("/:accountId", accountUpdate);

// new route created
// accountsRouter.get("/vip", getAccByUsernameAmount);

export default accountsRouter;
