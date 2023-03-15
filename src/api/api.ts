import $ from "jquery";

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

	getSearchPost(text: string, page: number) {
		let path = this.url + `/post/search?text=${text}&sort=id,desc&page=${page}`;
		try {
			return $.getJSON(path);
		} catch {
			return null;
		}
	}

	getPostByTagName(tagName: string, page: number) {
		let path = this.url + `/post/tag?tag-name=${tagName}&sort=id,desc&page=${page}`;
		try {
			return $.getJSON(path);
		} catch {
			return null;
		}
	}

	_getNotices(userId: string) {
		let accessToken = localStorage.getItem("access-token");
		let bearerToken = "Bearer " + accessToken;
		let path = this.url + "/notice/" + userId + "/uncheck";
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

	deleteNotice(noticeId: number) {
		let accessToken = localStorage.getItem("access-token");
		let bearerToken = "Bearer " + accessToken;
		let path = this.url + "/notice/" + noticeId;
		return $.ajax({
			beforeSend: function (request) {
				request.setRequestHeader("Authorization", bearerToken);
			},
			type: "DELETE",
			url: path,
		});
	}

	getRecentPost(page: number) {
		let path = this.url + "/post/recent?sort=id,desc&" + "page=" + page;
		try {
			return $.getJSON(path);
		} catch {
			return null;
		}
	}

	getPost(postId: number) {
		let path = this.url + "/post/" + postId;
		try {
			return $.getJSON(path);
		} catch {
			return null;
		}
	}

	getTagCount(userId: number) {
		let path = this.url + "/tag/" + userId;
		try {
			return $.getJSON(path);
		} catch {
			return null;
		}
	}
}
