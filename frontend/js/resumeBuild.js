document.querySelector("#btnJobAddButton").addEventListener("click",async ()=>{
    const {value: formValues} = await Swal.fire({
            title:`Add a Job`,
            html:`<label for="txtTitle" class="mt-3">Job Title</label>
                <input type="text" id="txtTitle" class="form-control">
                <label for="txtDescription" class="mt-3">Job Description</label>
                <input type="text" id="txtDescription" class="form-control"></input>`,
                focusConfirm: false,
                showCancelButton:true,
                preConfirm: ()=>{
                    return [document.getElementById("txtTitle").value, document.getElementById("txtDescription").value]
                }
            })
        
    if(formValues){
        fetch(`${strAPIBaseURL}/jobs`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                jobName:formValues[0],
                jobDescription:formValues[1]
            })
        }).then(res=>res.json()).then(data=>{
            if(data.status=="success"){
                Swal.fire({
                    title:"Success",
                    icon:"success",
                    text:"Added item successfully"
                })
                createJobTable()
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

document.querySelector("#btnJobDeleteButton").addEventListener("click",()=>{
        const objInputOptions ={}
        JSON.parse(sessionStorage.getItem("jobs")).forEach(row=>{
            objInputOptions[row[`job_id`]]=row[`job_title`]
        })

        Swal.fire({
            title:"Select a Job to Delete",
            input:"select",
            inputOptions:objInputOptions,
            showCancelButton:true,
            icon:"warning"
        }).then(data=>{
            if(data.isConfirmed){
                fetch(`${strAPIBaseURL}/jobs/${data.value}`,{"method":"DELETE"}).then(res=>{
                    if(res.ok){
                        Swal.fire({
                            title:"Deleted Job",
                            icon:"success"
                        })
                        createJobTable()
                    }else{
                        Swal.fire({
                            title:"Could not Delete Job",
                            icon:"error"
                        })
                    }
                })
            }else{
                Swal.fire({
                    title:"No Job Deleted",
                    icon:"info"
                })
            }
        })
})

document.querySelector("#btnJobSelectButton").addEventListener("click",()=>{
     const objInputOptions ={}
        JSON.parse(sessionStorage.getItem("jobs")).forEach(row=>{
            objInputOptions[row[`job_id`]]=row[`job_title`]
        })

        Swal.fire({
            title:"Select a Job",
            input:"select",
            inputOptions:objInputOptions,
            showCancelButton:true,
        }).then(data=>{
            if(data.isConfirmed){
                //Logic go here
                if(sessionStorage.getItem("jobID")){
                    document.querySelector(`#${CSS.escape(sessionStorage.getItem("jobID"))}`).classList.remove("table-primary")
                    document.querySelector(`#${CSS.escape(data.value)}`).classList.add("table-primary")
                    sessionStorage.setItem("jobID",data.value)
                }else{
                    sessionStorage.setItem("jobID",data.value)
                    document.querySelector(`#${CSS.escape(data.value)}`).classList.add("table-primary")
                }
            }else{
                Swal.fire({
                    icon:'info',
                    title:"No Job Selected"
                })
            }
        })
})

document.querySelector("#btnResumeItems").addEventListener("click",()=>{
    const objFormData = new FormData(document.querySelector("#formResumeItems"))
    const arrFormData =Object.keys(Object.fromEntries(objFormData))

    let arrExpereinces = []
    let arrSkills = []
    let arrCredentials = []

    arrFormData.forEach(entry=>{
        const arrEntry = entry.split("|")
        switch (arrEntry[1]){
            case "experience":
                arrExpereinces.push(arrEntry[0])
                break;
            case "skill":
                arrSkills.push(arrEntry[0])
                break;
            case "credential":
                arrCredentials.push(arrEntry[0])
                break;
            default:
                console.error("Invalid Key")
        }
    })

    const objResumeItemIDS= {
        experiences:arrExpereinces,
        skills:arrSkills,
        credentials:arrCredentials
    }

    sessionStorage.setItem("resumeItems",JSON.stringify(objResumeItemIDS))

    Swal.fire({
        icon:"success",
        title:"Successfully Selected Resume Items"
    })
})

document.querySelector("#btnGenerateResume").addEventListener("click",()=>{
    const txtFirstName = document.querySelector("#txtFirstName").value
    const txtLastName = document.querySelector("#txtLastName").value
    const txtEmail = document.querySelector("#txtEmail").value
    const txtPhone = document.querySelector("#txtPhone").value
    const txtLinkedin = document.querySelector("#txtLinkedin").value
    const txtGithub = document.querySelector("#txtGithub").value

    const objPersonalInformation = {
        firstName:txtFirstName,
        lastName:txtLastName,
        email:txtEmail,
        phone:txtPhone,
        gitHub:txtGithub,
        linkedin:txtLinkedin
    }

    sessionStorage.setItem("contactInfo",JSON.stringify(objPersonalInformation))

    if(sessionStorage.getItem("contactInfo")&&sessionStorage.getItem("resumeItems")&&sessionStorage.getItem("jobID")){
        
        Swal.fire({
            icon:"info",
            title:"Generating Your Resume. Note this might take some time as the AI is helping with this part"
        })

        createResume()
        showCompletedResume()
    }else{
        Swal.fire({
            icon:"error",
            title:"Please Select a Job and Resume Items"
        })
    }
})