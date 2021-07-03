import nextConnect from 'next-connect';
import { ObjectID } from 'mongodb';
import { deleteOneObject, getAllObjects, insertOneObject, updateOneObject } from './helper';

const handler = nextConnect();
const objName = "Sponsor"
const collectionName = "sponsors"

handler.get(async (req, res) => {
  let responseData = { success: false, message: 'Invalid GET Request' };
  if (req.query.amount == "all") {
    const collectionData = await getAllObjects(collectionName);
    responseData = collectionData;
  }
  res.json(responseData);
});

handler.post(async (req, res) => {
  let responseData = { success: false, message: 'Invalid POST Request' };
  const newItemObject = req.body.newObject;
  try {
    await insertOneObject(collectionName, newItemObject)
    responseData = {
      success: true,
      message: `${objName} successfully added to database!`
    };
  } catch (error) {
    console.log(error);
    responseData = {
      success: false,
      message: `${objName} could not be added to database.`
    };
  }
  res.json(responseData);
});

handler.put(async (req, res) => {
  let responseData = { success: false, message: 'Invalid PUT Request' };
  const updatedObject = req.body.updatedObject;
  try {
    const uid = updatedObject._id;
    delete updatedObject._id;
    await updateOneObject(collectionName, { _id: ObjectID(uid) }, updatedObject)
    responseData = {
      success: true,
      message: `${objName} successfully updated!`
    };
  } catch (error) {
    console.log(error);
    responseData = {
      success: false,
      message: `${objName} could not be updated.`
    };
  }
  res.json(responseData);
});

handler.delete(async (req, res) => {
  let responseData = { success: false, message: 'Invalid DELETE Request' };
  const objectToBeDeleted = req.query.uid;
  try {
    await deleteOneObject(collectionName, { _id: ObjectID(objectToBeDeleted) });
    responseData = {
      success: true,
      message: `${objName} successfully deleted!`
    };
  } catch (error) {
    console.log(error);
    responseData = {
      success: false,
      message: `${objName} could not be deleted.`
    };
  }
  res.json(responseData);
});

export default handler;
