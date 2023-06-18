export interface PostComment {
	userId: number;
	userName: string;
	picture: string;
	postCommentId: number;
	content: string;
	childList: any[];
}
