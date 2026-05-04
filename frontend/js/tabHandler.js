//Functions to handle the tab switching
const divAddItems = document.querySelector("#divAddItems")
const divCreateResume = document.querySelector("#divCreateResume")
const divCompleteResume = document.querySelector("#divCompleteResume")

document.querySelector("#btnResumeBuild").addEventListener("click", async ()=>{
    populateResumeTables()
    createJobTable()
    divAddItems.style.display="none"
    divCreateResume.style.display="block"
})

document.querySelector("#btnItemsAdd").addEventListener("click",()=>{
    createResumeItemTables()
    divAddItems.style.display="block"
    divCreateResume.style.display="none"
}) 

function showCompletedResume(){
    createResume()
    divAddItems.style.display="none"
    divCreateResume.style.display="none"
    divCompleteResume.style.display="block"
}

function resetPage(){
    divAddItems.style.display="block"
    divCreateResume.style.display="none"
    divCompleteResume.style.display="none"
} 