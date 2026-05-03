document.querySelector("#btnJobAddButton").addEventListener("click",async ()=>{
    const {value: formValues} = await Swal.fire({
            title:`Add a Job`,
            html:`<label for="txtTitle" class="mt-3">Job Title</label>
                <input type="text" id="txtTitle" class="form-control">
                <label for="txtDescription" class="mt-3">Job Description</label>
                <input type="text" id="txtDescription" class="form-control"></input>`,
                focusConfirm: false,
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

                //Function to build table goes here
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

document.querySelector("#btnResumeItems").addEventListener("click",()=>{
    const objFormData = new FormData(document.querySelector("#formResumeItems"))
    console.log(Object.fromEntries(objFormData))
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

