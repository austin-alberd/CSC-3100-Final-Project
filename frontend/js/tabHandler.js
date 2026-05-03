//Functions to handle the tab switching
const divAddItems = document.querySelector("#divAddItems")
const divCreateResume = document.querySelector("#divCreateResume")

document.querySelector("#btnResumeBuild").addEventListener("click",()=>{
    divAddItems.style.display="none"
    divCreateResume.style.display="block"
})

document.querySelector("#btnItemsAdd").addEventListener("click",()=>{
    divAddItems.style.display="block"
    divCreateResume.style.display="none"
})