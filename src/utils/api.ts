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

  _ajaxAccessToken(){
  }

  async getAccessToken(){
    try{
      let path = this.url+"/token/refresh"
      const result = await $.getJSON(path)
      return result.access_token;
    }catch{
      return null;
    }
 }

  async getRecentPost(){
    let path = this.url+"/post/recent?sort=id,desc"
    try{
      return await $.getJSON(path);
    }catch{
      return null;
    }
  }

  async getUser(userId:number){
    let path = this.url+"/user/"+userId;
    try{
    return await $.getJSON(path);
    }catch{
      return null;
    }
  }
}