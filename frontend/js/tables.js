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
    console.log(arrCredentials)

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
}

document.addEventListener("DOMContentLoaded",async ()=>{
    createResumeItemTables()
})