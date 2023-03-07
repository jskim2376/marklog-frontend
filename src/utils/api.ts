interface AccessTokenObject{
  access_token:string;
}

export interface PostGetAll {
  content:          any[];
  pageable:         Pageable;
  last:             boolean;
  totalElements:    number;
  totalPages:       number;
  size:             number;
  number:           number;
  sort:             Sort;
  first:            boolean;
  numberOfElements: number;
  empty:            boolean;
}

export interface Pageable {
  sort:       Sort;
  offset:     number;
  pageNumber: number;
  pageSize:   number;
  unpaged:    boolean;
  paged:      boolean;
}

export interface Sort {
  empty:    boolean;
  sorted:   boolean;
  unsorted: boolean;
}
export class Api{
  url:string;
  constructor(){
    this.url="http://localhost/api/v1";
  }

  async setAccessToken(){
    try{
      let path = this.url+"/token/refresh";
      const result = await $.getJSON(path);
      localStorage.setItem("access-token",result.access_token);
    }catch{
      localStorage.removeItem("access-token");
    }
 }

  getRecentPost(){
    let path = this.url+"/post/recent?sort=id,desc";
    try{
      return $.getJSON(path);
    }catch{
      return null;
    }
  }

  getUser(userId:string){
    let path = this.url+"/user/"+userId;
    try{
      return $.getJSON(path);
    }catch{
      return null;
    }
  }

  _getNotices(userId:string){
    let accessToken = localStorage.getItem("access-token");
    let bearerToken = "Bearer "+accessToken;
    let path = this.url+"/notice/" + userId +"/uncheck";
    return $.ajax({
      beforeSend: function(request) {
        request.setRequestHeader("Authorization", bearerToken);
      },
      dataType: "json",
      url: path,
    });
  }
  
  async getNotices(userId:string){
    try{
      return this._getNotices(userId);
    }catch{
      await this.setAccessToken();
      let accessToken = localStorage.getItem("access-token");
      if(accessToken != null){
        return this._getNotices(userId);
      }else{
        return null;
      }
    }
  }

  deleteNotice(noticeId:number){
      let accessToken = localStorage.getItem("access-token");
      let bearerToken = "Bearer "+accessToken;
      let path = this.url+"/notice/" + noticeId;
      return $.ajax({
        beforeSend: function(request) {
          request.setRequestHeader("Authorization", bearerToken);
        },
        type:'DELETE',
        url: path,
      });
  }
  
}