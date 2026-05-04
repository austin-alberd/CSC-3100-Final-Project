//All of the different "tabs"
const divAddItems = document.querySelector("#divAddItems")
const divCreateResume = document.querySelector("#divCreateResume")
const divCompleteResume = document.querySelector("#divCompleteResume")
const divSettings = document.querySelector("#divSettings")

// Brings the page back to its original state (basically just refreshing the page)
function resetPage(){
    divAddItems.style.display="block"
    divCreateResume.style.display="none"
    divCompleteResume.style.display="none"
    divSettings.style.display="none"
} 

// Swaps to the resume building page
document.querySelector("#btnResumeBuild").addEventListener("click", async ()=>{
    resetPage()
    populateResumeTables()
    createJobTable()
    divAddItems.style.display="none"
    divCreateResume.style.display="block"
    divSettings.style.display="none"

})

// Swaps to the add items page (the "home" page)
document.querySelector("#btnItemsAdd").addEventListener("click",()=>{
    resetPage()
    createResumeItemTables()
    divAddItems.style.display="block"
    divCreateResume.style.display="none"
    divSettings.style.display="none"
}) 

//Swaps to the settings menu
document.querySelector("#btnSettings").addEventListener("click",()=>{
    resetPage()
    divSettings.style.display="block"
    divCreateResume.style.display="none"
    divCompleteResume.style.display="none"
    divAddItems.style.display="none"
})

//Shows the completed resume (just another "tab" swap)
function showCompletedResume(){
    divAddItems.style.display="none"
    divCreateResume.style.display="none"
    divCompleteResume.style.display="block"
}

