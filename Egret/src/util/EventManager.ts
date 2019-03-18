/**
 * 简易消息收发类
 * @author suo
 */
module catchDoll {
	export class EventManager {

		/*单例*/
		private static _instance: EventManager = null;
		/*事件字典*/
		private _eventDic: SimpleMap<Handler[]> = new SimpleMap<Handler[]>();
		/*缓存发送事件队列 key:事件ID value:data*/
		private _cacheEventDic: SimpleMap<any> = new SimpleMap<any>();

		public constructor() {

		}

		/**
		 * 获得单例
		 */
		public static get instance(): EventManager {
			if (this._instance == null) {
				this._instance = new EventManager();
			}
			return this._instance;
		}

		/**
		 * @param id事件
		 * @param func回调函数
		 * @param regType注册回调类型
		 * @param withClearCacheEvent是否清理缓存事件
		 * 注册事件侦听
		 */
		public static registerEvent(id: number, func: Handler, regType: REG_TYPE = REG_TYPE.COMMON, withClearCacheEvent: boolean = false): void {

			if (regType == REG_TYPE.COMMON) {
				/*处理缓存事件*/
				if (EventManager.instance._cacheEventDic.isExist(id)) {
					var data: any = EventManager.instance._cacheEventDic.get(id);
					func.runWith(data);
					if (withClearCacheEvent) {
						EventManager.removeCacheEvent(id);
					}
				}

				let funcs: Array<Handler> = EventManager.instance._eventDic.get(id);
				if (funcs != null) {
				}
				else {
					funcs = new Array<Handler>();
				}
				funcs.push(func);
				EventManager.instance._eventDic.set(id, funcs);
			}
			else if (regType == REG_TYPE.ONCE) {
				/*处理缓存事件*/
				if (EventManager.instance._cacheEventDic.isExist(id)) {
					var data: any = EventManager.instance._cacheEventDic.get(id);
					func.once = true;
					func.runWith(data);
					if (withClearCacheEvent) {
						EventManager.removeCacheEvent(id);
					}
				}
				else {
					let funcs: Array<Handler> = EventManager.instance._eventDic.get(id);
					if (funcs != null) {
					}
					else {
						funcs = new Array<Handler>();
					}
					func.once = true;
					funcs.push(func);
					EventManager.instance._eventDic.set(id, funcs);
				}
			}
		}

		/**
		 * @param id事件
		 * @param func回调函数
		 * 反注册 
		 */
		public static unregisterEvent(id: number, caller: any, func: Function) {
			let funcs: Array<Handler> = EventManager.instance._eventDic.get(id);
			if (funcs != null && funcs.length != 0) {
				for (var i: number = 0; i < funcs.length; i++) {
					if (funcs[i].caller == caller && funcs[i].method == func) {
						funcs[i].recover();
						funcs.remove(funcs[i]);
						break;
					}
				}
			}
		}

		/**
		 * 移除缓存事件
		 */
		public static removeCacheEvent(id: number) {
			EventManager.instance._cacheEventDic.remove(id);
		}

		/**
		 * @param id事件
		 * 发送事件 
		 */
		public static fireEvent(id: number, data: any = null, fireType: FIRE_TYPE = FIRE_TYPE.COMMON) {
			let funcs: Array<Handler> = EventManager.instance._eventDic.get(id);
			if (funcs != null && funcs.length != 0) {
				/*先拷贝一份 防止在循环过程中改变数组长度引发bug*/
				let temp: Array<Handler> = funcs.slice();
				let len: number = temp.length;

				for (var i: number = 0; i < len; i++) {
					var func: Handler = temp[i];
					if (func.once) {
						EventManager.instance._cacheEventDic.remove(id);
					}
					func.runWith(data);
				}
			}
			else {
				if (fireType == FIRE_TYPE.FIRE_OR_CACHE) {
					EventManager.instance._cacheEventDic.set(id, data);
				}
			}
			if (fireType == FIRE_TYPE.FIRE_AND_CHCHE) {
				EventManager.instance._cacheEventDic.set(id, data);
			}
		}

		/**
		 * 释放
		 */
		public dispose(): void {
			EventManager.instance._eventDic.clear();
			EventManager.instance._cacheEventDic.clear();
		}

	}
}

/**
 * 注册侦听类型
 */
const enum REG_TYPE {
	/*普通*/
	COMMON,
	/*侦听一次 自动移除*/
	ONCE
}

/**
 * 派发事件类型
 */
const enum FIRE_TYPE {
	/*普通*/
	COMMON,
	/*有侦听直接发送 没有侦听就缓存*/
	FIRE_OR_CACHE,
	/*发送并缓存*/
	FIRE_AND_CHCHE,
}

/**
 * 事件枚举
 */
const enum EVENT_ID {
	/**
	 * 玩家下钩子
	 */
	MASTER_DOWN,
	/**
	 * 更新钱
	 */
	UPDATE_MONEY,
	/**
	 * 更新钻石
	 */
	UPDATE_DIAMOND,
	/**
	 * 初始化玩家数据
	 */
	SERVE_COMPLETE,
	/**
	 * 更新道具信息
	 */
	UPDATE_ITEM_INFO,
	/**
	 * 
	 */
	TaskUpdate_CS,
}