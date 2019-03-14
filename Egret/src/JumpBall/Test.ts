module JumpBall {
	export class Test extends eui.Component {

		//debug模式，使用图形绘制
		private isDebug: boolean = true;

		public world: p2.World;

		public static _instance: Test = null;

		public constructor() {
			super();
			this.skinName = "MainSceneSkin"
			this._init();
			this.creatRectBody(360, 640, 100, 50, 0, 0)
		}

		public static get instance(): Test {
			if (this._instance == null) {
				this._instance = new Test();
			}
			return this._instance;

		}

		/**
		 * 创建静态刚体
		 */
		private _creatStaticBody(): void {

		}

		public creatRectBody(x, y, w, h, mess: number = 1, angularVelocity = 1): p2.Body {
			var factor: number = 50;
			let width = Math.floor(w / factor);
			let height = Math.floor(h / factor);
			let posX = x / factor;
			let posY = y / factor;
			var display: egret.DisplayObject;
			//添加方形刚体
			var boxShape: p2.Shape = new p2.Box({ width: width, height: height });
			var boxBody: p2.Body = new p2.Body({ mass: mess, position: [posX, posY], angularVelocity: angularVelocity });
			boxBody.addShape(boxShape);
			this.world.addBody(boxBody);
			display = this.createRect(width * factor, height * factor);
			boxBody.displays = [display];
			this.addChild(display);
			return boxBody;
		}

		public creatCircleBody(x, y, r, mess = 0, angularVelocity = 1): p2.Body {
			var factor: number = 50;
			let radius = Math.floor(r / factor);
			let posX = Math.floor(x / factor);
			let posY = Math.floor(y / factor);
			var display: egret.DisplayObject;
			//添加方形刚体
			var boxShape: p2.Shape = new p2.Circle({ radius: radius });
			var boxBody: p2.Body = new p2.Body({ mass: mess, position: [posX, posY], angularVelocity: angularVelocity });
			boxBody.addShape(boxShape);
			this.world.addBody(boxBody);
			display = this.createBall(radius * factor);
			boxBody.displays = [display];
			this.addChild(display);
			return boxBody;
		}

		/**
		 * 创建world
		 */
		private _creatWorld(): void {
			var world: p2.World = new p2.World();
			world.sleepMode = p2.World.BODY_SLEEPING;
			world.defaultContactMaterial.restitution = 0.5;
			world.gravity = [0, -9.8];
			this.world = world;
		}

		/**
		 * 创建plane
		 */
		private _creatPanelBody(): p2.Body {
			var planeShape: p2.Plane = new p2.Plane();
			var planeBody: p2.Body = new p2.Body({
				//刚体类型
				type: p2.Body.STATIC,
				//刚体的位置
				position: [0, 0]
			});
			planeBody.addShape(planeShape);
			planeBody.displays = [];
			this.world.addBody(planeBody);
			return planeBody;
		}

		private _worldLoop(dt): void {
			if (dt < 10) {
				return;
			}
			if (dt > 1000) {
				return;
			}
			let world = Test.instance.world;
			world.step(dt / 1000);
			var factor: number = 50;


			var stageHeight: number = egret.MainContext.instance.stage.stageHeight;
			var l = world.bodies.length;
			for (var i: number = 0; i < l; i++) {
				var boxBody: p2.Body = world.bodies[i];
				var box: egret.DisplayObject = boxBody.displays[0];
				if (box) {
					box.x = boxBody.position[0] * factor;
					box.y = stageHeight - boxBody.position[1] * factor;
					box.rotation = 360 - (boxBody.angle + boxBody.shapes[0].angle) * 180 / Math.PI;
					if (boxBody.sleepState == p2.Body.SLEEPING) {
						box.alpha = 0.5;
					}
					else {
						box.alpha = 1;
					}
				}
			}

		}

		private _init(): void {
			this._creatWorld();
			this._creatPanelBody();
			egret.Ticker.getInstance().register(this._worldLoop, this);

			//鼠标点击添加刚体
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.addRamdonOneBody, this);
		}

		private addRamdonOneBody(e: egret.TouchEvent): void {
			var positionX: number = e.stageX;
			var positionY: number = egret.MainContext.instance.stage.stageHeight - e.stageY;
			if (Math.random() > 1) {
				let body = this.creatRectBody(positionX, positionY, 100, 50, 1);
			}
			else {
				this.creatCircleBody(positionX, positionY, 50, 1)
			}
		}

		/**
     * 创建一个圆形
     */
		private createBall(r: number): egret.Shape {
			var shape = new egret.Shape();
			shape.graphics.beginFill(0xfff000);
			shape.graphics.drawCircle(r, r, r);
			shape.graphics.endFill();
			shape.anchorOffsetX = r;
			shape.anchorOffsetY = r;
			return shape;
		}
		/**
		 * 创建一个方形
		 */
		private createRect(width: number, height: number): egret.Shape {
			var shape = new egret.Shape();
			shape.graphics.beginFill(0xfff000);
			shape.graphics.drawRect(0, 0, width, height);
			shape.graphics.endFill();
			shape.anchorOffsetX = width / 2;
			shape.anchorOffsetY = height / 2;
			return shape;
		}

		/**
     	* 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     	*/
		private createBitmapByName(name: string): egret.Bitmap {
			var result: egret.Bitmap = new egret.Bitmap();
			var texture: egret.Texture = RES.getRes(name);
			result.texture = texture;
			return result;
		}
	}

	// enum BODY_SHAPE {
	// 	RECT,
	// 	CIRCLE,
	// }
}