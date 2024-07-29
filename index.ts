import { parse } from "node-html-parser";
import { svgString } from "./seatsvg";

export interface Seat {
	id: string;
	label: string;
	column: number;
	row: number;
	indexFromLeft: number;
	status: SeatStatus;
	price: number;
	transform?: string;
	d?: string;
}

enum SeatStatus {
	Occupied = "occupied",
	Available = "empty",
	Reserved = "reserved",
}

export function transformSvgToSeatArray(): Seat[] {
	const root = parse(svgString);
	const pathButtons = root.querySelectorAll("path");

	const seats: Seat[] = pathButtons.map((pathButton) => {
		const id = pathButton.getAttribute("data-id") || "";
		const column = Number(
			pathButton.getAttribute("data-column")?.replace("{", "").replace("}", ""),
		);
		const row = Number(
			pathButton.getAttribute("data-row")?.replace("{", "").replace("}", ""),
		);
		const indexFromLeft = Number(
			pathButton
				.getAttribute("data-index-from-left")
				?.replace("{", "")
				.replace("}", ""),
		);
		const transform = pathButton.getAttribute("transform") || "";
		const d = pathButton.getAttribute("d") || "";

		// Assuming other attributes for seat status, sectionId, category, price, and label
		const seat: Seat = {
			id: id,
			label: id, // Replace with actual label if available
			column,
			row,
			indexFromLeft,
			status: SeatStatus.Available, // Replace with actual status if available
			price: 100, // Replace with actual price if available
			transform,
			d,
		};

		return seat;
	});

	return seats;
}

const seats = transformSvgToSeatArray();
console.log(seats);
