/*
Global resolver is meant for global components added to a page
The idea is that it loops, renders, and places each component in its desired space
*/

import React from 'react';
import { ComponentResolver, utils, dictionary } from '../../..';

const loopRawDataInStoryReturnComponentBlock = (data) => {
  if (Array.isArray(data)) {
    return data.map(
      (item) => (
        <ComponentResolver
          componentProps={item}
          editable={false}
          key={utils.getRandomString()}
        />
      ),
    );
  }
  return (
    <ComponentResolver
      componentProps={data}
      editable={false}
      key={utils.getRandomString()}
    />
  );
};

const getComponentFromStory = (data) => {
  if (data.slug && utils.doesComponentExist(data.slug)) {
    return dictionary[data.slug](data);
  }
  if (data.content && data.content.body) {
    return getComponentFromStory(data.content.body);
  }
  return loopRawDataInStoryReturnComponentBlock(
    data.content && data.content.component_block ? data.content.component_block : data,
  );
};

export default function GlobalResolver(props) {
  const globalComponents = props.data.reference.map(
    (story) => getComponentFromStory(story),
  );
  return globalComponents;
}
