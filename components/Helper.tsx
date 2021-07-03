const launchSuccessToast = (setToast, msg) => setToast({ text: msg, type: 'warning', delay: 3000 });
const launchFailToast = (setToast, msg) => setToast({ text: msg, type: 'error', delay: 3000 });

/**
 * sends a user a positive/negative notification
 * @param  {bool} intent good or bad
 * @param {string} msg message to send as a notification
 */
const sendNotification = (setToast, intent, msg) => {
  if (intent) launchSuccessToast(setToast, msg);
  else launchFailToast(setToast, msg);
};

export const addToDatabase = (objectType: string, newObject: object, toastFunction) => {
  fetch(`/nexus/api/${objectType}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ newObject: newObject })
  })
    .then((response) => response.json())
    .then((data) => {
      sendNotification(toastFunction, data.success, data.message);
    })
    .catch((error) => {
      console.error('Error:', error);
      sendNotification(toastFunction, false, "Could not add to database");
    });
}

export const updateDatabase = (objectType: string, updatedObject: object, toastFunction) => {
  fetch(`/nexus/api/${objectType}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ updatedObject: updatedObject })
  })
  .then((response) => response.json())
  .then((data) => {
      sendNotification(toastFunction, data.success, data.message);
  })
  .catch((error) => {
      console.error('Error:', error);
      sendNotification(toastFunction, false, "Could not add to database");
  });
}

export const deleteFromDatabase = (objectType: string, uid: string, toastFunction) => {
  console.log('deleting', uid, 'from the db');
  fetch(`/nexus/api/${objectType}?uid=` + uid, {
    method: 'DELETE',
  })
  .then((response) => response.json())
  .then((data) => {
      sendNotification(toastFunction, data.success, data.message);
  })
  .catch((error) => {
      console.error('Error:', error);
      sendNotification(toastFunction, false, "Could not add to database");
  });
}

export const fetchCompleteCollection = async (collection: string, setVariable) => {
  const collectionResponse = await fetch(`/nexus/api/${collection}?amount=all`);
  const collectionData = await collectionResponse.json();
  if (collectionData) setVariable(collectionData)
  else console.log('Could not fetch collection', collection)
}