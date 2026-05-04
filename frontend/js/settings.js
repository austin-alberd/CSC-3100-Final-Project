// Warn the user if they do not have an API key stored
document.addEventListener("DOMContentLoaded",()=>{
    if(!sessionStorage.getItem("hasAPIToken")){
    Swal.fire({
        icon:"warning",
        title:"No API Token",
        text:"No API token has been provided. To use this application please create a Gemini AI token and input it into this program. You can do it through Settings."
    })
}
})

//Handles the change of the API token
document.querySelector("#btnChangeAPIToken").addEventListener("click",()=>{
    const strAPIKey = document.querySelector("#txtApiToken").value
    fetch(`${strAPIBaseURL}/ai-suggestions/set-api-key`,{method:"PUT",headers:{'Content-Type':'application/json'},body:JSON.stringify({apiKey:strAPIKey})}).then(res=>{
        if(res.ok){
            Swal.fire({
                icon:"success",
                title:"Successfully Updated API Token"
            })
            sessionStorage.setItem("hasAPIToken","true")
        }else{
            Swal.fire({
                icon:"error",
                title:"Could not Update API Token"
            })
        }
    })
})