/**
 * 全局工具
 * @author suo
 */
module JumpBall {
	export class GlobeTool {



		public constructor() {
		}


		public static formatTime_DDHHMM(totalSeconds: number): string {
			if (totalSeconds <= 0) {
				return "";
			}

			var timeString: string = "";
			var day: number = Math.floor(totalSeconds / 86400);
			var hour: number = Math.floor((totalSeconds - day * 86400) / 3600)
			var minutes: number = Math.floor((totalSeconds - day * 86400 - hour * 3600) / 60);

			if (day > 0) {
				timeString += day.toString() + "天";
			}

			if (hour < 10) {
				timeString += "0" + hour.toString() + "小时";
			}
			else if (hour != 0) {
				timeString += hour.toString() + "小时";
			}

			if (minutes < 10) {
				timeString += "0" + minutes.toString() + "分";
			}
			else if (minutes != 0) {
				timeString += minutes.toString() + "分";
			}

			return timeString;
		}

		public static formatTime_HHMMSS(totalSeconds: number): string {
			var timeString: string = ""
			var hour: number = Math.floor(totalSeconds / 3600);
			var minutes: number = Math.floor((totalSeconds - hour * 3600) / 60);
			var seconds: number = Math.floor(totalSeconds - hour * 3600) % 60
			if (hour < 10) {
				timeString += "0" + hour.toString();
			} else {
				timeString += "" + hour;
			}
			if (minutes < 10) {
				timeString += ":0" + minutes.toString();
			} else {
				timeString += ":" + minutes;
			}
			if (seconds < 10) {
				timeString += ":0" + seconds.toString();
			} else {
				timeString += ":" + seconds;
			}
			return timeString;
		}

		public static creatRectBody(view: egret.DisplayObjectContainer, x, y, w, h, mess: number = 1, angularVelocity = 1): p2.Body {
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
			display = this.createRect(width * factor, height * factor);
			boxBody.displays = [display];
			view.addChild(display);
			return boxBody;
		}

		/**
		 * 圆形刚体
		 */
		public static creatCircleBody(view, x, y, r, mess = 0, angularVelocity = 1): p2.Body {
			var factor: number = 50;
			let radius = Math.floor(r / factor);
			let posX = Math.floor(x / factor);
			let posY = Math.floor(y / factor);
			var display: egret.DisplayObject;

			var circleShape: p2.Shape = new p2.Circle({ radius: radius });
			// circleShape.material = new p2.Material(1001);
			var nody: p2.Body = new p2.Body({ mass: mess, position: [posX, posY], angularVelocity: angularVelocity });
			nody.addShape(circleShape);
			display = this.createBall(radius * factor);
			nody.displays = [display];
			view.addChild(display);
			return nody;
		}

		/**
		 * 创建三角形
		 */
		public static createTrianglesBody(view, x, y, mess = 0, angularVelocity = 1): p2.Body {
			var factor: number = 50;
			let posX = Math.floor(x / factor);
			let posY = Math.floor(y / factor);
			let pos1 = [0, 0];
			let pos2 = [0, -2];
			let pos3 = [2, 0];
	
			let vertices: number[][] = [pos1, pos2, pos3];
			let convex: p2.Convex = new p2.Convex({ vertices: vertices });
			var body: p2.Body = new p2.Body({ mass: mess, position: [posX, posY], angularVelocity: angularVelocity });
			// body.fromPolygon(vertices, { optimalDecomp: false });
			body.addShape(convex);
			var display: egret.DisplayObject = this.drawConvex(vertices, ColorUtil.COLOR_RED);
			body.displays = [display];
			view.addChild(display);
			return body;
		}

		/**
		 * 创建一个方形
		 */
		public static createRect(width: number, height: number, color: number = ColorUtil.COLOR_GREEN): egret.Shape {
			var shape = new egret.Shape();
			shape.graphics.beginFill(color);
			shape.graphics.drawRect(0, 0, width, height);
			shape.graphics.endFill();
			shape.anchorOffsetX = width / 2;
			shape.anchorOffsetY = height / 2;
			return shape;
		}

		/**
     	 * 创建一个圆形
     	 */
		public static createBall(r: number): egret.Shape {
			var shape = new egret.Shape();
			shape.graphics.beginFill(0xfff000);
			shape.graphics.drawCircle(r, r, r);
			shape.graphics.endFill();
			shape.anchorOffsetX = r;
			shape.anchorOffsetY = r;
			return shape;
		}

		/**
     	 * 创建一个三角形
     	 */
		public static createTriangles(p1, p2, p3): egret.Shape {
			var shape = new egret.Shape();
			let g = shape.graphics;
			g.lineStyle(1, ColorUtil.COLOR_GOLD);
			g.moveTo(p1[0], p1[1]);
			g.lineTo(p2[0], p2[1]);
			g.lineTo(p3[0], p3[1]);
			g.lineTo(p1[0], p1[1]);
			g.endFill();
			// shape.anchorOffsetX = -50;
			// shape.anchorOffsetY = -50;
			return shape
		}

		public static drawConvex(vertices: number[][], color: number, alpha: number = 1, fillColor: boolean = true): egret.Shape {
			let factor = 50
			let shape: egret.Shape = new egret.Shape();
			shape.graphics.lineStyle(1, color);
			if (fillColor) shape.graphics.beginFill(color, alpha);

			var l: number = vertices.length;
			var worldPoint: number[] = vertices[0];
			shape.graphics.moveTo(worldPoint[0] * factor, worldPoint[1] * factor);
			for (var i: number = 1; i <= l; i++) {
				worldPoint = vertices[i % l];
				shape.graphics.lineTo(worldPoint[0] * factor, worldPoint[1] * factor);
			}
			shape.graphics.endFill();
			return shape;
		}

		/**
		 * 创建矩形边缘
		 */
		public static creatRectBorderBody(view, x, y, w, h, rectW, rectH): p2.Body {
			var factor: number = 50;
			let width = Math.floor(w / factor);
			let height = Math.floor(h / factor);
			let posX = x / factor;
			let posY = y / factor;
			var display: egret.DisplayObject;
			//添加方形刚体
			var boxShape: p2.Shape = new p2.Box({ width: width, height: height });
			// boxShape.material = new p2.Material(1000)
			var boxBody: p2.Body = new p2.Body({ mass: 0, position: [posX, posY] });
			boxBody.addShape(boxShape);
			display = this.createRect(rectW, rectH, ColorUtil.COLOR_SHADOW);
			boxBody.displays = [display];
			view.addChild(display);
			return boxBody;
		}
	}

	export enum PROP_ID {
		MONEY = 1,
		DIAMOND = 2,
		HONOR = 3,
	}

	export function isInteger(obj) {
		return typeof obj === 'number' && obj % 1 === 0
	}
}

