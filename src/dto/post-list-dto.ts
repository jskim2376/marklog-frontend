import { Tag } from "./tag-dto";

export interface PostListDto {
	postId: number;
	thumbnail: string;
	title: string;
	summary: string;
	createdDate: Date;
	commentCount: number;
	likeCount: number;
	picture: string;
	userName: string;
	userId: number;
	tagList: Array<Tag>;
}
