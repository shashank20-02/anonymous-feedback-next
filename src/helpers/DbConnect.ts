import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number;
};
const connection: ConnectionObject = {};

const DbConnect = async (): Promise<void> => {
    if (connection.isConnected) {
        console.log("Database is already Connected !!");
        return;
    }

    try {
        const db = await mongoose.connect(process.env.DATABASE_URL || "", {});
        connection.isConnected = db.connections[0].readyState;

        console.log("Database is connected Successfully !!");
    } catch (err) {
        throw new Error(
            `Process failed during database connect. ERROR : ${err}`
        );
        process.exit(1);
    }
};

export default DbConnect;
