; (function(){

	"use strict"

	var form = document.getElementById("testform")
	var inp= document.getElementById("forminp")
	var ul=document.getElementsByTagName("ul")[0]
	var datem=document.querySelector("input[name='date']")
	var horaandm=document.querySelector("input[name='completetime']").value
	var date,dia,mes,ano,hour,min=""
	var exemplo
	var liss=ul.getElementsByTagName("li")
		var bd= new Array()
		bd=getSavedData()
		function getSavedData(){
			var dataobjnew=localStorage.getItem("tasks")
			
					dataobjnew=JSON.parse(dataobjnew)
					return dataobjnew && dataobjnew.length?dataobjnew:[{
					taskdescription:'Exemplo',
						checked:false,
						datamarcada: "!<<<<< Marcado em >>>>> 	ex/ex/ex as ex:ex",
						dataconclusao:"<< [!]data de conclusao >>>> ex/ex/ex  as ex:ex "
				}]	
		}
		function setNewData(){
			localStorage.setItem("tasks",JSON.stringify(bd))
		}
		setNewData()
		renderTask()

	function addtask(obj){
		var li,div,buttonck,p,i,buttonedit,
			buttondelete,divedit,inpedit,
			buttondivedit,buttondiveditcancel,
			divlisttext,divlistdate,plistdatem,plistdatec


		li=document.createElement("li")
		div=document.createElement("div")
		buttonck=document.createElement("button")
		buttonck.setAttribute("data-action","buttonck")
		buttonck.className= obj.checked?"buttonck buttonck2":"buttonck2"
		p=document.createElement("p")
		i=document.createElement("i")
		buttonedit=document.createElement("button")
		buttonedit.setAttribute("data-action","buttonedit")
		buttondelete=document.createElement("button")
		buttondelete.setAttribute("data-action","buttondelete")
		divedit=document.createElement("div")
		inpedit=document.createElement("input")
		inpedit.type="text"
		inpedit.className="inpedit"
		buttondivedit=document.createElement("button")
		buttondivedit.setAttribute("data-action","buttondivedit")
		buttondiveditcancel=document.createElement("button")
		buttondiveditcancel.setAttribute("data-action","buttondiveditcancel")
		divlisttext=document.createElement("div")
		divlistdate=document.createElement("div")
		plistdatem=document.createElement("i")
		plistdatec=document.createElement("i")
		divlistdate.append(plistdatem)
		plistdatem.textContent=obj.datamarcada
		divlistdate.append(plistdatec)
		plistdatec.className="plistdatec"
		plistdatec.textContent=obj.dataconclusao
		divlisttext.className="divlisttext"
		divlistdate.className="divlistdate"
		divedit.append(inpedit)
		divedit.append(buttondivedit)
		divedit.append(buttondiveditcancel)
		buttondivedit.className="buttondivedit"
		buttondivedit.textContent="edit"
		buttondiveditcancel.className="buttondiveditcancel"
		buttondiveditcancel.textContent="cancel"
		divedit.className="divedit"
		buttonedit.className="imageedit"
		buttondelete.className="delimage"
		div.className="divitemcheck"
		i.textContent=obj.taskdescription
		li.append(div)
		divlisttext.append(buttonck)
		divlisttext.append(p)
		divlisttext.append(buttonedit)
		divlisttext.append(divedit)
		divlisttext.append(buttondelete)
		div.append(divlisttext)
		div.append(divlistdate)
		p.append(i)

		return li
		
	}

	function validate(testedate,houratest){
			var arrhpt,hpt,minpt,diapt,mespt,anopt	
		try{
			arrhpt= houratest.split(":")
			hpt=parseInt(arrhpt[0])
			minpt=parseInt(arrhpt[1])
			diapt= parseInt(testedate[2])
			mespt= parseInt(testedate[1])
			anopt= parseInt(testedate[0])
			hour
			min
			var anovalid=false,mesvalid=false,diavalid=false,hourvalid=false,minvalid=false
			if(anopt > parseInt(ano)){
					anovalid=true
					mesvalid=true
					diavalid=true
					hourvalid=true
					minvalid=true

			}
			else if(anopt == parseInt(ano)){
					anovalid=true
					if(mespt == parseInt(mes)){
						mesvalid=true
						if(diapt == parseInt(dia)){
							diavalid=true
							if(hpt == hour && minpt > min){
								hourvalid=true
								minvalid=true
								
							}else{
								if(hpt > hour){
									hourvalid=true
									minvalid=true
								}
							}
						}
					}
			}
			 if(anopt == parseInt(ano)){
					anovalid=true
				if(mespt > parseInt(mes)){
					mesvalid=true
					diavalid=true
					hourvalid=true
					minvalid=true	
				}
				if(mespt==parseInt(mes) && diapt > parseInt(dia)){
					mesvalid=true
					diavalid=true
					hourvalid=true
					minvalid=true
				}

			}
			if(anovalid && mesvalid && diavalid && hourvalid && minvalid){
				return true
			}
			else{
					
				return false
			}
		}catch(err){
			console.log(err)

			msgpopup("Data invalida")
		} 
		
	}
	var popupmessage=document.getElementById("todo_error_pop_up")
	var contpopup=1
	function msgpopup(msgstatus){
		var poparr=document.getElementsByClassName("popup")
		var body2=document.getElementById("body2")
		var newpopup=popupmessage.cloneNode(true)
		newpopup.textContent=msgstatus
		newpopup.style.display="flex"
		newpopup.style.zIndex=contpopup
		body2.appendChild(newpopup)
		contpopup++
		setTimeout(desativapop,6000)
	}
	var zeraz=false
	function desativapop(){
		if(zeraz){
			clearTimeout(zeraz)
		}
		zeraz=setTimeout(zerazindex,60000)
		var poparr=document.getElementsByClassName("popup")
			poparr[0].style.display="none"
			poparr[0].remove()
			
	}
	function zerazindex(){
		contpopup=0
	}
	

	function addObj(taskd,datet,houra){
			if(typeof datet !== "string") return
			var dateb=datet.split('-')					
			date= new Date()
			dia= date.getDate()
			mes= String(parseInt(date.getMonth())+1)
			ano= date.getFullYear()
			hour=date.getHours()
			min=date.getMinutes()
			if(validate(dateb,houra)){
				add1=true
				bd.push({
				taskdescription:taskd,
				checked:false,
				datamarcada: "!<<<<Marcado em>>>> "+dia+'/'+mes+'/'+ano+" as "+hour+":"+min,
				dataconclusao:"[!]data de conclusao>>> "+dateb[2]+"/"+dateb[1]+"/"+dateb[0] +" as "+houra

				})
				setNewData()
				
				msgpopup("Task cadastrada")
				renderTask()
		}
		else{
			msgpopup("Data invalida So e Permitido datas futuras de no minimo um minuto")
		}
	}

	function renderTask(){
		ul.innerHTML=""
		bd.forEach(function(element){

			ul.appendChild(addtask(element))		
		})
	
	}

	
	function clickedul(e){
			var actions={
		 	buttonedit:function(){
		 		var diveditarr=ul.querySelectorAll(".divedit")
		 		for(var i=0;i<diveditarr.length;i++){
		 			diveditarr[i].removeAttribute("style")
		 		}
		 		var divedit= currentli.querySelector(".divedit")
		 		divedit.style.display="flex"
		 		currentli.querySelector(".inpedit").value=bd[currentliindex].taskdescription
		 	},
		 	buttondelete:function(){
		 		bd.splice(currentliindex,1)
		 		msgpopup("Task Removida")
		 		renderTask()
		 		setNewData()
		 	},
		 	buttonck:function(){
		 		bd[currentliindex].checked=!bd[currentliindex].checked
		 		if(bd[currentliindex].checked){
		 			currentli.querySelector(".buttonck2").classList.add("buttonck")
		 		}else{
		 			currentli.querySelector(".buttonck2").classList.remove("buttonck")
		 		}
		 		setNewData()
		 	},
		 	buttondivedit:function(){

		 		var valueinpedit=currentli.querySelector(".inpedit").value
		 		bd[currentliindex].taskdescription=valueinpedit
		 		renderTask()
		 		setNewData()
		 	},
		 	buttondiveditcancel:function(){
		 			var valueinpedit2=currentli.querySelector(".inpedit")
		 			currentli.querySelector(".divedit").removeAttribute("style")
	
		 		valueinpedit2.value=""
		 	}

		 }
		var data_action=e.target.getAttribute("data-action")
		if(!data_action) return
			var currentli
			currentli= e.target
		while(currentli.nodeName !== "LI"){
			currentli= currentli.parentElement
		}

		var currentliarr=[]
		for(var i=0; i<liss.length; i++){
			currentliarr.push(liss[i])
		}

		var currentliindex=currentliarr.indexOf(currentli)
		if(add1){
			if(actions[data_action]){
				actions[data_action]()
			}
	
		}
		

	}

	ul.addEventListener("click",clickedul)

		var add1=true

	form.onsubmit=function(event){
		event.preventDefault()
		var inpval,inpdate,inphour=""
		inpval=inp.value
		inpdate=datem.value
		var horaandm=document.querySelector("input[name='completetime']").value
		inphour=horaandm
		addObj(inpval,inpdate,inphour)
		inp.value=""
		inp.focus()
		
	}

})()