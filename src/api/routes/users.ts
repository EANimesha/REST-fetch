import express, { NextFunction, Request, Response } from "express";
const router = express.Router();

const User = require("../models/user");

router.get("/", (req: Request, res: Response, next: NextFunction) => {
    User.find()
        .exec()
        .then((data: string) => {
            console.log(data);
            res.status(200).json(data);
        })
        .catch((err: string) => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
});

router.get("/:userId", (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.userId;

    User.findById(id)
        .exec()
        // Single user valid
        .then((data: string) => {
            console.log(data);
            if (data) {
                res.status(200).json({
                    data: data,
                });
            } else {
                res.status(404).json({
                    message: "Id does not exist",
                });
            }
        })
        // Single user invalid
        .catch((err: string) => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
});

router.patch("/:userId", (req: Request, res: Response, next: NextFunction) => {
    const jsonData = req.body;
    User.findById(req.params.userId)
        .exec()
        .then((user: any) => {
            const {
                first_name = user.first_name,
                last_name = user.last_name,
                email = user.email,
            } = jsonData;

            res.status(200).json({ first_name: first_name, last_name: last_name, email: email });
        })
        .catch((err: string) => {
            res.status(404).json({ message: "user not found" });
        });
});

router.delete("/:userId", (req: Request, res: Response, next: NextFunction) => {
    const id: any = req.params.userId;
    User.findById(id)
        .exec()
        .then((data: string) => {
            if (data) {
                res.status(204).json();
            } else {
                res.status(404).json({
                    message: "User ID does not exist",
                });
            }
        })
        .catch((err: string) => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
});

module.exports = router;
