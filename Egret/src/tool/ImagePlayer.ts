// /**
//  * 图片集合
//  * @author suo
//  */
// module catchDoll {
// 	export class ImagePlayer extends egret.DisplayObjectContainer {
// 		/**
// 		 * key：动画组名字 value：egret.movie
// 		 */
// 		private _dataDic: SimpleMap<PivotCenterImage> = new SimpleMap<PivotCenterImage>();

// 		public constructor(data?: catchDoll.IImagePlayer[]) {
// 			super();
// 			if (data) {
// 				for (let i: number = 0; i < data.length; i++) {
// 					let img: PivotCenterImage = new PivotCenterImage();
// 					img.source = data[i].sourceName;

// 					if (data[i].offsetX) {
// 						img.x = data[i].offsetX;
// 					}
// 					if (data[i].offsetY) {
// 						img.y = data[i].offsetY;
// 					}
// 					if (data[i].scaleX) {
// 						img.scaleX = data[i].scaleX;
// 					}
// 					if (data[i].scaleY) {
// 						img.scaleY = data[i].scaleY;
// 					}
// 					this.addChild(img);
// 					this._dataDic.set(data[i].keyName, img);
// 				}
// 			}
// 		}

// 		/**
// 		 * 添加图片
// 		 */
// 		public push(data: catchDoll.IImagePlayer): void {
// 			let img: PivotCenterImage = new PivotCenterImage();
// 			img.source = data.sourceName;
// 			if (data.offsetX) {
// 				img.x = data.offsetX;
// 			}
// 			if (data.offsetY) {
// 				img.y = data.offsetY;
// 			}
// 			if (data.scaleX) {
// 				img.scaleX = data.scaleX;
// 			}
// 			if (data.scaleY) {
// 				img.scaleY = data.scaleY;
// 			}
// 			this.addChild(img);
// 			this._dataDic.set(data.keyName, img);
// 		}

// 		/**
// 		 * 根据键找图
// 		 */
// 		public getImageByKey(key: string): PivotCenterImage {
// 			let img: PivotCenterImage = this._dataDic.get(key);
// 			if (!img) {
// 				console.assert(false, "不存在keyName：" + key);
// 			}
// 			return img;
// 		}

// 		/**
// 		 * 根据键找图
// 		 */
// 		public getImageByIndex(index: number): PivotCenterImage {
// 			let img: PivotCenterImage = this._dataDic.getByKeyIndex(index);
// 			if (!img) {
// 				console.assert(false, "不存在索引为：" + index + "的图");
// 			}
// 			return img;
// 		}

// 		/**
// 		 * 释放
// 		 */
// 		public dispose(): void {
// 			this._dataDic.clear();
// 			this._dataDic = null;
// 		}
// 	}
// }
