export class Homepage{
    constructor(){
        this.kontejner=null;
       
    }    

    drawHomepage(host){
        
            this.kontejner=document.createElement("div");
            this.kontejner.className="naslovna";
            host.appendChild(this.kontejner);
            
            let labela=document.createElement("label");
            labela.innerHTML="Grad:"
            this.kontejner.appendChild(labela)

            let tb1= document.createElement("input");
            tb1.className="grad";
            this.kontejner.appendChild(tb1);

            labela=document.createElement("label");
            labela.innerHTML="Ulica i broj:"
            this.kontejner.appendChild(labela)

            let tb2= document.createElement("input");
            tb2.className="ulica_broj";
            this.kontejner.appendChild(tb2);

            labela=document.createElement("label");
            labela.innerHTML="Alkotest"
            this.kontejner.appendChild(labela)

            let tb3= document.createElement("input");
            tb3.className="alkotest";
            tb3.type="checkbox";
            tb3.value="da";
            this.kontejner.appendChild(tb3);
            
            labela=document.createElement("label");
            labela.innerHTML="Brzinomer"
            this.kontejner.appendChild(labela)

            let tb4= document.createElement("input");
            tb4.className="brzinomer";
            tb4.type="checkbox";
            tb4.value="da";
            this.kontejner.appendChild(tb4);


            labela=document.createElement("label");
            labela.innerHTML="Opis:"
            this.kontejner.appendChild(labela)

            let tb5= document.createElement("input");
            tb5.className="opis";
            this.kontejner.appendChild(tb5);

            const dugme = document.createElement("button");
            dugme.innerHTML="Prijavi policiju";
            this.kontejner.appendChild(dugme);
            dugme.onclick=(ev)=>{
                if(tb1.value=="")
                    return;
                if(tb2.value=="")
                    return;

                const regex1=/[A-Za-z]+[ A-Za-z]* [0-9]+/g;
                if(!tb2.value.match(regex1)){
                    alert("Format ulice je \"ulica (ulica)? broj\"");
                    return;
                }

                let pom1=document.getElementsByClassName("alkotest")[0];
                let pom2=document.getElementsByClassName("brzinomer")[0];

                fetch("http://localhost:5000/PrijaviSlucaj", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*"
                    },
                    body: JSON.stringify({
                        City:tb1.value,
                        Street: tb2.value,
                        alkotest: pom1.checked,
                        speedtest: pom2.checked,
                        adddes: tb5.value
                    })
                }).then(p => {
                    if (p.ok) {
                        tb1.value="";
                        tb2.value="";
                        alert("Uspesno prijavljena saobracajna policija");
                    }
                }).catch(p => {
                    alert("Greška prilikom upisa.");
                });
            }

        let dugmic=document.createElement('button');
        dugmic.innerHTML="Druga strana";
        dugmic.onclick=(ev)=>{

            this.strana=!this.strana;
            document.location.reload(true);

        }
    }
}