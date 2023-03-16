import { PostCard } from "./post-card";

export class PostCardRowOne extends PostCard {
	constructor() {
		super();
		this.cardRow.setAttribute("class", "row row-cols-1");
	}
}
