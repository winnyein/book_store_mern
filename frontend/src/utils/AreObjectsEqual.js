export default function areObjectsEqual(obj1, obj2) {
  // Get the keys of each object
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // Check if the number of keys is the same
  if (keys1.length !== keys2.length) {
    return false;
  }

  // Check if the values for each key are the same
  for (let key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  // If all checks pass, the objects are equal
  return true;
}
