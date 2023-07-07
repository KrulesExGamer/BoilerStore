import { Router } from "express";

const router = Router();

// # ROUTES

// ## GET ASSET DATA
router.get("/assets/:asset", async (req, res) => {
    try {
        const assetName = req.params.asset;
        res.status(200).send("Hello, World!");
    } catch (err) {

    }
});


export default router;
