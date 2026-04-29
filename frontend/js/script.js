//Add Functions
document.querySelectorAll(".add_button").forEach(button=>{
    button.addEventListener("click",async e=>{
        //btnSkillAdd,btnExperienceAdd, and btnCredentialAdd
        const strButtonID=e.target.id
        const strTitle = strButtonID == "btnSkillAdd" ? "Skill"
                        : strButtonID == "btnExperienceAdd" ? "Experience"
                        : strButtonID == "btnCredentialAdd" ? "Credential"
                        : "Undefined"

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
        
        if(formValues) Swal.fire(JSON.stringify(formValues))
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