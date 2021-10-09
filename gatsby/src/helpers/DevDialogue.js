import React from 'react';

export default function DevDialogue({ message, type='', ...props }) {
	if (type === 'err') {
		<center style={{ background: 'rgb(255,220,220)', padding: '50px' }}>
			<p style={{ color: '#000' }}>{ message }</p>
			<p><strong style={{ fontSize: '0.8rem', fontWeight: '900', color: '#000' }}>{props.component}</strong></p>
		</center>
	};
	return (
		<center style={{ padding: '50px' }}>
			<p style={{ color: '#000' }}>{ message }</p>
		</center>
	);
}
