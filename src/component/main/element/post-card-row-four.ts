import { PostCard } from "./post-card";

export class PostCardRowFour extends PostCard {
	constructor() {
		super();
		this.cardRow.setAttribute("class", "row row-cols-1 row-cols-lg-2 row-cols-xxl-4");
	}
}
