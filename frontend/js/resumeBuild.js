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