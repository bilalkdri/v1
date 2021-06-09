import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import emailjs from 'emailjs-com';
import{ init } from 'emailjs-com';
import { AuthService } from '../services/auth.service';
init("user_eWcOjOJuHE4H4hCtlU3xr");
import {HttpClient,HttpHeaders, HttpRequest} from "@angular/common/http";
@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})
export class AppareilViewComponent implements OnInit {
  @Input() lignes: any[] = [];
  constructor(private http: HttpClient,private router : Router, private Authservice: AuthService) { 
  }
  ngOnInit(): void{
    this.quelheure();
  }
  quelheure() {//formater la date au format 24/02/2001
    var endroit = (<HTMLSpanElement>document.getElementById("heure"));
    var date = new Date();
    var Str = ("00" + date.getDate()).slice(-2)
        
        + "/" +("00" + (date.getMonth() + 1)).slice(-2)
        + "/" + date.getFullYear() 
          
    endroit.innerHTML = Str;
}

counter : number = 0; //initialise le compteur à 0
ligneenplus(){
  this.counter++;//incrémente le compteur de 1
this.lignes.push({ligne:this.counter,},);//on ajoute une ligne à l'array 'lignes' avec comme valeur le compteur
console.log(this.lignes);

}
ligneenmoins(){
  this.counter--;//décrémente le compteur de 1
  this.lignes.splice(this.counter);//on supprime une ligne à l'array 'lignes'
  
  console.log(this.lignes);
 
}




sendMail() {

    emailjs.send('service_akhe63e', 'template_wza9ig7')//choix du service,choix du mail à envoyer
      .then((response) => {
       console.log('SUCCESS!', response.status, response.text);
    }, (err) => {
       console.log('FAILED...', err);
    });
  }



infoxml :string ="";

creaxml(){
  this.infoxml="";
  var builder = require('xmlbuilder');//bibliothèque pour coder en xml
 
var root = builder.create('import');//création du bloc racine
root.att('DatabaseName','ieseg');
for (let tt = 0; tt <= this.counter; tt++) {//boucle pour créer autant d'individus en xml que la valeur du compteur
 
  var prenom = (<HTMLInputElement>document.getElementById("prenom"+tt)).value;//récupération des données saisies
 
  var nom = (<HTMLInputElement>document.getElementById("nom"+tt)).value;
  
  var datee = (<HTMLInputElement>document.getElementById("date"+tt)).value;
 
   var date = new Date(datee);//formater la date dd/mm/yyyy
var date1 = ( ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) 
+ '/' +
((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) 
+'/' + date.getFullYear()).toString();

var date2 = ( ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) 
+ '' +
((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) 
+'' + date.getFullYear()).toString();

  var villenaissance = (<HTMLInputElement>document.getElementById("villenaissance"+tt)).value;

  var adresses = (<HTMLInputElement>document.getElementById("adresses"+tt)).value;

var adresses2 = (<HTMLInputElement>document.getElementById("adressess"+tt)).value;

  var villeresidence = (<HTMLInputElement>document.getElementById("villeresidence"+tt)).value;

  var code = (<HTMLInputElement>document.getElementById("code"+tt)).value;

  var email = (<HTMLInputElement>document.getElementById("email"+tt)).value;

  var select = (<HTMLInputElement>document.getElementById("titre"+tt)).value;

   var select5 = (<HTMLInputElement>document.getElementById("sex"+tt)).value;

  var select1 = (<HTMLInputElement>document.getElementById("paysn"+tt)).value;

  var select2 = (<HTMLInputElement>document.getElementById("nationalite"+tt)).value;

  var select3 = (<HTMLInputElement>document.getElementById("paysr"+tt)).value;

  var select4 = (<HTMLInputElement>document.getElementById("situation"+tt)).value;

   var tel = (<HTMLInputElement>document.getElementById("tel"+tt)).value;
   prenom= prenom.toUpperCase();
   nom= nom.toUpperCase();
villenaissance=villenaissance.toUpperCase().replace(/ /g,"_");//modification des informations
villeresidence=villeresidence.toUpperCase().replace(/ /g,"_");
select=select.replace(/\D/g,'');
select1=select1.replace(/\D/g,'');
select2=select2.replace(/\D/g,'');
select3=select3.replace(/\D/g,'');
select4=select4.replace(/\D/g,'');
this.xmlb(select,prenom,nom,date1,date2,select5,villenaissance,select1,select2,select3,adresses,adresses2,villeresidence,code,email,tel,select4,root);//création du code xml avec les données saisies
}
this.infoxml =root.end({ pretty: true});//fin de création du code xml
//le code xml est enregistré dans une variable externe pour le réutiliser
}


xmlb(s: string,a : string, b: string,date1:string, c:string,s5:string,d:string,s1:string,s2:string,s3:string,  e:string,adr:string, f:string, g:string, h:string,tel:string,s4:string,root: any){
//créer le code xml avec des noeuds
     var individu = root.ele('individu');
  individu.att('A219541', d);
  individu.att('A595', date1);
  individu.att('A596', s5);
  individu.att('A601', 'true');
  individu.att('code', b);
  individu.att('key', b+'_'+a+'_'+c);
  individu.att('libelle', a);

var titre = individu.ele('titre');
     titre.att('ForceImport', 'true');
     titre.att('objet_id', s);

var adresse = individu.ele('adresse');
    adresse.att('A500', e);
     adresse.att('A501', adr);
     adresse.att('key', "ADR_"+b+"_"+c);
            var  type_coordonnee = adresse.ele('type_coordonnee');
             type_coordonnee.att('OnRelation', 'true');
              type_coordonnee.att('code', 'ADR_PERSO');
               type_coordonnee.att('objet_id', '44755');
                                   var  pays1 = type_coordonnee.ele('pays');
                                         pays1.att('ForceImport', 'true');
                                         pays1.att('objet_id', s3);

                                    var  ville = type_coordonnee.ele('ville');
                                         ville.att('code', g);
                                          ville.att('key', g+'_'+f);
                                          ville.att('libelle', f);

var coordonnee = individu.ele('coordonnee');
    coordonnee.att('key', "MAIL_"+b+"_"+c);
     coordonnee.att('libelle', h);
            var  type_coordonnee1 = coordonnee.ele('type_coordonnee');
             type_coordonnee1.att('OnRelation', 'true');
              type_coordonnee1.att('code', 'EMAIL_PERSO');
               type_coordonnee1.att('objet_id', '44754');
                                 
var coordonnee2 = individu.ele('coordonnee');
    coordonnee2.att('key', "TEL_"+b+"_"+c);
     coordonnee2.att('libelle', tel);
            var  type_coordonnee2 = coordonnee2.ele('type_coordonnee');
             type_coordonnee2.att('OnRelation', 'true');
              type_coordonnee2.att('code', 'TEL1');
               type_coordonnee2.att('objet_id', 55147);


var nationalite = individu.ele('nationalite');
    nationalite.att('ForceImport', 'true');
     nationalite.att('objet_id', s2);

var pays = individu.ele('pays');
    pays.att('ForceDest', 'pays§198687');
    pays.att('ForceImport', 'true');
     pays.att('objet_id', s1);

var pos_maritale = individu.ele('pos_maritale');
    pos_maritale.att('ForceImport', 'true');
     pos_maritale.att('objet_id', s4);

var groupe = root.ele('groupe');
  groupe.att('ForceImport',"true");
  groupe.att('objet_id', 'XXgroupe_objet_id');
             var  individuuu = groupe.ele('individu');
             individuuu.att('A601', 'true');
             individuuu.att("ForceDest","apprenant");
             individuuu.att('ForceImport', 'true');
             individuuu.att('Inverted', 'true');
             individuuu.att('code', b);
             individuuu.att('key', b+'_'+a+'_'+c);

var inscrip = root.ele('inscription_programme');
            inscrip.att('A198940',"true");
            inscrip.att('A198942', 'true');
            inscrip.att('A199543', '');
            inscrip.att('A2224', 'XXdate_debut');
            inscrip.att('A2270', 'XXdate_fin');
            inscrip.att('A352148', '');
            inscrip.att('key','INSC_GRP_ADMIN_2021_'+b+'_'+a+'_'+c);
            var  individ = inscrip.ele('individu');
            individ.att('A601', 'true');
            individ.att("ForceDest","apprenant");
            individ.att('ForceImport', 'true');
            individ.att('Inverted', 'true');
            individ.att('code', b);
            individ.att('key', b+'_'+a+'_'+c);
            var groupa = inscrip.ele('groupe');
            groupa.att('ForceImport',"true");
            groupa.att('objet_id', 'XXgroupe_objet_id');

}



 infotextarea(){
 (<HTMLInputElement>document.getElementById("aa")).value = ("");//remise à 0 du contenu de la textarea
 for (let tt = 0; tt <= this.counter; tt++) {//boucle récupérant les données saisies de chaques lignes en utilisant le compteur
 
  var a= (<HTMLInputElement>document.getElementById("prenom"+tt)).value;
 
  var b = (<HTMLInputElement>document.getElementById("nom"+tt)).value;
  
  var datee = (<HTMLInputElement>document.getElementById("date"+tt)).value;
  var date = new Date(datee);//formater la date dd/mm/yyyy
  var c = ( ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) 
  + '/' +
  ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) 
  +'/' + date.getFullYear()).toString();
  
  var date2 = ( ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) 
  + '' +
  ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) 
  +'' + date.getFullYear()).toString();
  var d = (<HTMLInputElement>document.getElementById("villenaissance"+tt)).value;

  var e = (<HTMLInputElement>document.getElementById("adresses"+tt)).value;
  var e2 = (<HTMLInputElement>document.getElementById("adressess"+tt)).value;
  var f = (<HTMLInputElement>document.getElementById("villeresidence"+tt)).value;

  var g = (<HTMLInputElement>document.getElementById("code"+tt)).value;

  var h = (<HTMLInputElement>document.getElementById("email"+tt)).value;

  var s = (<HTMLInputElement>document.getElementById("titrev"+tt)).value;

   var s5 = (<HTMLInputElement>document.getElementById("sex"+tt)).value;

  var s1 = (<HTMLInputElement>document.getElementById("paysnv"+tt)).value;

  var s2 = (<HTMLInputElement>document.getElementById("nationalitev"+tt)).value;

  var s3 = (<HTMLInputElement>document.getElementById("paysrv"+tt)).value;
  var s4 = (<HTMLInputElement>document.getElementById("situationv"+tt)).value;
   var tel = (<HTMLInputElement>document.getElementById("tel"+tt)).value;

var avant =(<HTMLInputElement>document.getElementById("aa")).value;
 var i = (avant+" "+s+" "+a+" "+b+" "+s5+" "+c+" "+d+" "+s1+" "+s2+" "+s3+" "+e+" "+e2+" "+f+" "+g+" "+h+" "+tel+" "+s4+" "+"\n");
(<HTMLInputElement>document.getElementById("aa")).value = i;//on insère dans le textarea la variable regroupant toutes les informations saisies
console.log(i);
 }
}



downloadtxt(filename: string, text:string) {
  var pom = document.createElement('a');
  pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  pom.setAttribute('download', filename);

  if (document.createEvent) {
      var event = document.createEvent('MouseEvents');
      event.initEvent('click', true, true);
      pom.dispatchEvent(event);
    
      
    }
  else {
      pom.click();
  }
console.log(pom);
}

/*onFileSelected(event: { target: { files: File[]; }; }) {
  
  const file:File = event.target.files[0];
  
  var filename = '';
  if (file) {

      filename = file.name;

      const formData = new FormData();

      formData.append("thumbnail", file);

      const upload$ = this.http.post("/api/thumbnail-upload", formData);

      upload$.subscribe();
  }
}*/
dowww(xml:string){
  let file = new Blob([xml],{type: 'application/xml'});//créer un fichier
  const formdata: FormData = new FormData();//prépare son envoi
  var date = new Date();
  var Str =
  ("00" + (date.getMonth() + 1)).slice(-2)
  + "_" + ("00" + date.getDate()).slice(-2)
  + "_" + date.getFullYear() + "-"
  + ("00" + date.getHours()).slice(-2) + "-"
  + ("00" + date.getMinutes()).slice(-2)
  + "-" + ("00" + date.getSeconds()).slice(-2);

  formdata.append('file', file,Str+'.xml');
 
  const upload$ = this.http.post('http://localhost:8080/api/file/upload', formdata);
  upload$.subscribe();

}
download(xml:string,name:string) {
  
  let file = new Blob([xml], {type: '.xml'});
  console.log()
  let formData = new FormData();
  formData.append('file', file, name);
  this.http
  .post<Blob>(
      "http://extranet.ieseg.fr/CreationApprenant/historique",
      formData
  ).subscribe(
    result => { 
      console.log(result);  //<- XML response is in here *as plain text*
    }, 
    error => console.log('There was an error: ', error));
}
download3(xml:string,name:string) {
  fetch('historique/' + name, {method:'POST',body:xml});
  
} 



download4
  (xml:string) {
    var date = new Date();//formater la date dd/mm/yyyy
    var Str =
        ("00" + (date.getMonth() + 1)).slice(-2)
        + "_" + ("00" + date.getDate()).slice(-2)
        + "_" + date.getFullYear() + "-"
        + ("00" + date.getHours()).slice(-2) + "-"
        + ("00" + date.getMinutes()).slice(-2)
        + "-" + ("00" + date.getSeconds()).slice(-2);
    var fileName = Str;

          const formData = new FormData();

          formData.append(fileName, xml);

          const upload$ = this.http.post("/CreationApprenant/", formData);

          upload$.subscribe();
      }
  
    
 
onSave() {
  if((<HTMLInputElement>document.getElementById("aa")).value != ""){// si aucune saisie n'est faite un message d'erreur est envoyé
this.creaxml();//on créé le code xml
this.infotextarea();//on récupère les informations saisies
var aaa= (<HTMLInputElement>document.getElementById("aa")).value;
var aaaa= this.infoxml;
console.log(aaaa);

var date = new Date();//formater la date dd/mm/yyyy
    var Str =
        ("00" + (date.getMonth() + 1)).slice(-2)
        + "_" + ("00" + date.getDate()).slice(-2)
        + "_" + date.getFullYear() + "-"
        + ("00" + date.getHours()).slice(-2) + "-"
        + ("00" + date.getMinutes()).slice(-2)
        + "-" + ("00" + date.getSeconds()).slice(-2);
     

 this.dowww(aaaa);

this.downloadtxt("apprenants du "+Str+".txt",aaa);


//this.sendMail();
alert("saisie validée. Un fichier « apprenants du "+Str+".txt » avec les éléments saisis a été généré dans votre dossier Téléchargement.")
  }
  else{
    alert("veuillez entrer des informations et cliquer sur 'aperçu de la sélection' avant de valider")


  }
}
}
