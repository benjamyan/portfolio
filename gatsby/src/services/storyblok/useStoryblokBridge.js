/*
https://www.storyblok.com/docs/guide/essentials/visual-editor
*/
import config from '../../../gatsby-config';
import { useEffect, useState } from 'react';
import { sbGet } from './storyblokManagement';
//
const sbConfig = config.plugins.find(
  (item) => item.resolve === 'gatsby-source-storyblok',
).options;

export default function useStoryblok(originalStory, location) {
	const [story, setStory] = useState(originalStory);
	if (story && typeof story.content === 'string') {
		story.content = JSON.parse(story.content);
	};
	function initEventListeners() {
		const { StoryblokBridge, location } = window;
		function updateLocalStory(storyObj) {
			try {
				setStory(storyObj);
			} catch (err) {
				console.log(err);
			}
		}
		if (typeof StoryblokBridge !== 'undefined') {
			const storyblokInstance = new StoryblokBridge(sbConfig);
			storyblokInstance.on(['input'], (event) => {
				// User changed the value of a field
				//
				// console.log('useSb input');
				updateLocalStory(event.story);
			});
			storyblokInstance.on(['change'], (event) => {
				// The user saves the content
				//
				// console.log('useSb change');
			});
			storyblokInstance.on(['published'], (event) => {
				// After the user clicks publish
				//
				// console.log('useSb published')
				return location.reload(true);
			});
			storyblokInstance.on(['unpublished'], (event) => {
				// User clicks unpublish
				//
				// console.log('useSb unpublished');
			});
			storyblokInstance.on(['enterEditmode'], (event) => {
				// Editor has been initialized in the editmode
				//
				// console.log('useSb enterEditmode');
				sbGet(
					`cdn/stories/${event.storyId}`, {},
					(data) => updateLocalStory(data.story),
				);
			});
		}
	};

	useEffect( ()=> {
		if (location.search.includes('_storyblok')) {
			const sbScriptId = 'storyblokBridge';
			const existingScript = document.getElementById(sbScriptId);
			if (!existingScript) {
				const script = document.createElement('script');
				script.id = sbScriptId;
				script.src = '//app.storyblok.com/f/storyblok-v2-latest.js';
				document.body.appendChild(script);
				script.onload = ()=> initEventListeners();
			} else {
				initEventListeners();
			}
		}
	}, [location]);

	return story;
}
