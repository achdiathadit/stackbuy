const formatUSD = (num) =>
	Number(num).toLocaleString('en-US', {
		style: 'currency',
		currency: 'USD',
	});

export { formatUSD };
