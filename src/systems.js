export function getHealthAttribute() {
	switch (game.system.id) {
		case "pf1":
			return "attributes.hp";
		default:
			throw new Error(`An internal entry for game system '${game.system.id}' is missing.`);
	}
}

export function getCurrentHp(data) {
	switch (game.system.id) {
		case "pf1":
			return data.attributes.hp.value;
		default:
			throw new Error(`An internal entry for game system '${game.system.id}' is missing.`);
	}
}

export function getTemporaryHp(data) {
	switch (game.system.id) {
		case "pf1":
			return data.attributes.hp.temp;
		default:
			throw new Error(`An internal entry for game system '${game.system.id}' is missing.`);
	}
}

export function getNonlethalDamage(data) {
	switch (game.system.id) {
		case "pf1":
			return data.attributes.hp.nonlethal;
		default:
			throw new Error(`An internal entry for game system '${game.system.id}' is missing.`);
	}
}
