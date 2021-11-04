import React from 'react';

const getPreloadMedia = () => {
	// TODO
	return (
		<>
			<img src={ 'image.jpg' } alt={ 'Meaningfdul' } />
		</>
	);
};

export default function Tangible({ ...props }) {
	const PreloadMedia = getPreloadMedia(props);
	return <PreloadMedia />;
};
