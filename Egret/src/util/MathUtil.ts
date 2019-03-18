class MathUtil {
	public constructor() {
	}

	/**
	 * 两个整数之间随机
	 */
	public static random(min: number, max: number): number {
		return Math.round(Math.random() * (max - min) + min);
	}

} 