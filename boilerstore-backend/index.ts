import mongoose from "mongoose";

import server from "./src/server";

const PORT = 3000;
const DB = "mongodb://localhost:27017/BoilerStore";

const serverStartUpProcedure = () => {
    console.log("\n[SERVER] # STARTING SERVER");
    console.log("[SERVER] > Connecting to database...");
    mongoose.connect(DB);
    console.log("[SERVER] </> ALL RIGHT! The server has started!\n")
};

server.listen(PORT, serverStartUpProcedure);
