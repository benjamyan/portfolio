export default function uniqueNodeKey(componentName = false, settings = false, indexValue = false) {
  // const value1 = componentName ? componentName : getRandomString();
  // const value2 = settings.section.key ? settings.section.key : getRandomString();
  // const value3 = indexValue ? indexValue : getRandomString();
  return `${componentName}--${settings}--${indexValue}`;
}
