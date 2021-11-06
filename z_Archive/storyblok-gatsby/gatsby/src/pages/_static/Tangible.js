import React from 'react';

const getBaseTag = () => {
	return (
		<>
			<base href="http://localhost:8000" />
		</>
	);
};

const getPreloadMedia = () => {
	// TODO
	return (
		<>
			<img src={ 'image.jpg' } alt={ 'Meaningfdul' } />
		</>
	);
};

export default function Tangible({ ...props }) {
	const BaseTag = getBaseTag(props);
	const PreloadMedia = getPreloadMedia(props);
	return (
		<>
			<BaseTag />
			<PreloadMedia />
		</>
	);
};
