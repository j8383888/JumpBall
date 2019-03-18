// /**
//  * 多个movieclip的集合体
//  * @author suo
//  */
// module catchDoll {
// 	export class MoviePlayer extends egret.DisplayObjectContainer {
// 		/**
// 		 * key：动画组名字 value：egret.movie
// 		 */
// 		private _dataDic: SimpleMap<egret.MovieClip> = new SimpleMap<egret.MovieClip>();
// 		/**
// 		 * 上一次播放的动画
// 		 */
// 		private _lastMov: egret.MovieClip;
// 		/**
// 		 * 索引
// 		 */
// 		private _index: number = 0;

// 		/**
// 		 * @param data键为动画组名字,值为groupName 
// 		 */
// 		public constructor(data?: catchDoll.IMoviePlayer[]) {
// 			super();
// 			if (data) {
// 				for (let i: number = 0; i < data.length; i++) {
// 					let mov: egret.MovieClip = UIUtil.creatMovieClip(data[i].groupName, data[i].actionName);
// 					mov.visible = false;
// 					if (data[i].offsetX) {
// 						mov.x = data[i].offsetX;
// 					}
// 					if (data[i].offsetY) {
// 						mov.y = data[i].offsetY;
// 					}
// 					if (data[i].frameRate) {
// 						mov.frameRate = data[i].frameRate;
// 					}
// 					if (data[i].scaleX) {
// 						mov.scaleX = data[i].scaleX;
// 					}
// 					if (data[i].scaleY) {
// 						mov.scaleY = data[i].scaleY;
// 					}
// 					this.addChild(mov);
// 					this._dataDic.set(data[i].keyName, mov);
// 				}
// 			}
// 		}

// 		/**
// 		 * 添加一个影片剪辑
// 		 */
// 		public push(data: catchDoll.IMoviePlayer): void {
// 			let mov: egret.MovieClip = UIUtil.creatMovieClip(data.groupName, data.actionName);
// 			mov.visible = false;
// 			if (data.offsetX) {
// 				mov.x = data.offsetX;
// 			}
// 			if (data.offsetY) {
// 				mov.y = data.offsetY;
// 			}
// 			if (data.frameRate) {
// 				mov.frameRate = data.frameRate;
// 			}
// 			if (data.scaleX) {
// 				mov.scaleX = data.scaleX;
// 			}
// 			if (data.scaleY) {
// 				mov.scaleY = data.scaleY;
// 			}
// 			this.addChild(mov);
// 			this._dataDic.set(data.keyName, mov);
// 		}

// 		/**
// 		 * 切换动画
// 		 */
// 		public SwitchAni(keyName: string, playTimes: number = -1): void {
// 			if (this._lastMov) {
// 				this._lastMov.stop();
// 				this._lastMov.visible = false;
// 			}
// 			let mov: egret.MovieClip = this._dataDic.get(keyName);
// 			if (mov != null) {
// 				mov.visible = true;
// 				mov.gotoAndPlay(1, playTimes)
// 				this._lastMov = mov;
// 			}
// 			else {
// 				console.assert(false, "不存在keyName：" + keyName);
// 			}
// 		}

// 		/**
// 		 * 根据索引播放
// 		 */
// 		public switchAniByIndex(index: number, playTimes: number = -1): void {
// 			if (this._lastMov) {
// 				this._lastMov.stop();
// 				this._lastMov.visible = false;
// 			}
// 			let mov: egret.MovieClip = this._dataDic.getByKeyIndex(index);
// 			if (mov != null) {
// 				mov.visible = true;
// 				mov.gotoAndPlay(1, playTimes)
// 				this._lastMov = mov;
// 			}
// 			else {
// 				console.assert(false, "不存在index：" + index);
// 			}
// 		}

// 		/**
// 		 * 播放所有动画一次
// 		 */
// 		public playOnceAll(completeCB: Handler): void {
// 			let completeIndex: number = 0;
// 			for (let i: number = 0; i < this._dataDic.length; i++) {
// 				let mov: egret.MovieClip = this._dataDic.getByKeyIndex(i);
// 				mov.visible = true;
// 				mov.gotoAndPlay(1, 1);
// 				mov.once(egret.MovieClipEvent.COMPLETE, () => {
// 					mov.visible = false;
// 					completeIndex++;
// 					if (completeIndex == this._dataDic.length) {
// 						if (completeCB) {
// 							completeCB.run();
// 						}
// 					}
// 				}, this)
// 			}
// 		}

// 		/**
// 		 * 切换一次回调
// 		 */
// 		public switchAniPlayOnce(keyName: string, completeCB?: Handler) {
// 			if (this._lastMov) {
// 				this._lastMov.stop();
// 				this._lastMov.visible = false;
// 			}
// 			let mov: egret.MovieClip = this._dataDic.get(keyName);
// 			if (mov) {
// 				mov.visible = true;
// 				mov.gotoAndPlay(1, 1)
// 				this._lastMov = mov;
// 				mov.once(egret.MovieClipEvent.COMPLETE, () => {
// 					mov.stop();
// 					mov.visible = false;
// 					if (completeCB) {
// 						completeCB.run();
// 					}
// 				}, this)
// 			}
// 			else {
// 				console.assert(false, "不存在keyName：" + keyName);
// 			}
// 		}

// 		/**
// 		 * 根据键获得影片剪辑
// 		 */
// 		public getMovieClipByKey(key: string): egret.MovieClip {
// 			let mov: egret.MovieClip = this._dataDic.get(key);
// 			if (!mov) {
// 				console.assert(false, "不存在keyName：" + key);
// 			}
// 			return mov;
// 		}

// 		/**
// 		 * 暂停当前动画
// 		 */
// 		public stop(): void {
// 			if (this._lastMov) {
// 				this._lastMov.stop();
// 			}
// 		}

// 		/**
// 		 * 暂停所有动画
// 		 */
// 		public stopAll(): void {
// 			let map = this._dataDic;
// 			for (let i: number = 0; i < map.length; i++) {
// 				let mov: egret.MovieClip = map.getByKeyIndex(i)
// 				mov.stop();
// 				mov.visible = false;
// 			}
// 		}

// 		/**
// 		 * 播放
// 		 */
// 		public play(key: string, playTimes: number, delay?: number, completeCB?: Handler): void {
// 			if (delay) {
// 				Laya.timer.once(delay, this, () => {
// 					this._playMoiveClip(key, playTimes, completeCB)
// 				})
// 			}
// 			else {
// 				this._playMoiveClip(key, playTimes, completeCB)
// 			}
// 		}

// 		/**
// 		 * 播放影片剪辑
// 		 */
// 		private _playMoiveClip(key: string, playTimes: number, completeCB: Handler): void {
// 			let mov: egret.MovieClip = this._dataDic.get(key);
// 			if (mov) {
// 				mov.visible = true;
// 				mov.gotoAndPlay(1, playTimes);
// 				if (playTimes == 1) {
// 					mov.once(egret.MovieClipEvent.COMPLETE, () => {
// 						mov.stop();
// 						mov.visible = false;
// 						if (completeCB) {
// 							completeCB.run();
// 						}
// 					}, this)
// 				}
// 			}
// 		}


// 		/**
// 		 * 释放
// 		 */
// 		public dispose(): void {
// 			this._dataDic.clear();
// 			this._dataDic = null;
// 			this.stop();
// 		}
// 	}
// }
