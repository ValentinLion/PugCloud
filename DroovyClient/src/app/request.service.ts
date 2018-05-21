import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';


@Injectable()
export class RequestService {

  private apiUrl = "http://localhost:8080/droovy/request/";

  constructor(private http: HttpClient) { }

  getFiles(path: string, fileId: string, userId: string, getGoogleDrive: number, getOneDrive: number, getDropbox: number, folderOnly : boolean): Observable<Page> {
    var url = this.apiUrl + "list?idUser=" + userId + "&path=" + path + "&idFolder=" + fileId + "&getGoogleDrive=" + getGoogleDrive + "&getOnedrive=" + getOneDrive + "&getDropbox=" + getDropbox + "&folderOnly="+folderOnly;

    return this.http.get<Page>(url, {responseType: 'json'});
  }

  download(fileName : string, fileId : string, userId : string, drive : string){
    var url = this.apiUrl + "download?idUser=" + userId +  "&idFile=" + fileId + "&drive=" + drive + "&fileName=" + fileName;
    window.location.href = url;


  }

  /*
  name : nouveau nom
  path : chemin actuel
   */

  rename(idUser : string, path : string, idFile : string , drive : string, name : string ){
    var url = this.apiUrl + "rename?idUser=" + idUser + "&path=" + path + "&idFile=" + idFile + "&drive="+drive + "&name="+name;

    return this.http.get<FileDroovy>(url, {responseType: 'json'});
  }
  delete(idUser : string, path : string, idFile : string, drive : string ){
    var url = this.apiUrl + "delete?idUser=" + idUser + "&path=" + path + "&idFile=" + idFile + "&drive="+drive;
    return this.http.get(url, {responseType: 'json'});
  }

  move(idUser : string, path : string, idFile : string, drive : string, idParent : string, pathParent :string, name : string){
    var url = this.apiUrl + "move?idUser=" + idUser + "&path=" + path + "&idFile=" + idFile + "&drive="+drive+"&idParent="+idParent+"&pathParent="+pathParent+"&name="+name;
    return this.http.get(url, {responseType: 'json'});
  }

  upload(formData : FormData){
    var url = this.apiUrl+"upload";
    return this.http.post(url,formData);
  }

  freespace(idUser: string, drive: string) {
    var url = this.apiUrl + "freespace?idUser=" + idUser + "&drive=" + drive;
    return this.http.get(url, {responseType: 'json'});
  }


  search(idUser : string,query : string, getDropbox : number, getOnedrive : number,getGoogledrive : number){
    var url = this.apiUrl + "search?idUser=" + idUser + "&query=" + query+"&getDropbox="+getDropbox+"&getOnedrive="+getOnedrive+"&getGoogleDrive="+getGoogledrive;
    return this.http.get<FileDroovy[]>(url, {responseType: 'json'})
  }

  createFolder(idUser :string,drive : string, folderName :string, idParent :string, path :string){
    var url = this.apiUrl + "createFolder?idUser=" + idUser + "&drive=" + drive+"&folderName="+folderName+"&path="+path+"&idParent="+idParent;
    return this.http.get(url, {responseType: 'json'});
  }
  nextPage(idUser : string,folderId : string,nextPageTokenDropbox : string ,nextPageTokenOnedrive : string, nextPageTokenGoogleDrive : string,folderOnly : boolean){
    var url = this.apiUrl + "nextPage?idUser=" + idUser + "&folderId=" + folderId + "&nextPageTokenOnedrive=" + nextPageTokenOnedrive + "&nextPageTokenDropbox=" + nextPageTokenDropbox + "&nextPageTokenGoogleDrive=" + nextPageTokenGoogleDrive + "&folderOnly="+folderOnly;

    return this.http.get<Page>(url, {responseType: 'json'})
  }


}

export interface Page{
  files : FileDroovy[],
  dropboxToken : token,
  onedriveToken : token,
  googledriveToken : token
}
export interface token{
  hasMore :string,
  token : string
}

export interface FileDroovy {

  name: string
  taille: string
  type: string
  sourceProperties: PropertiesFileDroovy[]

}

export interface PropertiesFileDroovy {
  id: string,
  url: string,
  creationDate: string,
  lastUpdateDate: string,
  contentHash: string
}