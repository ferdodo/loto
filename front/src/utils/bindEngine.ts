import { Loto } from "core";
import { Events, Render, Runner } from "matter-js";
import { Bodies, Body, Composite, Engine } from "matter-js";
import { createHollowCircle } from "./createHollowCircle";
import { isColorLight } from "./isColorLight";

export function bindEngine(
	element: HTMLElement | null,
	width: number,
	height: number,
	loto: Loto | null,
) {
	if (!element || !loto) {
		return () => {};
	}

	const engine = Engine.create();

	const render = Render.create({
		element,
		engine,
		options: {
			width,
			height,
			wireframes: false,
			background: "transparent",
		},
	});

	const couronne = new Image();
	couronne.src = "./couronne.png";
	const tree = new Image();
	tree.src = "./tree-branch.png";

	const xShift = 180;
	const yShift = -100;

	const center = {
		x: width / 2 + xShift,
		y: height / 2 + yShift,
	};

	render.bounds.min.x = center.x - width / 2;
	render.bounds.max.x = center.x + width / 2;
	render.bounds.min.y = center.y - height / 2;
	render.bounds.max.y = center.y + height / 2;

	Render.lookAt(render, {
		min: render.bounds.min,
		max: render.bounds.max,
	});

	const balls: Body[] = [];

	for (const _num of Loto.numbersLeft(loto)) {
		balls.push(Bodies.circle(400 + Math.random(), 200 + Math.random(), 17));
	}

	const [arena, rotateArena] = createHollowCircle(500, 200, 225, 205, 40, 100);

	const [gutter, rotateGutter] = createHollowCircle(
		500,
		200,
		225 + 55,
		205 + 55,
		40,
		97,
	);

	rotateGutter(1.7);

	const [mixer, rotateMixer] = createHollowCircle(500, 200, 195, 100, 40, 1);
	const [mixer1, rotateMixer1] = createHollowCircle(500, 200, 195, 100, 40, 1);
	const [mixer2, rotateMixer2] = createHollowCircle(500, 200, 195, 100, 40, 1);

	rotateMixer1((2 * Math.PI) / 3);
	rotateMixer2((2 * Math.PI) / 3);
	rotateMixer2((2 * Math.PI) / 3);

	const invisible = { visible: false };

	const ground = Bodies.rectangle(400, 610, 810, 60, {
		isStatic: true,
		render: invisible,
	});
	const basket1 = Bodies.rectangle(845, 675, 10, 60, {
		isStatic: true,
		render: invisible,
	});
	const basket2 = Bodies.rectangle(825, 685, 60, 20, {
		isStatic: true,
		render: invisible,
	});

	Body.setAngle(ground, -25);
	Body.setAngle(basket1, -25);
	Body.setAngle(basket2, -25);

	Composite.add(engine.world, [
		...balls,
		ground,
		...arena,
		...mixer,
		...mixer1,
		...mixer2,
		...gutter,
		basket1,
		basket2,
	]);

	Render.run(render);
	const runner = Runner.create();
	Runner.run(runner, engine);

	let lastTime = 0;
	const start = Date.now();

	Events.on(engine, "beforeUpdate", (event) => {
		if (!loto?.isDrawRequested) {
			return;
		}

		const delta = event.timestamp - lastTime;
		lastTime = event.timestamp;
		const elapsed = Date.now() - start;
		const accel = 0.8 + elapsed / 50000;
		rotateArena(delta * 0.0005);
		rotateMixer(-delta * 0.0005 * accel);
		rotateMixer1(-delta * 0.0005 * accel);
		rotateMixer2(-delta * 0.0005 * accel);
	});

	Events.on(render, "afterRender", () => {
		const ctx = render.context;
		ctx.save();
		ctx.font = "20px InfoStory";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		let text = 0;

		const numsLeft = Loto.numbersLeft(loto);

		for (const ball of balls) {
			ctx.fillStyle = isColorLight(ball.render.fillStyle || "#ffffff")
				? "black"
				: "white";

			ctx.translate(ball.position.x - xShift, ball.position.y - yShift);
			ctx.rotate(ball.angle);
			const marked = numsLeft[text] === 6 || numsLeft[text] === 9;
			ctx.fillText(`${numsLeft[text]}${marked ? "." : ""}`, 0, 0);
			text++;
			ctx.setTransform(1, 0, 0, 1, 0, 0);
		}

		render.context.drawImage(
			couronne,
			-387,
			10 + yShift,
			couronne.width * 1.1,
			couronne.height * 1.1,
		);

		render.context.drawImage(tree, -70, 520 + yShift, tree.width, tree.height);
		ctx.restore();
	});

	return () => {
		Render.stop(render);
		Runner.stop(runner);
		Composite.clear(engine.world, false);
		Engine.clear(engine);
		render.canvas?.parentNode?.removeChild(render.canvas);
	};
}
