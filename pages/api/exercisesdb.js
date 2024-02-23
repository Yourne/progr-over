// / @ localhost:PORT/api / exercises

import { MongoClient } from "mongodb";
const uri = process.env.MONGODB_CONNECTION_STRING;
const dbName = process.env.MONGODB_DB_NAME;
const collectionName = process.env.MONGODB_COLLECTION_NAME;

export default async function handler(req, res) {
  const client = new MongoClient(uri);
  const collection = client.db(dbName).collection(collectionName);
  switch (req.method) {
    case "GET":
      try {
        const pipeline = [
          { $match: { name: req.query.name } },
          {
            $project: {
              name: 1,
              sets: 1,
              time: { $dateFromString: { dateString: "$time" } },
            },
          },
          { $sort: { time: -1 } },
          { $limit: 3 },
        ];

        const aggregationResult = collection.aggregate(pipeline);
        const lastThreeExer = await aggregationResult.toArray();
        const lastExer = lastThreeExer[0];

        if (lastExer) {
          res.status(200).json(lastExer);
        } else {
          res.status(204);
          res.end();
        }
      } catch (err) {
        throw err;
      } finally {
        await client.close();
      }
      break;
    case "POST":
      try {
        const exercise = JSON.parse(req.body);
        const result = await collection.insertOne(exercise);
        res.json(result.insertedId);
      } catch (err) {
        throw err;
      } finally {
        await client.close();
      }
      break;
  }
}
