qh.setModule("application", {
	app: true,
	require: [
		"collection",
		"game",
		"object",
	],
	controller: [
		"index"
	],
	factory: [
		"navigation",
		"uid",
	],
	config: [
		"index"
	],
});
