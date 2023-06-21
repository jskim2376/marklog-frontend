import { Tag } from "./tag";

export interface Post {
	title: string;
	content: string;
	tagList: string[];
}

export interface PostResponse {
	title: string;
	content: string;
	tagList: Tag[];
}
