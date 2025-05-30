import {
	Bodies,
	Body,
	Composite,
	Engine,
	Events,
	Render,
	Runner,
} from "matter-js";

const woodRender = { fillStyle: "brown", strokeStyle: "#222222", lineWidth: 1 };

function createHollowCircle(
	x: number,
	y: number,
	outerRadius: number,
	innerRadius: number,
	segments: number,
	circleCompletion = 100,
	angle = 0,
): [Body[], (angle: number) => void] {
	const thickness = outerRadius - innerRadius;
	const bodies: Body[] = [];
	const radianCompletion = (circleCompletion / 100) * 2 * Math.PI;
	const startAngle = angle * (Math.PI / 180);

	for (let i = 0; i < segments; i++) {
		const segmentAngle = (i / segments) * radianCompletion + startAngle;
		const nextSegmentAngle =
			((i + 1) / segments) * radianCompletion + startAngle;

		if (segmentAngle > startAngle + 2 * Math.PI) break;

		const midAngle = (segmentAngle + nextSegmentAngle) / 2;
		const midRadius = (outerRadius + innerRadius) / 2;

		const rectX = x + Math.cos(midAngle) * midRadius;
		const rectY = y + Math.sin(midAngle) * midRadius;

		const rect = Bodies.rectangle(
			rectX,
			rectY,
			thickness,
			(2 * Math.PI * midRadius) / segments,
			{
				angle: midAngle,
				isStatic: true,
				render: woodRender,
			},
		);

		bodies.push(rect);
	}

	const bodiesInitialPositions: Map<Body, { x: number; y: number }> = new Map(
		bodies.map((body) => [body, { x: body.position.x, y: body.position.y }]),
	);

	function rotate(angle: number): void {
		for (const body of bodies) {
			const initialPosition = bodiesInitialPositions.get(body);

			if (!initialPosition) {
				throw new Error("Body not found in initial positions map !");
			}

			const currentX = body.position.x;
			const currentY = body.position.y;
			const radius = Math.sqrt((currentX - x) ** 2 + (currentY - y) ** 2);
			const newX = x + radius * Math.cos(body.angle + angle);
			const newY = y + radius * Math.sin(body.angle + angle);
			Body.setPosition(body, { x: newX, y: newY });
			Body.setAngle(body, body.angle + angle);
		}
	}

	return [bodies, rotate];
}

function isColorLight(hex: string) {
	const hexT = hex.replace("#", "");
	const r = Number.parseInt(hexT.substr(0, 2), 16);
	const g = Number.parseInt(hexT.substr(2, 2), 16);
	const b = Number.parseInt(hexT.substr(4, 2), 16);
	const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
	return hsp > 127.5;
}

export function bindEngine(
	element: HTMLElement | null,
	width: number,
	height: number,
) {
	if (!element) {
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
	const yShift = -200;

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

	for (let i = 0; i < 90; i++) {
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
		ctx.font = "20px Arial";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		let text = 0;

		for (const ball of balls) {
			ctx.fillStyle = isColorLight(ball.render.fillStyle || "#ffffff")
				? "black"
				: "white";

			ctx.translate(ball.position.x - xShift, ball.position.y - yShift);
			ctx.rotate(ball.angle);
			text++;
			ctx.fillText(`${text}`, 0, 0);
			ctx.setTransform(1, 0, 0, 1, 0, 0);
		}

		render.context.drawImage(
			couronne,
			-387,
			10,
			couronne.width * 1.1,
			couronne.height * 1.1,
		);

		render.context.drawImage(tree, -70, 520, tree.width, tree.height);
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
