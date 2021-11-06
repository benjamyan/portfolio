import {
  ComponentResolver, RichtextResolver, settingsResolver
} from './services/resolvers';
import useStoryblokBridge from './services/storyblok/useStoryblokBridge'
import dictionary from './dictionary';
import styles from './helpers/styles';
import * as utils from './helpers/utils';

const Error = utils.DevDialogue;

export {
  RichtextResolver,
  ComponentResolver,
  settingsResolver,
  useStoryblokBridge,
  dictionary,
  utils,
  styles,
  Error,
};
