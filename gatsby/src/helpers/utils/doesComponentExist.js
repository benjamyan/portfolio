import { dictionary } from '../..';

export default function doesComponentExist(componentName) {
  if (typeof (dictionary[componentName]) !== 'undefined') {
    return true;
  }
  return false;
}
