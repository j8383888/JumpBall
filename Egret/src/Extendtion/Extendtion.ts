/**
 * @author suo
 */
declare interface Array<T> {
	remove(item: T, fromIndex?: number)
}
if (!Array.prototype.remove) {
	Array.prototype.remove = function (value, fromIndex) {
		var index = this.indexOf(value, fromIndex);
		if (index < 0)
			return false;
		this.splice(index, 1);
		return true;
	};
}

class Extendtion {
	public constructor() {
	}
}