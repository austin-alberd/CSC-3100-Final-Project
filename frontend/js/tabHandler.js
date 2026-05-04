//Functions to handle the tab switching
const divAddItems = document.querySelector("#divAddItems")
const divCreateResume = document.querySelector("#divCreateResume")
const divCompleteResume = document.querySelector("#divCompleteResume")

function resetPage(){
    divAddItems.style.display="block"
    divCreateResume.style.display="none"
    divCompleteResume.style.display="none"
} 

document.querySelector("#btnResumeBuild").addEventListener("click", async ()=>{
    resetPage()
    populateResumeTables()
    createJobTable()
    divAddItems.style.display="none"
    divCreateResume.style.display="block"
})

document.querySelector("#btnItemsAdd").addEventListener("click",()=>{
    resetPage()
    createResumeItemTables()
    divAddItems.style.display="block"
    divCreateResume.style.display="none"
}) 

function showCompletedResume(){
    divAddItems.style.display="none"
    divCreateResume.style.display="none"
    divCompleteResume.style.display="block"
}

