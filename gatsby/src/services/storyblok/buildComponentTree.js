const accumulator = {};
const destructureObjectForRecord = (sbItem) => {
  const objectToRecord = {};
  for (const item in sbItem) {
    const CURR = sbItem[item];
    if (Array.isArray(CURR)) {
      objectToRecord[item] = {
        length: CURR.length,
        content: CURR.map(
          (child) => child._uid,
        ),
      };
    } else if (typeof (CURR) === 'object') {
      objectToRecord[item] = destructureObjectForRecord(CURR);
    } else if (item === '_uid' || item === 'component') {
      objectToRecord[item] = CURR;
    }
  }
  return objectToRecord;
};
const recordStoryItemInAccumulator = (sbItem, prevId, keyName) => {
  if (sbItem.component !== undefined && sbItem._uid !== undefined) {
    const id = sbItem._uid;
    if (accumulator[id] === undefined) {
      // Create a new array if current one doesn't exist with its UID as its key
      if (accumulator[prevId] !== undefined) {
        // Update the above array with its parents tree structure if it exists
        accumulator[id] = accumulator[prevId].map((item) => item);
      } else {
        // If there is no entry for new ID - create a new array
        accumulator[id] = [];
      }
    }
    if (keyName.constructor === String) {
      accumulator[id].push(keyName);
    }
    accumulator[id].push(
      destructureObjectForRecord(sbItem),
    );
  }
};

function traverseStoryContent(sbItem, prevId, keyName = false) {
  recordStoryItemInAccumulator(sbItem, prevId, keyName);
  if (Array.isArray(sbItem)) {
    // sbItem is an array
    for (let i = 0; i < sbItem.length; i++) {
      // loop through the array and run the current item through again if it is not a string
      if (sbItem[i].constructor !== String) {
        traverseStoryContent(
          sbItem[i], prevId, keyName.constructor === String ? `${keyName}[${i}]` : keyName,
        );
      }
    }
  } else if (sbItem.constructor === Object && sbItem._uid !== undefined) {
    // sbItem is an object
    for (const item in sbItem) {
      // loop through the object and check if it is iter/enum
      const CURR = sbItem[item];
      if (CURR.constructor !== String) {
        traverseStoryContent(CURR, sbItem._uid, item);
      }
    }
  }
}

module.exports = function (story) {
  traverseStoryContent(story.content, false);
  return accumulator;
};
