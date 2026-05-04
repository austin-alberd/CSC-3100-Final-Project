
const strAPIBaseURL="http://localhost:3000/api"

// Acknowledgements button - just shows the libraries used and such
document.querySelector("#btnAcknowledgements").addEventListener("click",()=>{
        Swal.fire({
        title:"Thank you!",
        icon:"info",
        text:"The creation of this project would not have been possible without: Bootstrap, sweetalert2, and Google Gemini's javascript library"
    })
})



//Add Functions
document.querySelectorAll(".add_button").forEach(button=>{
    button.addEventListener("click",async e=>{
        const strButtonID=e.target.id //The id from the button we pressed

        //Convert the ID to a tile
        const strTitle = strButtonID == "btnSkillAdd" ? "Skill"
                        : strButtonID == "btnExperienceAdd" ? "Experience"
                        : strButtonID == "btnCredentialAdd" ? "Credential"
                        : "Undefined"
        //Convert title into the route name
        const strRouteName = strTitle == "Skill" ? "skills"
                            : strTitle == "Experience" ? "experience"
                            : strTitle == "Credential" ? "credentials"
                            :"Undefined"
 
        const {value: formValues} = await Swal.fire({
            title:`Add a ${strTitle}`,
            html:`<label for="txtTitle" class="mt-3">Title</label>
                <input type="text" id="txtTitle" class="form-control">
                <label for="txtDescription" class="mt-3">Description</label>
                <p>Enter your points separated by periods. For example</p>
                <p>Point 1. Point 2. Point 3.</p> <p> Would show as </p>
                <ul>
                    <li>Point 1</li>
                    <li>Point 2</li>
                    <li>Point 3</li>
                </ul>
                <input type="text" id="txtDescription" class="form-control"></input>`,
                focusConfirm: false,
                showCancelButton:true,
                preConfirm: ()=>{
                    return [document.getElementById("txtTitle").value, document.getElementById("txtDescription").value]
                }
            })
        
        //Convert the "sentences" to unordered lists
        let arrDescriptionFromForm = formValues[1].split(".").filter(item=>item!="")
        let strFormDescription = "<ul>"
        arrDescriptionFromForm.forEach(item=>{
            strFormDescription+=`<li>${item}</li>`
        })
        strFormDescription+="</ul>"

        if(formValues){
            fetch(`${strAPIBaseURL}/${strRouteName}`,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    skill:formValues[0],
                    description:strFormDescription
                })
            }).then(res=>res.json()).then(data=>{
                if(data.status=="success"){
                    Swal.fire({
                        title:"Success",
                        icon:"success",
                        text:"Added item successfully"
                    })

                    createResumeItemTables() // Another function to recreate the tables
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
        const strButtonID=e.target.id //ID of clicked button

        const strTitle = strButtonID == "btnSkillRemove" ? "skill"
                        : strButtonID == "btnExperienceRemove" ? "experience"
                        : strButtonID == "btnCredentialRemove" ? "credential"
                        : "Undefined"
        const strRouteName = strTitle == "skill" ? "skills"
                            : strTitle == "experience" ? "experience"
                            : strTitle == "credential" ? "credentials"
                            :"Undefined"

        //Create input options for the sweet alert
        const objInputOptions ={}
        JSON.parse(sessionStorage.getItem(strRouteName)).forEach(row=>{
            objInputOptions[row[`${strTitle}_id`]]=row[`${strTitle}_name`]
        })
        
        Swal.fire({
            title:"Select an Item to Delete",
            input:"select",
            icon:"warning",
            inputOptions:objInputOptions,
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
        const strButtonID=e.target.id
        const strTitle = strButtonID == "btnSkillEdit" ? "skill"
                        : strButtonID == "btnExperienceEdit" ? "experience"
                        : strButtonID == "btnCredentialEdit" ? "credential"
                        : "Undefined"
        const strRouteName = strTitle == "skill" ? "skills"
                            : strTitle == "experience" ? "experience"
                            : strTitle == "credential" ? "credentials"
                            :"Undefined"

        const objInputOptions ={}
        JSON.parse(sessionStorage.getItem(strRouteName)).forEach(row=>{
            objInputOptions[row[`${strTitle}_id`]]=row[`${strTitle}_name`]
        })

        Swal.fire({
            title:"Select an Item to Edit",
            input:"select",
            icon:"info",
            inputOptions:objInputOptions,
            showCancelButton:true
        }).then(data=>{
            if(data.isConfirmed){
                const strItemID=data.value
                Swal.fire({
                    title:"Enter a new description. Separate bullet points by periods.",
                    input:"textarea",
                    inputLabel:"Enter a new description.",
                    showCancelButton:true
                }).then(data=>{
                    if(data.isConfirmed){
                        fetch(`${strAPIBaseURL}/${strRouteName}/${strItemID}`,{method:'PUT',body:JSON.stringify({description:data.value}),headers:{'Content-type':'application/json'}}).then(res=>{
                            if(res.ok){
                                Swal.fire({
                                    title:"Updated Description",
                                    icon:"success"
                                })
                                createResumeItemTables()
                            }else{
                                Swal.fire({
                                    title:"Could Not Update Description",
                                    icon:"error"
                                })
                            }
                        }).catch(err=>{
                            Swal.fire({
                                title:"Could Not Update Description",
                                icon:"error"
                            })
                        })

                    }else{
                        Swal.fire({
                            icon:"info",
                            title:"No item changed",
                        })
                    }
                })
            }else{
                Swal.fire({
                    icon:"info",
                    title:"No item changed",
                })
            }
        })
        
    })
}) 


//AI Feedback button
document.querySelectorAll(".ai_button").forEach(button=>{
    button.addEventListener("click",e=>{
        const strButtonID=e.target.id
        const strTitle = strButtonID == "btnSkillSuggest" ? "skill"
                        : strButtonID == "btnExperienceSuggest" ? "experience"
                        : strButtonID == "btnCredentialSuggest" ? "credential"
                        : "Undefined"
        const strRouteName = strTitle == "skill" ? "skills"
                            : strTitle == "experience" ? "experience"
                            : strTitle == "credential" ? "credentials"
                            :"Undefined"
        
        const objInputOptions ={}
        JSON.parse(sessionStorage.getItem(strRouteName)).forEach(row=>{
            objInputOptions[row[`${strTitle}_id`]]=row[`${strTitle}_name`]
        })

        Swal.fire({
            title:"Select an Item",
            input:"select",
            text:"Select an item to recieve suggestions from AI on. Note feedback may take some time to come in.",
            showCancelButton:true,
            inputOptions:objInputOptions
        }).then(data=>{
            if(data.isConfirmed){
                fetch(`${strAPIBaseURL}/ai-suggestions/${strRouteName}/${data.value}`).then(res=>{
                    if(res.ok){
                        return res.json()
                    }else{
                        throw new Error("Bad Response")
                    }
                }).then(data=>{
                    Swal.fire({
                        icon:"info",
                        title:"Feedback",
                        text:data.feedback
                    })
                })
            }
        })
    })
})