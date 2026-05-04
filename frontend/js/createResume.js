//Generates the actual resume
async function createResume(){
    //Get the resume object and clear it out
    const divCompleteResume = document.querySelector("#divCompleteResume")
    divCompleteResume.innerHTML=""

    //Get all of the important data we need to make this thing.
    const objContactInfo = JSON.parse(sessionStorage.getItem("contactInfo"))
    const arrResumeItemIDs = JSON.parse(sessionStorage.getItem("resumeItems"))
    const arrSkills = JSON.parse(sessionStorage.getItem("skills")).filter(item=>arrResumeItemIDs["skills"].includes(item["skill_id"]))
    const arrExperience = JSON.parse(sessionStorage.getItem("experience")).filter(item=>arrResumeItemIDs["experiences"].includes(item["experience_id"]))
    const arrCredentails = JSON.parse(sessionStorage.getItem("credentials")).filter(item=>arrResumeItemIDs["credentials"].includes(item["credential_id"]))

    //Create items needed to leverage the objective statement creation endpoint
    const objJob = JSON.stringify(JSON.parse(sessionStorage.getItem("jobs")).filter(job=>job["job_id"] == sessionStorage.getItem("jobID"))[0])
    const arrAllQualifications = JSON.stringify([arrSkills,arrExperience,arrCredentails])

    //Get the objective statement then build the rest of the resume after that comes in.
    fetch(`${strAPIBaseURL}/ai-suggestions/objective-statement`,{method:"POST",headers:{'Content-Type':'application/json'},body:JSON.stringify({job:objJob,qualifications:arrAllQualifications})}).then(res=>{
        if(res.ok){
            return res.json()
        }else{
            throw new Error("Bad response")
        }
    }).then(data=>{
        //Create the Header Object
        divCompleteResume.innerHTML+=`
            <div>
                <h1 class="fw-bolder">${objContactInfo["firstName"]} ${objContactInfo["lastName"]}</h1>
                <p>${objContactInfo["email"]} | ${objContactInfo["phone"]} | ${objContactInfo["linkedin"]} | ${objContactInfo["gitHub"]}</p>
                <hr>
            </div>
        `
        // Create the objective statement section
        divCompleteResume.innerHTML+=`
            <h2 class="fw-bolder mt-3">Objective</h2>
            <div class="mx-5">
                <p>${data["objectiveStatement"]}</p>
            </div>
        `
        //Create the Experience Section
        if(arrExperience.length!=0){
            divCompleteResume.innerHTML+='<h2 class="fw-bolder mt-3">Experience</h2>'
            arrExperience.forEach(experience=>{
                divCompleteResume.innerHTML+=`
                    <div class="mx-5">
                        <p class="fw-bold">${experience["experience_name"]}</p>
                        ${experience["experience_description"]}
                    </div>
                `
            })
        }
        
        //Create the Skills Section
        if(arrSkills.length!=0){
            divCompleteResume.innerHTML+='<h2 class="fw-bolder mt-3">Skills</h2>'
            arrSkills.forEach(skill=>{
                divCompleteResume.innerHTML+=`
                    <div class="mx-5">
                        <p class="fw-bold">${skill["skill_name"]}</p>
                        ${skill["skill_description"]}
                    </div>
                `
            })
        }

        //Create the Credentials Section
        if(arrCredentails.length!=0){
            divCompleteResume.innerHTML+='<h2 class="fw-bolder mt-3">Credentials</h2>'
            arrCredentails.forEach(credential=>{
                divCompleteResume.innerHTML+=`
                    <div class="mx-5">
                        <p class="fw-bold">${credential["credential_name"]}</p>
                        ${credential["credential_description"]}
                    </div>
                `
            })
        }
    })
}