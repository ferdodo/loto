import { Bodies, Body } from "matter-js";

export function createHollowCircle(
	x: number,
	y: number,
	outerRadius: number,
	innerRadius: number,
	segments: number,
	circleCompletion = 100,
	angle = 0,
): [Body[], (angle: number) => void] {
	const woodRender = {
		fillStyle: "brown",
		strokeStyle: "#222222",
		lineWidth: 1,
	};

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
