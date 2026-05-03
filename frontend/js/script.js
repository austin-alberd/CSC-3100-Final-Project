
const strAPIBaseURL="http://localhost:3000/api"
//Display the thank you popup once per browser session
if(!sessionStorage.getItem("thankYouPopup")){
    console.log("AHHH")
    Swal.fire({
        title:"Thank you!",
        icon:"info",
        text:"The creation of this project would not have been possible without: Bootstrap, sweetalert2"
    })
    sessionStorage.setItem("thankYouPopup","Yippee")
}

//Add Functions
document.querySelectorAll(".add_button").forEach(button=>{
    button.addEventListener("click",async e=>{
        //btnSkillAdd,btnExperienceAdd, and btnCredentialAdd
        const strButtonID=e.target.id
        const strTitle = strButtonID == "btnSkillAdd" ? "Skill"
                        : strButtonID == "btnExperienceAdd" ? "Experience"
                        : strButtonID == "btnCredentialAdd" ? "Credential"
                        : "Undefined"
        const strRouteName = strTitle == "Skill" ? "skills"
                            : strTitle == "Experience" ? "experience"
                            : strTitle == "Credential" ? "credentials"
                            :"Undefined"
 
        const {value: formValues} = await Swal.fire({
            title:`Add a ${strTitle}`,
            html:`<label for="txtTitle" class="mt-3">Title</label>
                <input type="text" id="txtTitle" class="form-control">
                <label for="txtDescription" class="mt-3">Description</label>
                <input type="text" id="txtDescription" class="form-control"></input>`,
                focusConfirm: false,
                preConfirm: ()=>{
                    return [document.getElementById("txtTitle").value, document.getElementById("txtDescription").value]
                }
            })
        
        if(formValues){
            fetch(`${strAPIBaseURL}/${strRouteName}`,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    skill:formValues[0],
                    description:formValues[1]
                })
            }).then(res=>res.json()).then(data=>{
                if(data.status=="success"){
                    Swal.fire({
                        title:"Success",
                        icon:"success",
                        text:"Added item successfully"
                    })

                    createResumeItemTables()
                }
            })
        }else{
            Swal.fire({
                title:"Error",
                icon:"error",
                text:"Could not add information"
            })
        }
    })
})

//Remove Functions
document.querySelectorAll(".remove_button").forEach(async (button)=>{
    button.addEventListener("click",e=>{
        const strButtonID=e.target.id
        console.log(strButtonID)
        const strTitle = strButtonID == "btnSkillRemove" ? "skill"
                        : strButtonID == "btnExperienceRemove" ? "experience"
                        : strButtonID == "btnCredentialRemove" ? "credential"
                        : "Undefined"
        const strRouteName = strTitle == "skill" ? "skills"
                            : strTitle == "experience" ? "experience"
                            : strTitle == "credential" ? "credentials"
                            :"Undefined"

        const objInputOptions ={}
        JSON.parse(sessionStorage.getItem(strRouteName)).forEach(row=>{
            objInputOptions[row[`${strTitle}_id`]]=row[`${strTitle}_name`]
        })
        console.log(objInputOptions)
        
        Swal.fire({
            title:"Select an Item to Delete",
            input:"select",
            icon:"warning",
            inputOptions:objInputOptions,
            inputPlaceHolder:"Select an item",
            showCancelButton:true
        }).then(data=>{
            if(data.isConfirmed==false){
                Swal.fire({
                    title:"No item removed",
                    icon:"info"
                })
            }else{
                fetch(`${strAPIBaseURL}/${strRouteName}/${data.value}`,{method:'DELETE'}).then(res=>{
                    if(res.ok){
                        return res.json()
                    }else{
                        throw new Error("Bad response")
                    }
                }).then(data=>{
                    Swal.fire({
                        title:"Removed Item",
                        icon:"success"
                    })
                    createResumeItemTables()
                }).catch(err=>{
                    Swal.fire({
                        title:"Could Not Remove Item",
                        icon:"error"
                    })
                    console.error(err)
                })
            }
        })

    })
})

//Edit Functions
document.querySelectorAll(".edit_button").forEach(button=>{
    button.addEventListener("click",e=>{

    })
}) 


