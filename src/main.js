import {libWrapper} from "./libwrapper_shim.js";
import {getCurrentHp, getHealthAttribute, getNonlethalDamage, getTemporaryHp} from "./systems.js";

Hooks.once("init", () => {
	libWrapper.register("enhanced-healthbar", "Token.prototype._drawBar", drawBar, "MIXED");
});

function drawBar(wrapped, number, bar, data) {
	if (data.attribute !== getHealthAttribute()) {
		return wrapped(number, bar, data);
	}
	const actorData = bar.parent.parent.actor.data.data;
	const nonlethalDamage = getNonlethalDamage(actorData);
	const tempHp = getTemporaryHp(actorData);

	const val = getCurrentHp(actorData);
	const clampMax = Math.max(data.max, val + tempHp);
	const pct = Math.clamped(val, 0, clampMax) / clampMax;
	const nonlethalPct = Math.clamped(nonlethalDamage, 0, clampMax) / clampMax;
	const tempPct = Math.clamped(val + tempHp, 0, clampMax) / clampMax;
	let h = Math.max((canvas.dimensions.size / 12), 8);
	if ( this.data.height >= 2 ) h *= 1.6;  // Enlarge the bar for large tokens

	const colorPct = Math.clamped(val - nonlethalDamage, 0, data.max) / data.max;
	// Draw the bar
	let color = (number === 0) ? [(1-(colorPct/2)), colorPct, 0] : [(0.5 * colorPct), (0.7 * colorPct), 0.5 + (colorPct / 2)];
	bar.clear()
		// Draw background and outer border
		.beginFill(0x000000, 0.5)
		.lineStyle(2, 0x000000, 0.9)
		.drawRoundedRect(0, 0, this.w, h, 3)

		// Draw temporary hitpoints
		.beginFill(0xCCFFCC, 1)
		.lineStyle(0, 0x000000, 1)
		.drawRoundedRect(1, 1.5, tempPct*(this.w-2), h-3, 1)

		// Draw regular hitpoints
		.beginFill(PIXI.utils.rgb2hex(color), 1)
		.lineStyle(1, 0x000000, 1)
		.drawRoundedRect(1, 1, pct*(this.w-2), h-2, 2)

		// Draw nonlethal damage
		//.beginFill(0x4b371c, 1)
		.beginFill(0x000000, 1)
		.lineStyle(0, 0x000000, 1)
		.drawRoundedRect(1, 1.5, Math.min(nonlethalPct, tempPct)*(this.w-2), h-3, 1);

	// Set position
	let posY = number === 0 ? this.h - h : 0;
	bar.position.set(0, posY);
}
