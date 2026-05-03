//Functions to handle the tab switching
const divAddItems = document.querySelector("#divAddItems")
const divCreateResume = document.querySelector("#divCreateResume")

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