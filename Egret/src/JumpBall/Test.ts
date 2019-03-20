module JumpBall {
	export class Test extends eui.Component {

		//debug模式，使用图形绘制
		private isDebug: boolean = true;

		public world: p2.World;

		public static _instance: Test = null;

		public m1: p2.Material;
		public m2: p2.Material;

		public cm1: p2.ContactMaterial;

		public constructor() {
			super();
			this.skinName = "MainSceneSkin"
			this._init();
			let body = GlobeTool.creatRectBody(this, 360, 640, 50, 50, 0, 0);
			this.world.addBody(body)
		}

		public static get instance(): Test {
			if (this._instance == null) {
				this._instance = new Test();
			}
			return this._instance;

		}




		/**
		 * 创建world
		 */
		private _creatWorld(): void {
			var world: p2.World = new p2.World();
			world.sleepMode = p2.World.BODY_SLEEPING;
			world.defaultContactMaterial.restitution = 1;
			world.gravity = [0, 0];
			this.world = world;
			// this.m1 = new p2.Material(1000);
			// this.m2 = new p2.Material(1001);
			// this.cm1 = new p2.ContactMaterial(this.m1, this.m2, <p2.ContactMaterialOptions>{ restitution: 1, friction: 0.0 });
			// this.world.addContactMaterial(this.cm1);
		}

		/**
		 * 创建plane
		 */
		private _creatPanelBody(x, y, w, h, angle): p2.Body {
			var factor: number = 50;
			let width = Math.floor(w / factor);
			let height = Math.floor(h / factor);
			let posX = x / factor;
			let posY = y / factor;
			let radian = UIUtil.getRadian(angle)
			var display: egret.DisplayObject;
			var planeShape: p2.Plane = new p2.Plane();
			var planeBody: p2.Body = new p2.Body({
				//刚体类型
				type: p2.Body.STATIC,
				//刚体的位置
				position: [posX, posY]
			});
			planeBody.angle = radian;
			planeBody.addShape(planeShape);
			this.world.addBody(planeBody);
			var shape = new egret.Shape();
			shape.graphics.beginFill(ColorUtil.COLOR_ORANGE);
			shape.graphics.drawRect(0, 0, width * factor, 10);
			shape.graphics.endFill();
			shape.anchorOffsetX = width * factor / 2;
			display = shape
			planeBody.displays = [display];
			this.addChild(display);
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
			this._creatPanelBody(750 / 2, 50, 750, 0, 0);
			let body1 = GlobeTool.creatRectBorderBody(this, 50, 1280 / 2, 100, 1280, 100, 1280);
			let body2 = GlobeTool.creatRectBorderBody(this, 720 - 50, 1280 / 2, 100, 1280, 100, 1280);
			let body3 = GlobeTool.creatRectBorderBody(this, 720 / 2, 1280 - 50, 720, 50, 720, 50);
			this.world.addBody(body1)
			this.world.addBody(body2)
			this.world.addBody(body3)
			egret.Ticker.getInstance().register(this._worldLoop, this);
			this.world.on("beginContact", this._onBeginContact, this);
			this.world.on("preSolve", this._onPreSolve, this);
			this.world.on("endContact", this._onEndContact, this);
			//鼠标点击添加刚体
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.addRamdonOneBody, this);
		}

		private _onBeginContact(e): void {
			console.log("碰撞开始")

		}

		private _onEndContact(): void {
			console.log("碰撞结束")
		}


		private _onPreSolve(e): void {
			for (var i = 0; i < e.contactEquations.length; i++) {
				console.log("preSolve")
				var eq: p2.ContactEquation = e.contactEquations[i];
				if (eq.bodyA.type == p2.Body.STATIC || eq.bodyB.type == p2.Body.STATIC) {
					eq.enabled = true;
				}
				else {
					eq.enabled = false;
				}
			}
		}

		private addRamdonOneBody(e: egret.TouchEvent): void {
			var positionX: number = e.stageX;
			var positionY: number = egret.MainContext.instance.stage.stageHeight - e.stageY;
			if (Math.random() > 1) {
				let body = GlobeTool.creatRectBody(this, positionX, positionY, 100, 50, 0);
				this.world.addBody(body);
			}
			else {
				let body = GlobeTool.creatCircleBody(this, positionX, positionY, 50, 1)
				body.gravityScale = 0;
				body.velocity = [0, 10]
				// body.

				this.world.addBody(body);
			}
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