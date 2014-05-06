qh.setModule("game", {
	factory: [
		"grid", // Need to retire this or make it a clear utility.
		"Block",
		"maps",
		"Map",
		"units",
		"players",
		"abilities",
		"actions",
		"ai",
		"help-window",
	],
	directive: [
		"game-grid",
		"help-window",
	],
});
