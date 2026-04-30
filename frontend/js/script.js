const strAPIBaseURL="http://localhost:3000/api"
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
document.querySelectorAll(".remove_button").forEach(button=>{
    button.addEventListener("click",e=>{
        const strButtonID=e.target.id
    })
})

//Edit Functions
document.querySelectorAll(".edit_button").forEach(button=>{
    button.addEventListener("click",e=>{
        const strButtonID=e.target.id
    })
}) 