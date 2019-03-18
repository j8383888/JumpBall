// /**
//  * 弹出面板基类
//  * @author suo
//  * 2018.4.4
//  */
// module catchDoll {
// 	import Sprite = egret.Sprite;
// 	import Shape = egret.Shape;

// 	export class BasePopPanel extends eui.Component {

// 		protected _blakBG: Shape = new Shape();
// 		private _enterEff: POP_EFFECT;
// 		private _drawBar: Shape = new Shape();
// 		protected _posX: number = -1;
// 		protected _posY: number = -1;
// 		protected _hasBlackBg: boolean = false;
// 		private _alpha: number = 0.5;
// 		private _lastPointX: number = -1;
// 		private _lastPointY: number = -1;

// 		protected _panelWidth: number = -1;
// 		protected _panelHeight: number = -1;
// 		protected _panelX: number = 0;
// 		protected _panelY: number = 0;

// 		protected _blackBgHandler: Handler;
// 		/*通用关闭按钮*/
// 		public commonCloseBtn: Button = null;

// 		public constructor(enterEff: POP_EFFECT = POP_EFFECT.CENTER, blackBg: boolean = false, alpha: number = 0.5) {
// 			super();
// 			this._alpha = alpha;
// 			this._hasBlackBg = blackBg;
// 			this._enterEff = enterEff;

// 			this.once(eui.UIEvent.CREATION_COMPLETE, this._creationComplete, this);
// 		}

// 		/**
// 		 * 添加到舞台
// 		 */
// 		public addToStage(layer: LAYER = LAYER.POP): void {
// 			LayerManager.instance.addToLayer(this, layer);
// 			this._showBlackBg(layer);
// 		}

// 		/**
// 		 * 加载完毕并放置到舞台上
// 		 */
// 		private _creationComplete(e: egret.Event): void {
// 			this._selfAdaption();
// 			this.showEnterEff();
// 			this._drawDragRect();
// 		}

// 		/**
// 		 * 设置黑色背景点击函数
// 		 */
// 		public set blackBgHandler(value: Handler) {
// 			this._blackBgHandler = value;
// 		}

// 		/**
// 		 * 自适应
// 		 */
// 		public _selfAdaption() {
// 			if (this.skin["bg"] != null) {
// 				this._panelWidth = this.skin["bg"].width;
// 				this._panelHeight = this.skin["bg"].height;
// 				this._panelX = this.skin["bg"].x;
// 				this._panelY = this.skin["bg"].y;

// 			} else {
// 				this._panelWidth = this.width;
// 				this._panelHeight = this.height;
// 			}
// 			this._posX = (GameCenter.stageW - this._panelWidth) / 2 - this._panelX;
// 			this._posY = (GameCenter.stageH - this._panelHeight) / 2 - this._panelY;
// 		}

// 		/**
// 		 * 设置关闭按钮
// 		 */
// 		public set closeBtnHandler(cb: Handler) {
// 			if (this.skin["closeBtn"] != null) {
// 				this.commonCloseBtn = new Button(this.skin["closeBtn"]);
// 				this.commonCloseBtn.mouseClickHandler = Handler.create(this, this.showCloseEff, [cb], true)
// 			}
// 			if (this._hasBlackBg) {
// 				this._blackBgHandler = Handler.create(this, this.showCloseEff, [cb], true)
// 			}
// 		}

// 		/**
// 		 * 绘制拖动栏（不需要就重写此方法）
// 		 */
// 		public _drawDragRect(): void {
// 			// this._drawBar.graphics.beginFill(ColorUtil.COLOR_BLACK, 0);
// 			// this._drawBar.graphics.drawRect(0, 0, this._panelWidth, 50);
// 			// this._drawBar.graphics.endFill();
// 			// this._drawBar.x = this._panelX;
// 			// this._drawBar.y = this._panelY;
// 			// this._drawBar.touchEnabled = true;
// 			// this.addChildAt(this._drawBar, 1);

// 			// this._drawBar.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._starDrag, this);
// 			// this._drawBar.addEventListener(egret.TouchEvent.TOUCH_END, this._endDrag, this);
// 			// this._drawBar.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this._outsideDrag, this);
// 		}

// 		/**
// 		 * 开始拖动
// 		 */
// 		private _starDrag(e: egret.TouchEvent): void {
// 			egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this._onDrag, this);
// 			this._lastPointX = e.stageX;
// 			this._lastPointY = e.stageY;
// 		}

// 		/**
// 		 * 拖到屏幕外
// 		 */
// 		private _outsideDrag(e: egret.TouchEvent): void {
// 			egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this._onDrag, this);
// 			this._lastPointX = e.stageX;
// 			this._lastPointY = e.stageY;
// 		}


// 		/**
// 		 * 正在拖动
// 		 */
// 		private _onDrag(e: egret.TouchEvent): void {
// 			var stepX: number = e.stageX - this._lastPointX;
// 			var stepY: number = e.stageY - this._lastPointY;

// 			this.x += stepX;
// 			this.y += stepY;

// 			this._lastPointX = e.stageX;
// 			this._lastPointY = e.stageY;
// 		}

// 		/**
// 		 * 拖动结束
// 		 */
// 		private _endDrag(e: egret.TouchEvent): void {
// 			egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this._onDrag, this);
// 			this._lastPointX = e.stageX;
// 			this._lastPointY = e.stageY;
// 		}

// 		/**
// 		 * 绘制黑色背景
// 		 */
// 		public _showBlackBg(layerType: LAYER): void {
// 			if (this._hasBlackBg) {
// 				this._blakBG.graphics.beginFill(0x000000, this._alpha);
// 				this._blakBG.graphics.drawRect(0, 0, GameCenter.stageW, GameCenter.stageH);
// 				this._blakBG.graphics.endFill();
// 				this._blakBG.touchEnabled = true;
// 				this._blakBG.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onClickBlackBg, this)
// 				let layer = LayerManager.instance.getLayer(layerType);
// 				layer.addChildAt(this._blakBG, 0);
// 			}
// 		}

// 		/**
// 		 * 点击黑色背景
// 		 */
// 		private _onClickBlackBg(): void {
// 			if (this._blackBgHandler) {
// 				this._blackBgHandler.run();
// 			}
// 		}

// 		/**
// 		 * 释放(子类请super.dipose())
// 		 */
// 		public dispose(): void {
// 			// this._drawBar.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this._starDrag, this);
// 			// this._drawBar.removeEventListener(egret.TouchEvent.TOUCH_END, this._endDrag, this);
// 			// this._drawBar.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this._outsideDrag, this);
// 			// egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this._onDrag, this);
// 			LayerManager.instance.removeFromLayer(this);
// 			if (this._enterEff != POP_EFFECT.NORMAL) {
// 				egret.Tween.removeTweens(this);
// 			}

// 			if (this._hasBlackBg) {
// 				this._blakBG.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onClickBlackBg, this)
// 				LayerManager.instance.removeFromLayer(this._blakBG)
// 				this._blakBG = null;
// 				if (this._blackBgHandler) {
// 					this._blackBgHandler.recover();
// 					this._blackBgHandler = null;
// 				}
// 			}
// 			if (this.commonCloseBtn) {
// 				this.commonCloseBtn.dispose();
// 				this.commonCloseBtn = null;
// 			}
// 		}

// 		/**
// 		 * 显示关闭面板特效
// 		 */
// 		public showCloseEff(cb?: Handler): void {
// 			let targetX: number = this._posX + this._panelWidth / 4;
// 			let targetY: number = this._posY + this._panelHeight / 4;
// 			LayerManager.instance.removeFromLayer(this._blakBG)
// 			if (cb) {
// 				egret.Tween.get(this).to({ alpha: 0, scaleX: 0.5, scaleY: 0.5, x: targetX, y: targetY }, 400, egret.Ease.backOut).call(this._closePanel, this, [cb]);
// 			}
// 			else {
// 				egret.Tween.get(this).to({ alpha: 0, scaleX: 0.5, scaleY: 0.5, x: targetX, y: targetY }, 400, egret.Ease.backOut).call(() => {
// 					this.visible = false;
// 				})
// 			}
// 		}

// 		/**
// 		 * 关闭面板
// 		 */
// 		protected _closePanel(cb: Handler): void {
// 			cb.run();
// 		}

// 		/**
// 		 * 入场动画
// 		 */
// 		public showEnterEff(): void {
// 			if (this._enterEff != POP_EFFECT.NORMAL) {
// 				egret.Tween.removeTweens(this);
// 			}
// 			switch (this._enterEff) {
// 				case POP_EFFECT.NORMAL:
// 					this.x = this._posX;
// 					this.y = this._posY;
// 					break;
// 				case POP_EFFECT.CENTER:
// 					this.alpha = 0;
// 					this.scaleX = 0.5;
// 					this.scaleY = 0.5;
// 					this.x = this._posX + this._panelWidth / 4;
// 					this.y = this._posY + this._panelHeight / 4;
// 					egret.Tween.get(this).to({ alpha: 1, scaleX: 1, scaleY: 1, x: this._posX, y: this._posY }, 300, egret.Ease.backOut);
// 					break;
// 				case POP_EFFECT.CENTER_FIERCE:
// 					this.alpha = 0;
// 					this.scaleX = 0.5;
// 					this.scaleY = 0.5;
// 					this.x = this._posX + this._panelWidth / 4;
// 					this.y = this._posY + this._panelHeight / 4;
// 					egret.Tween.get(this).to({ alpha: 1, scaleX: 1, scaleY: 1, x: this._posX, y: this._posY }, 600, egret.Ease.elasticOut);
// 					break;
// 				case POP_EFFECT.LEFT_TO_RIGHT:
// 					this.x = - this._panelWidth;
// 					egret.Tween.get(this).to({ x: this._posX }, 300, egret.Ease.cubicOut);
// 					break;
// 				case POP_EFFECT.RIGHT_TO_LEFT:
// 					this.x = this._panelWidth;
// 					egret.Tween.get(this).to({ x: this._posX }, 300, egret.Ease.cubicOut);
// 					break;
// 				case POP_EFFECT.TOP_TO_BOTTOM:
// 					this.y = -this._panelHeight;
// 					egret.Tween.get(this).to({ y: this._posY }, 300, egret.Ease.cubicOut);
// 					break;
// 				case POP_EFFECT.BOTTOM_TO_TOP:
// 					this.y = this._panelHeight;
// 					egret.Tween.get(this).to({ y: this._posY }, 300, egret.Ease.cubicOut);
// 					break;
// 			}
// 		}
// 	}
// }
// /**
// * 弹出效果
// */
// const enum POP_EFFECT {

// 	/**
// 	 * 普通
// 	 */
// 	NORMAL = 0,
// 	/**
// 	 * 从中间轻微弹出
// 	 */
// 	CENTER = 1,
// 	/**
// 	 * 从中间猛烈弹出
// 	 */
// 	CENTER_FIERCE = 2,
// 	/**
// 	 * 从左向右
// 	 */
// 	LEFT_TO_RIGHT = 3,
// 	/**
// 	 * 从右向左
// 	 */
// 	RIGHT_TO_LEFT = 4,
// 	/**
// 	 * 从上到下
// 	 */
// 	TOP_TO_BOTTOM = 5,
// 	/**
// 	 * 从下到上
// 	 */
// 	BOTTOM_TO_TOP = 6,
// }