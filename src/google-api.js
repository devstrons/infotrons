async function google_api(query) {
	const { body } = await request.get("https://www.googleapis.com/customsearch/v1").query({
		key: key, cx: csx, safe: "off", q: query
	});

	if (!body.items) return null;
	return body.items[0];
  
}

module.exports = {
  google_api,
};
