const formatUSD = (num) =>
	num.toLocaleString(undefined, {
		style: 'currency',
		currency: 'USD',
	});

export { formatUSD };
