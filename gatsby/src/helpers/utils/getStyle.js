const zeroToOneValue = (prop) => {
  let transProp = prop;
  if (transProp.length === 1) {
    transProp = `0${transProp}`;
  } else if (transProp.length === 3) {
    return '1';
  }
  return `0.${transProp}`;
};
const hexColor = function (prop) {
  const colorProp = prop || false;
  if (!colorProp) {
    return '#000000';
  }
  return colorProp;
};

export {
  zeroToOneValue,
  hexColor,
};
