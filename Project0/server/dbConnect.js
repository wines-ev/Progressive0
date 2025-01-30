import { MongoClient, ServerApiVersion } from 'mongodb';

const { MONGODB_URI, MONGODB_DATABASE } = process.env;

const client = new MongoClient(MONGODB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: false,
    },
});


try {

    await client.connect();
    await client.db().command({ ping: 1 });

    console.log("Connected to the database");
} catch (e) {
    console.error(e);
}


export const db = client.db(MONGODB_DATABASE);