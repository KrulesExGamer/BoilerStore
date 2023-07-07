import server from "./src/server";

const PORT = 3000;

const serverStartUpProcedure = () => {
    console.log("\n[SERVER] STARTING...\n[SERVER] The server has started!\n");
};

server.listen(PORT, serverStartUpProcedure);
