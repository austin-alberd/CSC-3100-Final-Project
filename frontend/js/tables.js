/**
 * tables.js
 * Handles the initial creation of the tables and holds the functions to create the tables again.
 */
async function createResumeItemTables(){
    //Found the bellow on reddit. https://www.reddit.com/r/learnjavascript/comments/1dzrtwq/recommended_style_for_multiple_async_fetch_calls/
    const [objExperience,objCredentails,objSkills] = await Promise.all([
        (await fetch(`${strAPIBaseURL}/experience`)).json(),
        (await fetch(`${strAPIBaseURL}/credentials`)).json(),
        (await fetch(`${strAPIBaseURL}/skills`)).json()
    ])

    // Probably innefficient, but it works
    const arrExperience = objExperience.rows
    const arrCredentials = objCredentails.rows
    const arrSkills = objSkills.rows

    document.querySelector("#tblExperience tbody").innerHTML = ""
    document.querySelector("#tblSkill tbody").innerHTML=""
    document.querySelector("#tblCredential tbody").innerHTML=""

    arrSkills.forEach(row=>{
        document.querySelector("#tblSkill tbody").innerHTML += `<tr id=${row["skill_id"]}><td>${row["skill_name"]}</td><td>${row["skill_description"]}</td></tr>`
    })

    arrExperience.forEach(row=>{
        document.querySelector("#tblExperience tbody").innerHTML += `<tr id=${row["experience_id"]}><td>${row["experience_name"]}</td><td>${row["experience_description"]}</td></tr>`
    })

    arrCredentials.forEach(row=>{
        document.querySelector("#tblCredential tbody").innerHTML += `<tr id=${row["credential_id"]}><td>${row["credential_name"]}</td><td>${row["credential_description"]}</td></tr>`
    })

    sessionStorage.setItem("credentials",JSON.stringify(arrCredentials))
    sessionStorage.setItem("skills",JSON.stringify(arrSkills))
    sessionStorage.setItem("experience",JSON.stringify(arrExperience))
}

async function populateResumeTables(){
    // Made this into a function so I can call it later
    //Found the bellow on reddit. https://www.reddit.com/r/learnjavascript/comments/1dzrtwq/recommended_style_for_multiple_async_fetch_calls/
    const [objExperience,objCredentails,objSkills] = await Promise.all([
        (await fetch(`${strAPIBaseURL}/experience`)).json(),
        (await fetch(`${strAPIBaseURL}/credentials`)).json(),
        (await fetch(`${strAPIBaseURL}/skills`)).json()
    ])

    // Probably innefficient, but it works
    const arrExperience = objExperience.rows
    const arrCredentials = objCredentails.rows
    const arrSkills = objSkills.rows

    document.querySelector("#divCredentialCheck").innerHTML=""
    document.querySelector("#divExperienceChecks").innerHTML=""
    document.querySelector("#divSkillsChecks").innerHTML=""

    arrCredentials.forEach(row=>{
        document.querySelector("#divCredentialCheck").innerHTML+=`<div class="form-check"><input class="form-check-input" type="checkbox" value=${row["credential_id"]} id=${row["credential_id"]} name=${row["credential_id"]}|credential><label class="form-check-label" for=${row["credential_id"]}>${row["credential_name"]}</label></div>`
    })

    arrExperience.forEach(row=>{
        document.querySelector("#divExperienceChecks").innerHTML+=`<div class="form-check"><input class="form-check-input" type="checkbox" value=${row["experience_id"]} id=${row["experience_id"]}  name=${row["experience_id"]}|experience><label class="form-check-label" for=${row["experience_id"]}>${row["experience_name"]}</label></div>`
    })

    arrSkills.forEach(row=>{
        document.querySelector("#divSkillsChecks").innerHTML+=`<div class="form-check"><input class="form-check-input" type="checkbox" value=${row["skill_id"]} id=${row["skill_id"]}  name=${row["skill_id"]}|skill><label class="form-check-label" for=${row["skill_id"]}>${row["skill_name"]}</label></div>`
    })

    sessionStorage.setItem("credentials",JSON.stringify(arrCredentials))
    sessionStorage.setItem("skills",JSON.stringify(arrSkills))
    sessionStorage.setItem("experience",JSON.stringify(arrExperience))
}

async function createJobTable(){
    const objJobsRes = await Promise.all([
        (await fetch(`${strAPIBaseURL}/jobs`)).json()
    ])
    const arrJobs = objJobsRes[0].rows

    document.querySelector("#tblJobs tbody").innerHTML = ""
    arrJobs.forEach(row=>{
        document.querySelector("#tblJobs tbody").innerHTML+=`<tr id=${row["job_id"]}><td>${row["job_title"]}</td><td>${row["job_description"]}</td></tr>`
    })

    sessionStorage.setItem("jobs",JSON.stringify(arrJobs))
}

document.addEventListener("DOMContentLoaded",async ()=>{
    createResumeItemTables()
    createJobTable()
    populateResumeTables()
})