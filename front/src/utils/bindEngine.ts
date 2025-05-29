import {
	Bodies,
	Body,
	Composite,
	Engine,
	Events,
	Render,
	Runner,
} from "matter-js";

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
		},
	});

	const balls = [];

	for (let i = 0; i < 90; i++) {
		balls.push(Bodies.circle(400 + Math.random(), 200 + Math.random(), 17));
	}

	const [arena, rotateArena] = createHollowCircle(500, 200, 225, 205, 40, 98.5);

	const [mixer, rotateMixer] = createHollowCircle(500, 200, 195, 100, 40, 1);
	const [mixer1, rotateMixer1] = createHollowCircle(500, 200, 195, 100, 40, 1);
	const [mixer2, rotateMixer2] = createHollowCircle(500, 200, 195, 100, 40, 1);

	rotateMixer1((2 * Math.PI) / 3);
	rotateMixer2((2 * Math.PI) / 3);
	rotateMixer2((2 * Math.PI) / 3);

	const ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
	Body.setAngle(ground, -25);

	Composite.add(engine.world, [
		...balls,
		ground,
		...arena,
		...mixer,
		...mixer1,
		...mixer2,
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
		const accel = 0.8 + elapsed / 8000;
		rotateArena(delta * 0.0005);
		rotateMixer(-delta * 0.0005 * accel);
		rotateMixer1(-delta * 0.0005 * accel);
		rotateMixer2(-delta * 0.0005 * accel);
	});

	return () => {
		Render.stop(render);
		Runner.stop(runner);
		Composite.clear(engine.world, false);
		Engine.clear(engine);
		render.canvas?.parentNode?.removeChild(render.canvas);
	};
}
