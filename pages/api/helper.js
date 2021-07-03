import { connectToDatabase } from '../../util/mongodb';

export const findOneObject = async (collection, params) => {
  const { db } = await connectToDatabase();
  const returnObj = await db.collection(collection).findOne(params);
  return returnObj;
};

export const insertOneObject = async (collection, object) => {
  const { db } = await connectToDatabase();
  const returnObj = await db.collection(collection).insertOne(object);
  return returnObj;
};

export const updateOneObject = async (collection, query, updatedObj, upsert = true) => {
  const { db } = await connectToDatabase();
  const returnObj = await db.collection(collection).updateOne(query, { $set: updatedObj }, { upsert: upsert });
  return returnObj;
};

export const deleteOneObject = async (collection, query) => {
  const { db } = await connectToDatabase();
  const returnObj = await db.collection(collection).deleteOne(query)
  return returnObj;
}

export const getAllObjects = async (collection) => {
  const { db } = await connectToDatabase();
  const returnObj = await db.collection(collection).find().toArray();
  return returnObj;
};
