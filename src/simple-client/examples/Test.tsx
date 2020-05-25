import React, { useEffect } from 'react';
import { HookTester } from '../../hooks/useRedrawer.test';

export function Test() {
	const [N, setN] = React.useState<number>(0);

	useEffect(() => {
        let count = 0   // just to stop the timer
		const timer = setInterval(() => {
			if (count > 45) {
				clearInterval(timer);
			} else {
                count++
				console.log('iteration', 'N =', N);
				setN(N => N + 1);
			}
		}, 100);
	}, []);

	return (
		<div>
			<HookTester n={N} />
		</div>
	);
}
