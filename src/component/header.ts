import "@/component/header-login";
import { setNotice } from "@/component/header-login";
import "@/component/header-logout";
import { Api } from "@/utils/api";

export async function createHeader(){
    let api = new Api;
    let accessToken = localStorage.getItem("access-token");
    if(accessToken == null){
        let header = document.createElement("ml-header-logout");
        return header;
    }
    else{
        let header = document.createElement("ml-header-login");
        return header;
    }
}
