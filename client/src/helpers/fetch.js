const baseUrl = process.env.REACT_APP_API_URL;

export const fetchNoToken = async (endpoint, data, method = 'GET') => {
	const url = `${baseUrl}/${endpoint}`;
	if (method === 'GET') {
		const res = await fetch(url);
		return await res.json();
	}
	const res = await fetch(url, {
		method,
		headers: { 'Content-type': 'application/json' },
		body: JSON.stringify(data),
	});

	return await res.json();
};
