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

export interface PostResponseDto {
	createdDate: string;
	modifiedDate: string;
	title: string;
	content: string;
	userId: number;
	userName: string;
	tagList: Array<Tag>;
	like: boolean;
}
