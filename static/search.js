export class Search{
    constructor(){
        this.kontejner=null;
       
    }  

    drawSearch(host){
        this.kontejner=document.createElement("div");
        this.kontejner.className="pretraga";
        host.appendChild(this.kontejner);

        let labela=document.createElement("label");
        labela.innerHTML="Pretrazuj: ";
        this.kontejner.appendChild(labela);

        let izbor=document.createElement("select");

        let i0=document.createElement("option");
        i0.innerHTML="izaberi opciju";
        i0.disabled=true;
        i0.selected=true;
        i0.hidden=true;

        let i1=document.createElement("option");
        i1.value="grad";
        i1.innerHTML="Grad";

        let i2=document.createElement("option");
        i2.value="ulica";
        i2.innerHTML="Ulica";
        
        izbor.appendChild(i0);
        izbor.appendChild(i1);
        izbor.appendChild(i2);
        izbor.onchange=(ev)=>{
            if(i1.selected){

                let rem1=document.getElementsByClassName("grad")[0];
                let rem2=document.getElementsByClassName("ulica")[0];
                let d=document.getElementsByClassName("dugmad")[0];
                let l2=document.getElementsByClassName("labela2")[0];
                let l3=document.getElementsByClassName("labela3")[0];
                
                if(rem1!=null){
                    rem1.remove();
                    rem2.remove();
                    d.remove();
                    l2.remove();
                    l3.remove();
                }

                let l1=document.createElement("label");
                l1.innerHTML="Unesite naziv grada:";
                l1.className="labela1";
                this.kontejner.appendChild(l1);

                let tb1= document.createElement("input");
                tb1.className="grad1";
                this.kontejner.appendChild(tb1);

                const dugme = document.createElement("button");
                dugme.innerHTML="Upit za grad";
                dugme.className="dugmad";
                this.kontejner.appendChild(dugme);
                dugme.onclick=(ev)=>{
                    fetch("http://localhost:5000/GradUpit", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*"
                    },
                    body: JSON.stringify({
                        City:tb1.value
                    })
                    })
                    .then(response => response.json())
                    .then(data => {
                        this.drawTable1(this.kontejner, data)
                    }).catch(p => {
                        alert("Greška prilikom upisa.");
                    });
                }
            }
            else if(i2.selected){

                let l=document.getElementsByClassName("labela1")[0];
                let rem=document.getElementsByClassName("grad1")[0];
                let d=document.getElementsByClassName("dugmad")[0];
                if(rem!=null){
                    rem.remove();
                    d.remove();
                    l.remove();
                }

                let l1=document.createElement("label");
                l1.innerHTML="Unesite naziv grada:";
                l1.className="labela2";
                this.kontejner.appendChild(l1);

                let tb1= document.createElement("input");
                tb1.className="grad";
                this.kontejner.appendChild(tb1);

                let l2=document.createElement("label");
                l2.innerHTML="Unesite naziv ulice:";
                l2.className="labela3";
                this.kontejner.appendChild(l2);

                let tb2= document.createElement("input");
                tb2.className="ulica";
                this.kontejner.appendChild(tb2);

                const dugme = document.createElement("button");
                dugme.innerHTML="Upit za ulicu";
                dugme.className="dugmad";
                this.kontejner.appendChild(dugme);
                dugme.onclick=(ev)=>{
                    fetch("http://localhost:5000/UlicaUpit", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*"
                    },
                    body: JSON.stringify({
                        City:tb1.value,
                        Street:tb2.value
                    })
                    })
                    .then(response => response.json())
                    .then(data => {
                        this.drawTable2(this.kontejner, data)
                    }).catch(p => {
                        alert("Greška prilikom upisa.");
                    });
                }
            }
        }
        this.kontejner.appendChild(izbor);

        
    }

    drawTable1(host, data){

        let ul1=document.createElement("ul");

        let li11=document.createElement("li");
        li11.innerHTML="Naziv ulice"
        let li21=document.createElement("li");
        li21.innerHTML="Broj slucajeva"

        ul1.appendChild(li11);
        ul1.appendChild(li21);

        host.appendChild(ul1);

        for(const street of data){
            let ul=document.createElement("ul");

            let li1=document.createElement("li");
            li1.innerHTML=street["name"];
            let li2=document.createElement("li");
            li2.innerHTML=street["cases"];

            ul.appendChild(li1);
            ul.appendChild(li2);

            host.appendChild(ul);
        }
    }

    drawTable2(host, data){

        let ul=document.createElement("ul");

        let li1=document.createElement("li");
        li1.innerHTML="Broj ulice"
        let li2=document.createElement("li");
        li2.innerHTML="Alkotest"
        let li3=document.createElement("li");
        li3.innerHTML="Radar"
        let li4=document.createElement("li");
        li4.innerHTML="Vreme"
        let li5=document.createElement("li");
        li5.innerHTML="Dodatni opis"

        ul.appendChild(li1);
        ul.appendChild(li2);
        ul.appendChild(li3);
        ul.appendChild(li4);
        ul.appendChild(li5);

        host.appendChild(ul);

        for(const street of data){
            let ul1=document.createElement("ul");

            let li11=document.createElement("li");
            li11.innerHTML=street["number"]
            let li21=document.createElement("li");
            li21.innerHTML=street["alkotest"]
            let li31=document.createElement("li");
            li31.innerHTML=street["speedtest"]
            let li41=document.createElement("li");
            li41.innerHTML=street["time"]
            let li51=document.createElement("li");
            li51.innerHTML=street["adddes"]

            ul1.appendChild(li11);
            ul1.appendChild(li21);
            ul1.appendChild(li31);
            ul1.appendChild(li41);
            ul1.appendChild(li51);

            host.appendChild(ul1);
        }
    }

}