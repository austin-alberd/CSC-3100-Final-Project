//Functions to handle the tab switching
const divAddItems = document.querySelector("#divAddItems")
const divCreateResume = document.querySelector("#divCreateResume")
const divCompleteResume = document.querySelector("#divCompleteResume")
const divSettings = document.querySelector("#divSettings")

function resetPage(){
    divAddItems.style.display="block"
    divCreateResume.style.display="none"
    divCompleteResume.style.display="none"
    divSettings.style.display="none"
} 

document.querySelector("#btnResumeBuild").addEventListener("click", async ()=>{
    resetPage()
    populateResumeTables()
    createJobTable()
    divAddItems.style.display="none"
    divCreateResume.style.display="block"
    divSettings.style.display="none"

})

document.querySelector("#btnItemsAdd").addEventListener("click",()=>{
    resetPage()
    createResumeItemTables()
    divAddItems.style.display="block"
    divCreateResume.style.display="none"
    divSettings.style.display="none"
}) 

document.querySelector("#btnSettings").addEventListener("click",()=>{
    resetPage()
    divSettings.style.display="block"
    divCreateResume.style.display="none"
    divCompleteResume.style.display="none"
    divAddItems.style.display="none"
})

function showCompletedResume(){
    divAddItems.style.display="none"
    divCreateResume.style.display="none"
    divCompleteResume.style.display="block"
}

