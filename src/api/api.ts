import { Post } from "@/interface/post";
import { User } from "@/interface/user";
import $, { post } from "jquery";

export class Api {
	url: string;
	constructor() {
		this.url = "http://localhost/api/v1";
	}

	async setAccessToken() {
		try {
			let path = this.url + "/token/refresh";
			const result = await $.getJSON(path);
			localStorage.setItem("access-token", result.access_token);
		} catch {
			localStorage.removeItem("access-token");
		}
	}

	getUser(userId: string) {
		let path = this.url + "/user/" + userId;
		try {
			return $.getJSON(path);
		} catch {
			return null;
		}
	}

	putUser(userId: number, user: User) {
		let path = this.url + "/user/" + userId;
		let accessToken = localStorage.getItem("access-token");
		let bearerToken = "Bearer " + accessToken;
		return $.ajax({
			beforeSend: function (request) {
				request.setRequestHeader("Authorization", bearerToken);
			},
			data: JSON.stringify(user),
			contentType: "application/json",
			type: "PUT",
			url: path,
		});
	}

	deleteUser(userId: number) {
		let path = this.url + "/user/" + userId;
		let accessToken = localStorage.getItem("access-token");
		let bearerToken = "Bearer " + accessToken;
		return $.ajax({
			beforeSend: function (request) {
				request.setRequestHeader("Authorization", bearerToken);
			},
			type: "DELETE",
			url: path,
		});
	}

	getPostComment(postId: number) {
		let path = this.url + "/post/" + postId + "/comment";
		try {
			return $.getJSON(path);
		} catch {
			return null;
		}
	}

	postComment(postId: number, content: string, parent: number) {
		let accessToken = localStorage.getItem("access-token");
		let bearerToken = "Bearer " + accessToken;
		let path = this.url + "/post/" + postId + "/comment";

		let sendData;
		if (parent == 0) {
			sendData = {
				content: content,
			};
		} else {
			sendData = {
				content: content,
				parentComment: parent,
			};
		}

		return $.ajax({
			beforeSend: function (request) {
				request.setRequestHeader("Authorization", bearerToken);
			},
			data: JSON.stringify(sendData),
			type: "POST",
			contentType: "application/json",
			dataType: "JSON",

			url: path,
		});
	}

	deletePostComment(postId: number, commentId: number) {
		let accessToken = localStorage.getItem("access-token");
		let bearerToken = "Bearer " + accessToken;
		let path = this.url + "/post/" + postId + "/comment/" + commentId;
		return $.ajax({
			beforeSend: function (request) {
				request.setRequestHeader("Authorization", bearerToken);
			},
			type: "DELETE",
			url: path,
		});
	}

	getRecentPost(page: number) {
		let path = this.url + "/post?sort=id,desc&" + "page=" + page;
		try {
			return $.getJSON(path);
		} catch {
			return null;
		}
	}

	getSearchPost(text: string, page: number) {
		let path = this.url + `/search?keyword=${text}&sort=id,desc&page=${page}`;
		try {
			return $.getJSON(path);
		} catch {
			return null;
		}
	}

	getSearchTag(name: string, page: number) {
		let path = this.url + `/search/tag?tag=${name}&sort=id,desc&page=${page}`;
		try {
			return $.getJSON(path);
		} catch {
			return null;
		}
	}

	getSearchPostByUserId(userId: number, page: number) {
		let path = this.url + `/search/user?userId=${userId}&sort=id,desc&page=${page}`;
		try {
			return $.getJSON(path);
		} catch {
			return null;
		}
	}

	_getNotices(userId: string) {
		let accessToken = localStorage.getItem("access-token");
		let bearerToken = "Bearer " + accessToken;
		let path = this.url + "/user/" + userId + "/notice";
		return $.ajax({
			beforeSend: function (request) {
				request.setRequestHeader("Authorization", bearerToken);
			},
			dataType: "json",
			url: path,
		});
	}

	async getNotices(userId: string) {
		try {
			return this._getNotices(userId);
		} catch {
			await this.setAccessToken();
			let accessToken = localStorage.getItem("access-token");
			if (accessToken != null) {
				return this._getNotices(userId);
			} else {
				return null;
			}
		}
	}

	deleteAllNotice(userId: string) {
		let accessToken = localStorage.getItem("access-token");
		let bearerToken = "Bearer " + accessToken;
		let path = this.url + "/user/" + userId + "/notice";
		return $.ajax({
			beforeSend: function (request) {
				request.setRequestHeader("Authorization", bearerToken);
			},
			type: "DELETE",
			url: path,
		});
	}

	getPost(postId: number) {
		let path = this.url + "/post/" + postId;
		try {
			return $.getJSON(path);
		} catch {
			return null;
		}
	}

	getPostByUser(postId: number) {
		let accessToken = localStorage.getItem("access-token");
		let bearerToken = "Bearer " + accessToken;
		let path = this.url + "/post/" + postId;
		return $.ajax({
			beforeSend: function (request) {
				request.setRequestHeader("Authorization", bearerToken);
			},
			type: "GET",
			url: path,
		});
	}

	deletePost(postId: number) {
		let accessToken = localStorage.getItem("access-token");
		let bearerToken = "Bearer " + accessToken;
		let path = this.url + "/post/" + postId;
		return $.ajax({
			beforeSend: function (request) {
				request.setRequestHeader("Authorization", bearerToken);
			},
			type: "DELETE",
			url: path,
		});
	}

	postPost(post: Post) {
		let accessToken = localStorage.getItem("access-token");
		let bearerToken = "Bearer " + accessToken;
		let path = this.url + "/post";
		return $.ajax({
			beforeSend: function (request) {
				request.setRequestHeader("Authorization", bearerToken);
			},
			data: JSON.stringify(post),
			type: "POST",
			contentType: "application/json",
			url: path,
		});
	}

	putPost(post: Post, postId: number) {
		let accessToken = localStorage.getItem("access-token");
		let bearerToken = "Bearer " + accessToken;
		let path = this.url + "/post/" + postId;
		return $.ajax({
			beforeSend: function (request) {
				request.setRequestHeader("Authorization", bearerToken);
			},
			data: JSON.stringify(post),
			type: "PUT",
			contentType: "application/json",
			dataType: "JSON",
			url: path,
		});
	}

	postLike(postId: number) {
		let accessToken = localStorage.getItem("access-token");
		let bearerToken = "Bearer " + accessToken;
		let path = this.url + "/post/" + postId + "/like";
		return $.ajax({
			beforeSend: function (request) {
				request.setRequestHeader("Authorization", bearerToken);
			},
			type: "POST",
			url: path,
		});
	}

	deleteLike(postId: number) {
		let accessToken = localStorage.getItem("access-token");
		let bearerToken = "Bearer " + accessToken;
		let path = this.url + "/post/" + postId + "/like";
		return $.ajax({
			beforeSend: function (request) {
				request.setRequestHeader("Authorization", bearerToken);
			},
			type: "DELETE",
			url: path,
		});
	}
}
