import "@/component/header-login";
import "@/component/header-logout";
import { Api } from "@/utils/api";
import jwtDecode, { JwtPayload } from "jwt-decode";

export async function createHeader(body:HTMLElement, accessToken:string){
    let api = new Api;
    let header : HTMLElement;
    if(accessToken == null){
        header = document.createElement("ml-header-logout");
        body.appendChild(header);
    }
    else{
        header = document.createElement("ml-header-login");
        body.appendChild(header);
        let userId:any = jwtDecode<JwtPayload>(accessToken).jti;
        let user = await api.getUser(userId)
        header.setAttribute("user-id", userId.toString());
        header.setAttribute("user-name", user.name);
        header.setAttribute("user-picture", user.picture);
    }
    return header;
}
