module JumpBall {
	export class Demo2 extends eui.Component {

		private debugDraw: p2DebugDraw;
		private world: p2.World;
		public constructor() {
			super();
			this.skinName = "MainSceneSkin"
			this.init();
		}

		public init(): void {
			this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
			//鼠标点击添加刚体
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.addOneBox, this);
			this.createWorld();
			this.createGround();
			this.createBodies();
			this.createDebug();
		}

		private createWorld(): void {
			var wrd: p2.World = new p2.World();
			wrd.sleepMode = p2.World.BODY_SLEEPING;
			wrd.gravity = [0, 10];
			this.world = wrd;
		}
		private createGround(): void {
			var stageHeight: number = egret.MainContext.instance.stage.stageHeight;
			var groundShape: p2.Plane = new p2.Plane();
			var groundBody: p2.Body = new p2.Body();
			groundBody.position[1] = stageHeight - 100;
			groundBody.angle = Math.PI;
			groundBody.addShape(groundShape);


			this.world.addBody(groundBody);
		}
		private createBodies(): void {
			//var boxShape: p2.Shape = new p2.Rectangle(100, 50);
			var boxShape: p2.Shape = new p2.Box({ width: 100, height: 50 });
			var boxBody: p2.Body = new p2.Body({ mass: 1, position: [200, 200] });
			boxBody.addShape(boxShape);
			this.world.addBody(boxBody);

			//var boxShape: p2.Shape = new p2.Rectangle(50, 50);
			var boxShape: p2.Shape = new p2.Box({ width: 50, height: 50 });
			var boxBody: p2.Body = new p2.Body({ mass: 1, position: [200, 180], angularVelocity: 1 });
			boxBody.addShape(boxShape);
			this.world.addBody(boxBody);
		}
		private createDebug(): void {
			//创建调试试图
			this.debugDraw = new p2DebugDraw(this.world);
			var sprite: egret.Sprite = new egret.Sprite();
			this.addChild(sprite);
			this.debugDraw.setSprite(sprite);
		}
		private loop(): void {
			this.world.step(60 / 1000);
			this.debugDraw.drawDebug();
		}
		private types: string[] = [/*"box", "circle", "capsule", "line", "particle",*/ "triangles"]
		private addOneBox(e: egret.TouchEvent): void {
			var positionX: number = Math.floor(e.stageX);
			var positionY: number = Math.floor(e.stageY);
			var shape: p2.Shape;
			var body = new p2.Body({ mass: 1, position: [positionX, positionY], angularVelocity: 1 });

			var shapeType = this.types[Math.floor((Math.random() * this.types.length))];
			//shapeType = "particle";
			switch (shapeType) {


				case "box":
					//shape = new p2.Rectangle(Math.random() * 150 + 50, 100);
					shape = new p2.Box({ width: Math.random() * 150 + 50, height: 100 });
					break;
				case "circle":
					//shape = new p2.Circle(50);
					shape = new p2.Circle({ radius: 50 });
					break;
				case "capsule":
					//shape = new p2.Capsule(50, 10);
					shape = new p2.Capsule({ length: 50, radius: 10 });
					break;
				case "line":
					//shape = new p2.Line(150);
					shape = new p2.Line({ length: 150 });
					break;
				case "particle":
					shape = new p2.Particle();
					break;

				case "triangles":
					let pos1 = [0, 0];
					let pos2 = [0, -100];
					let pos3 = [100, 0];
					let vertices: number[][] = [pos1, pos2, pos3];
					shape = new p2.Convex({ vertices: vertices });
					break;

			}
			body.addShape(shape);
			this.world.addBody(body);
		}
	}
}