import { Component, OnInit, Output, Input, OnChanges } from '@angular/core';
import { AppareilViewComponent } from '../appareil-view/appareil-view.component';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
/*import * as nationalite from 'JSON_nationalite.json';
import * as pays from 'JSON_pays.json';
import * as titre from 'JSON_titre.json';
import * as situation from 'JSON_situation_maritale.json';
*/
@Component({
  selector: 'formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.scss']
})
export class FormulaireComponent implements OnInit { 
 @Input() prenom = 'aa';
  @Input() Nom = 'bb';
  private _jsonURL = 'JSON_nationalite.json';
   private _jsonURL1 = 'JSON_pays.json';
   private _jsonURL2= 'JSON_situation_maritale.json';
   private _jsonURL3 = 'JSON_titre.json';
  @Input() counter: any;
 csvRecords: any[] = [];
 titre: any[] = [];
 nationalite: any[] = [];
 pays: any[] = [];
 situation: any[] = [];
  header: boolean = true;
  @Input() lignes: any[] = [];

  constructor(private http: HttpClient,private AppareilViewComponent : AppareilViewComponent) { 
  }
  ngOnInit(): void{
    this.getJSON(this._jsonURL).subscribe((data: any)  => {
      console.log(data);
      this.nationalite=data;
     });
     this.getJSON(this._jsonURL1).subscribe((data: any)  => {
      console.log(data);
      this.pays=data;
     });
     this.getJSON(this._jsonURL2).subscribe((data: any)  => {
      console.log(data);
      this.situation=data;
     });
     this.getJSON(this._jsonURL3).subscribe((data: any)  => {
      console.log(data);
      this.titre=data;
     });

 this.peuple(this.nationalite,this.pays,this.situation,this.titre,)
  //this.peuple(nationalite,pays,situation,titre)
}

public getJSON(a:string): Observable<any> {
  console.log(this.http.get(a));
  return this.http.get(a);
 
}
peuple(info :{"id.Nationalit\u00E9": string; "Libell\u00E9.Nationalit\u00E9": string; }[],info1:{ "id.Pays": string; "Libell\u00E9.Pays": string; }[],info2:{ "id.Situation maritale": string; "Libell\u00E9.Situation maritale": string; }[],info3 :{ "id.Titre": string; "Code.Titre": string; }[]){ 
  for (let element in info) {  
    this.nationalite.push(  
      info[element]  
      );  
      console.log(this.nationalite);
  }
  for (let element1 in info1) {  
    this.pays.push(  
      info1[element1]  
      );  
  } 
  for (let element2 in info2) {  
    this.situation.push(  
      info2[element2]  
      );  
  } 
  for (let element3 in info3) {  
    this.titre.push(  
      info3[element3]  
      );  
  }
}
}
