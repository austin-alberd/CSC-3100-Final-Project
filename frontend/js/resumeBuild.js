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
    console.log(arrCredentials)

    document.querySelector("#divCredentialCheck").innerHTML=""
     document.querySelector("#divExperienceChecks").innerHTML=""
     document.querySelector("#divSkillsChecks").innerHTML=""

    arrCredentials.forEach(row=>{
        document.querySelector("#divCredentialCheck").innerHTML+=`<div class="form-check"><input class="form-check-input" type="checkbox" value=${row["credential_id"]} id=${row["credential_id"]}><label class="form-check-label" for=${row["credential_id"]}>${row["credential_name"]}</label></div>`
    })

    arrExperience.forEach(row=>{
        document.querySelector("#divExperienceChecks").innerHTML+=`<div class="form-check"><input class="form-check-input" type="checkbox" value=${row["experience_id"]} id=${row["experience_id"]}><label class="form-check-label" for=${row["experience_id"]}>${row["experience_name"]}</label></div>`
    })

    arrSkills.forEach(row=>{
        document.querySelector("#divSkillsChecks").innerHTML+=`<div class="form-check"><input class="form-check-input" type="checkbox" value=${row["skill_id"]} id=${row["skill_id"]}><label class="form-check-label" for=${row["skill_id"]}>${row["skill_name"]}</label></div>`
    })
}

document.addEventListener("DOMContentLoaded",async ()=>{
    populateResumeTables()
})

