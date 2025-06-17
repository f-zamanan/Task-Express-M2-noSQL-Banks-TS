import { NextFunction, Request, Response } from "express";
import { accounts } from "../../account";
import Account from "../../model/Account";

//creating new account
export const accountCreate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //   const id = accounts[accounts.length - 1].id + 1;
  //   const newAccount = { ...req.body, funds: 0, id };
  //   accounts.push(newAccount);
  //   res.status(201).json(newAccount);
  try {
    const { username, funds, image } = req.body;
    // console.log(
    //   "Creating account with username:",
    //   username,
    //   "and funds:",
    //   funds
    // );
    let imagePath;
    if (req.file) {
      imagePath = req.file?.path;
    }
    const newAcc = await Account.create({ username, funds, image: imagePath }); // Account is my created model / image(key): imagePath(value)
    res.status(201).json(newAcc);
  } catch (error) {
    // res.status(500).json({ message: "Error creating an account.." });
    next(error); // Pass the error to the next middleware (error handler)
  }
};
// Deleting an account
export const accountDelete = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //   const foundAccount = accounts.find((account) => account.id === +accountId);
  //   if (foundAccount) {
  //     let newAccounts = accounts.filter((account) => account.id !== +accountId);
  //     res.status(204).end();
  //   } else {
  //     res.status(404).json({ message: "Account not found" });
  //   }
  try {
    const { accountId } = req.params;
    const foundACCFromDB = await Account.findByIdAndDelete(accountId);

    if (foundACCFromDB) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Account not found" });
    }
  } catch (error) {
    // res.status(500).json({ message: "Error deleting account..." });
    next(error);
  }
};

// Updating an account
export const accountUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { accountId } = req.params;
  const { username, funds } = req.body;
  //   const foundAccount = accounts.find((account) => account.id === +accountId);
  const updateAccInDB = await Account.findByIdAndUpdate(accountId, {
    username,
    funds,
  });
  try {
    if (updateAccInDB) {
      res.status(204).end();
    }
  } catch (error) {
    next(error);
  }
  //   if (updateAccInDB) {
  //     res.status(204).end();
  //   } else {
  //     res.status(404).json({ message: "Account not found, can't update" });
  //   }
};
// get all accounts from the database
export const accountsGet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accountsFromDB = await Account.find();
    res.status(200).json(accountsFromDB);
  } catch (error) {
    // res.status(500).json({ message: "Error fetching accounts..." });
    next(error);
  }
};
// get one account by username
export const getAccountByUsername = async (req: Request, res: Response) => {
  const { username } = req.params;
  //   const foundAccount = accounts.find(
  //     (account) => account.username === username
  //   );
  const foundAccByUsername = await Account.findOne({ username });
  if (req.query.currency === "usd" && foundAccByUsername) {
    const accountInUsd = {
      ...foundAccByUsername,
      funds: foundAccByUsername.funds * 3.31,
    };
    res.status(201).json(accountInUsd);
  } else {
    res.status(201).json(foundAccByUsername);
  }
};

// get one account by username, abd check for amount above 3000
// export const getAccByUsernameAmount = async (req: Request, res: Response) => {
//   const { username } = req.params;
//   //   const foundAccount = accounts.find(
//   //     (account) => account.username === username
//   //   );
//   const foundAccByUsername = await Account.find({ username }); // this is an array, find a way to just grap the users with the correct condition
//   // check
//   if (
//     foundAccByUsername &&
//     Number(req.query.amount) <= foundAccByUsername?.funds
//   ) {
//     const accountWithCorrectAmount = {
//       username: foundAccByUsername.username,
//       funds: foundAccByUsername.funds,
//     };
//     res.status(201).json(accountWithCorrectAmount);
//   } else {
//     // res.status(201).json(foundAccByUsername);
//     res.status(500).json({ message: "Error fetching accounts..." });
//   }
// };
