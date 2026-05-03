const express = require("express")
const {v4:uuidv4} = require("uuid")
const cors = require("cors")
const sqlite3 = require("sqlite3")

//Database setup
const dbMain = new sqlite3.Database('main.db',err=>{
    if(err){
        console.error("ERROR:   Could not open connection to database")
        console.error(err)
    }else{
        console.log("SUCCESS:   Connected to database")
    }
})
//express setup
const HTTP_PORT = 3000
app = express()

app.use(express.json())
app.use(cors())

app.listen(HTTP_PORT,err=>{
    if(err){
        console.error("ERROR:   Could not start server"+err)
    }else{
        console.log("SUCCESS:   Started server and listening on port " + HTTP_PORT)
    }
})

app.post("/api/skills",(req,res)=>{
    try{
        const strSkill = req.body.skill 
        const strDescription = req.body.description 
        const strSkillID = uuidv4()

        dbMain.run('INSERT INTO tblSkills VALUES(?,?,?)',[strSkillID,strSkill,strDescription],err=>{
            if(err){
                res.status(500).json({status:"error",message:"could not add skill"})
                console.error(e)
            }else{
                res.status(201).json({status:"success",message:"added skill to database", recordID:strSkillID})
            }
        })
    }catch(e){
        res.status(500).json({status:"error",message:"could not add skill"})
        console.error(e)
    }
})

app.post("/api/credentials",(req,res)=>{
    try{
        const strCredential = req.body.skill 
        const strDescription = req.body.description 
        const strCredentialID = uuidv4()

        dbMain.run('INSERT INTO tblCredentials VALUES(?,?,?)',[strCredentialID,strCredential,strDescription],err=>{
            if(err){
                res.status(500).json({status:"error",message:"could not add skill"})
                console.error(e)
            }else{
                res.status(201).json({status:"success",message:"added skill to database", recordID:strCredentialID})
            }
        })
    }catch(e){
        res.status(500).json({status:"error",message:"could not add skill"})
        console.error(e)
    }
})

app.post("/api/experience",(req,res)=>{
    try{
        const strExperience = req.body.skill 
        const strDescription = req.body.description 
        const strExperienceID = uuidv4()

        dbMain.run('INSERT INTO tblExperience VALUES(?,?,?)',[strExperienceID,strExperience,strDescription],err=>{
            if(err){
                res.status(500).json({status:"error",message:"could not add skill"})
                console.error(e)
            }else{
                res.status(201).json({status:"success",message:"added skill to database", recordID:strExperienceID})
            }
        })
    }catch(e){
        res.status(500).json({status:"error",message:"could not add skill"})
        console.error(e)
    }
})

app.get("/api/skills",(req,res)=>{
    try{
        dbMain.all("SELECT * FROM tblSkills",[],(err,rows)=>{
            if(err){
                res.status(500).json({status:"error",message:"could not retrieve information"})
            }else{
                res.status(200).json({status:"success",rows:rows})
            }
        })
    }catch(err){
        res.status(500).json({status:"error",message:"could not retrieve information"})
    }
})

app.get("/api/credentials",(req,res)=>{
    try{
        dbMain.all("SELECT * FROM tblCredentials",[],(err,rows)=>{
            if(err){
                res.status(500).json({status:"error",message:"could not retrieve information"})
            }else{
                res.status(200).json({status:"success",rows:rows})
            }
        })
    }catch(err){
        res.status(500).json({status:"error",message:"could not retrieve information"})
    }
})

app.get("/api/experience",(req,res)=>{
    try{
        dbMain.all("SELECT * FROM tblExperience",[],(err,rows)=>{
            if(err){
                res.status(500).json({status:"error",message:"could not retrieve information"})
            }else{
                res.status(200).json({status:"success",rows:rows})
            }
        })
    }catch(err){
        res.status(500).json({status:"error",message:"could not retrieve information"})
    }
})

app.post("/api/jobs",(req,res)=>{
    try{
        const strJobID = uuidv4()
        const strJobName = req.body.jobName
        const strJobDescription = req.body.jobDescription
        dbMain.run("INSERT INTO tblJobs VALUES (?,?,?)",[strJobID,strJobName,strJobDescription],err=>{
            if(err){
                res.status(500).json({status:"error",message:"could not create job"})
            }else{
                res.status(201).json({status:"success", message:"succesfully retrieved jobs", jobID:strJobID})
            }
        })
    }catch(err){
        res.status(500).json({status:"error",message:"could not create job"})
    }
})

app.get("/api/jobs",(req,res)=>{
    try{
        dbMain.all("SELECT * FROM tblJobs",[],(err,rows)=>{
            if(err){
                res.status(500).json({status:"error",message:"could not retrieve information"})
            }else{
                res.status(200).json({status:"success",rows:rows})
            }
        })
    }catch(err){
        res.status(500).json({status:"error",message:"could not retrieve jobs"})
    }
})
