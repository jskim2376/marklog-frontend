import { html, render } from "lit-html";

import { marked } from "marked";

import Tagify, { ChangeEventData } from "@yaireo/tagify";
import "@yaireo/tagify/dist/tagify.css";
import EasyMDE from "easymde";
import "easymde/dist/easymde.min.css";
import { Api } from "@/api/api";
import { Post } from "@/interface/post";
import { User } from "@/interface/user";

class SettingElement extends HTMLElement {
	api;
	userId;
	constructor() {
		super();
		this.api = new Api();
		this.userId = this.getUserId();
	}

	parseJwt(token: string) {
		var base64Url = token.split(".")[1];
		var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
		var jsonPayload = decodeURIComponent(
			window
				.atob(base64)
				.split("")
				.map(function (c) {
					return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
				})
				.join("")
		);

		return JSON.parse(jsonPayload);
	}

	getUserId() {
		const access_token = localStorage.getItem("access-token");
		if (access_token == null) {
			alert("로그인 먼저 하세요");
			window.history.back();
		} else {
			const payload = this.parseJwt(access_token);
			return payload["jti"];
		}
	}

	uploadImage(user: User) {
		var input = document.createElement("input");
		input.type = "file";
		input.accept = "image/*";
		input.id = "uploadInput";
		input.addEventListener("change", (event: Event) => {
			const target = event.target as HTMLInputElement;
			const files = target.files;

			let xhr = new XMLHttpRequest();
			var formData = new FormData();
			xhr.open("POST", "https://api.imgbb.com/1/upload");
			formData.append("key", "ba349a478f0a62e1d11c353fe0ce35c1");
			formData.append("image", files![0]);
			xhr.onreadystatechange = () => {
				if (xhr.readyState === xhr.DONE) {
					if (xhr.status === 200) {
						let res = JSON.parse(xhr.response);
						let pictureUrl: string = res.data.image.url;
						user.picture = pictureUrl;
						this.api.putUser(this.userId, user);
						window.location.reload();
					}
				}
			};
			xhr.send(formData);
		});
		input.click();
	}

	changeProfile(user: User) {
		let name = document.getElementById("name") as HTMLInputElement;
		let introduce = document.getElementById("introduce") as HTMLInputElement;
		user.name = name.value;
		user.introduce = introduce.value;

		this.api.putUser(this.userId, user);
		window.location.reload();
	}

	changeTitle(user: User) {
		let title = document.getElementById("title") as HTMLInputElement;
		user.title = title.value;

		this.api.putUser(this.userId, user);
		window.location.reload();
	}

	setBtnClick(user: User) {
		let uploadImageBtn = document.getElementById("uploadImageBtn")!;
		uploadImageBtn.onclick = () => {
			this.uploadImage(user);
		};
		let userBtn = document.getElementById("userBtn")!;
		userBtn.onclick = () => {
			this.changeProfile(user);
		};
		let titleBtn = document.getElementById("titleBtn")!;
		titleBtn.onclick = () => {
			this.changeTitle(user);
		};
		let signOut = document.getElementById("signOut")!;
		signOut.onclick = () => {
			this.api.deleteUser(this.userId);
			window.location.href = "/api/v1/user/logout";
		};
	}

	async connectedCallback() {
		let user: User = await this.api.getUser(this.userId);

		const template = html`
			<div class="container" style="max-width:768px">
				<div class="row mb-5 mx-1">
					<div class="col-3 text-center">
						<img id="picture" class="bigprofile mb-2 rounded-circle" src="${user.picture}" width="100" height="100" />
						<button id="uploadImageBtn" class="btn btn-primary setting-img-btn">업로드</button>
					</div>
					<div class="col-8">
						<input id="name" type="text" class="w-100 m fw-bold form-control my-1" value="${user.name}" style="font-size:1.6em;" />
						<input id="introduce" type="text" class="w-100 m fw-bold form-control my-1" value="${user.introduce}" />
						<button id="userBtn" class="btn btn-success d-flex justify-content-end">저장</button>
					</div>
				</div>

				<div class="row mb-5 mx-1">
					<b class="col-3 fs-5">${user.title}</b>
					<div class="col-7">
						<input id="title" class="form-control" type="text" value="${user.title}" />
					</div>
					<div class="col-2">
						<button id="titleBtn" class="btn btn-success">수정</button>
					</div>
					<small class="text-black-50 mt-2">개인 페이지 좌측 상단에 나타나는 제목입니다.</small>
				</div>

				<div class="row mx-1">
					<b class="fs-5 col-3">회원탈퇴</b>
					<div class="col-9">
						<button id="signOut" class="btn btn-danger">회원탈퇴</button>
					</div>
					<small class="text-black-50 mt-2">탈퇴 시 작성하신 포스트 및 댓글이 모두 삭제되며 복구되지 않습니다.</small>
				</div>
			</div>
		`;
		render(template, this);

		this.setBtnClick(user);
	}
}

customElements.define("ml-setting", SettingElement);

export function createSetting() {
	return document.createElement("ml-setting");
}
