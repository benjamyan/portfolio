export default function objectExistsElseReturnNull(obj, key) {
  let finalObj;
  try {
    finalObj = obj[key];
  } catch (err) {
    finalObj = null;
  } finally {
    return finalObj;
  }
}
