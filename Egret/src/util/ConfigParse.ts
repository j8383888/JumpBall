/**
 * 配置文件解析
 * @author suo 
 */
class ConfigParse {
	public constructor() {
	}

	public static getJosn(key: string): any {
		console.log("加载配置档:" + key);
		var data: Object[] = RES.getRes(key);
		return data.slice(0);
	}

	/**
	 * 根据属性A获得属性B值
	 */
	public static getPropertyByProperty(conf: any, paramA: string, paramAValue: string, paramB: string): any {
		if (!conf || !(conf instanceof Array) || conf.length == 0) {
			return;
		}
		for (var subConf of conf) {
			var item: Object = <Object>subConf
			if (item.hasOwnProperty(paramA) && item.hasOwnProperty(paramB)) {
				if (item[paramA] == paramAValue) {
					return item[paramB];
				}
			}
		}
		return null;
	}

	/**
	 * 根据属性A获得整个对象
	 */
	public static getWholeByProperty(conf: any, paramA: string, paramAValue: string): any {
		if (!conf || !(conf instanceof Array) || conf.length == 0) {
			return;
		}
		for (let subConf of conf) {
			let item: Object = <Object>subConf;
			if (item.hasOwnProperty(paramA)) {
				if (item[paramA] == paramAValue) {
					return item;
				}
			}
		}
		return null;
	}
}