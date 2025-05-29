import { useEffect, useState } from "react";
import type { RefObject } from "react";

type Size = { w: number; h: number };

export function useElementSize(ref: RefObject<HTMLElement | null>): Size {
	const [size, setSize] = useState<Size>({ w: 0, h: 0 });

	useEffect(() => {
		const element = ref.current;
		if (!element) return;

		const updateSize = () => {
			setSize({
				w: element.offsetWidth,
				h: element.offsetHeight,
			});
		};

		updateSize();

		const observer = new ResizeObserver(updateSize);
		observer.observe(element);
		return () => observer.disconnect();
	}, [ref.current]);

	return size;
}
