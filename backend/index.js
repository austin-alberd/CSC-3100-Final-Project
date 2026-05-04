const express = require("express")
const {v4:uuidv4} = require("uuid")
const cors = require("cors")
const sqlite3 = require("sqlite3")
const {GoogleGenAI} = require("@google/genai")

//Database setup
const dbMain = new sqlite3.Database('main.db',err=>{
    if(err){
        console.error("ERROR:   Could not open connection to database")
        console.error(err)
    }else{
        console.log("SUCCESS:   Connected to database")
    }
})

//AI Setup
const GEMINI_API_KEY= process.env.GEMINI_API_KEY
const GEMINI_MODEL = "gemma-3-1b-it"

const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY})

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


app.delete("/api/skills/:id",(req,res)=>{
    try{
        const strDeleteID = req.params.id
        dbMain.run("DELETE FROM tblSkills WHERE skill_id = ?",[strDeleteID],err=>{
            if(err){
                res.status(500).json({status:"error",message:"could not delete record"})
            }else{
                res.status(200).json({status:"success",deletedID:strDeleteID})
            }
        })
    }catch(err){
        res.status(500).json({status:"error",message:"could not remove skill"})
    }
})

app.delete("/api/experience/:id",(req,res)=>{
    try{
        const strDeleteID = req.params.id
        dbMain.run("DELETE FROM tblExperience WHERE experience_id = ?",[strDeleteID],err=>{
            if(err){
                res.status(500).json({status:"error",message:"could not delete record"})
            }else{
                res.status(200).json({status:"success",deletedID:strDeleteID})
            }
        })
    }catch(err){
        res.status(500).json({status:"error",message:"could not remove experience"})
    }
})

app.delete("/api/credentials/:id",(req,res)=>{
    try{
        const strDeleteID = req.params.id
        dbMain.run("DELETE FROM tblCredentials WHERE credential_id = ?",[strDeleteID],err=>{
            if(err){
                res.status(500).json({status:"error",message:"could not delete record"})
            }else{
                res.status(200).json({status:"success",deletedID:strDeleteID})
            }
        })
    }catch(err){
        res.status(500).json({status:"error",message:"could not remove credential"})
    }
})

app.put("/api/skills/:id",(req,res)=>{
    try{
        const strUpdateID = req.params.id
        const strNewDescription = req.body.description
        dbMain.run("UPDATE tblSkills SET skill_description=? WHERE skill_id=?",[strNewDescription,strUpdateID],err=>{
            if(err){
                res.status(500).json({status:"error",message:"could not update record"})
            }else{
                res.status(200).json({status:"success",updatedID:strUpdateID})
            }
        })
    }catch(err){
        res.status(500).json({status:"error",message:"could not update record"})
    }
})

app.put("/api/experience/:id",(req,res)=>{
    try{
        const strUpdateID = req.params.id
        const strNewDescription = req.body.description
        dbMain.run("UPDATE tblExperience SET experience_description=? WHERE experience_id=?",[strNewDescription,strUpdateID],err=>{
            if(err){
                res.status(500).json({status:"error",message:"could not update record"})
            }else{
                res.status(200).json({status:"success",updatedID:strUpdateID})
            }
        })
    }catch(err){
        res.status(500).json({status:"error",message:"could not update record"})
    }
})

app.put("/api/credentials/:id",(req,res)=>{
    try{
        const strUpdateID = req.params.id
        const strNewDescription = req.body.description
        dbMain.run("UPDATE tblCredentials SET credential_description=? WHERE credential_id=?",[strNewDescription,strUpdateID],err=>{
            if(err){
                res.status(500).json({status:"error",message:"could not update record"})
            }else{
                res.status(200).json({status:"success",updatedID:strUpdateID})
            }
        })
    }catch(err){
        res.status(500).json({status:"error",message:"could not update record"})
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
                res.status(201).json({status:"success", message:"succesfully created job", jobID:strJobID})
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

app.delete("/api/jobs/:id",(req,res)=>{
    try{
        const strDeleteID = req.params.id
        dbMain.run("DELETE FROM tblJobs WHERE job_id = ?",[strDeleteID],err=>{
            if(err){
                res.status(500).json({status:"error",message:"could not delete job"})
            }else{
                res.status(200).json({status:"success",message:"successfully deleted job",deletedID:strDeleteID})
            }
        })
    }catch(err){
        res.status(500).json({status:"error",message:"could not delete job"})
    }
})

app.get("/api/ai-suggestions/skills/:id",async (req,res)=>{
    try{
        const strLookupID = req.params.id
        dbMain.all("SELECT * FROM tblSkills WHERE skill_id = ?",[strLookupID], async (err,rows)=>{
            if(err){
                res.status(500).json({status:"error",message:"could not provide AI suggestions"})
            }else{
                const objFeedbackRow = rows[0]
                ai.models.generateContent({
                    model:GEMINI_MODEL,
                    contents:`
                        You are a helpful resume coach. Provide feedback on these resume items given the name and description. DO NOT FOCUS ON FORMAT. Your output MUST be just your feedback NO MARKDOWN.
                        Name:${objFeedbackRow["skill_name"]}
                        Description:${objFeedbackRow["skill_description"]}
                    `
                }).then(response=>{
                    res.status(200).json({status:"success",message:"Generated feedback",feedback:response.text})
                })
            }
            
        })
    }catch(err){
        res.status(500).json({status:"error",message:"could not provide AI suggestions"})
    }
})

app.get("/api/ai-suggestions/credentials/:id",async (req,res)=>{
    try{
        const strLookupID = req.params.id
        dbMain.all("SELECT * FROM tblCredentials WHERE credential_id = ?",[strLookupID], async (err,rows)=>{
            if(err){
                res.status(500).json({status:"error",message:"could not provide AI suggestions"})
            }else{
                const objFeedbackRow = rows[0]
                ai.models.generateContent({
                    model:GEMINI_MODEL,
                    contents:`
                        You are a helpful resume coach. Provide feedback on these resume items given the name and description. DO NOT FOCUS ON FORMAT. Your output MUST be just your feedback NO MARKDOWN.
                        Name:${objFeedbackRow["credential_name"]}
                        Description:${objFeedbackRow["credential_description"]}
                    `
                }).then(response=>{
                    res.status(200).json({status:"success",message:"Generated feedback",feedback:response.text})
                })
            }
            
        })
    }catch(err){
        res.status(500).json({status:"error",message:"could not provide AI suggestions"})
    }
})

app.get("/api/ai-suggestions/experience/:id",async (req,res)=>{
    try{
        const strLookupID = req.params.id
        dbMain.all("SELECT * FROM tblExperience WHERE experience_id = ?",[strLookupID], async (err,rows)=>{
            if(err){
                res.status(500).json({status:"error",message:"could not provide AI suggestions"})
            }else{
                const objFeedbackRow = rows[0]
                ai.models.generateContent({
                    model:GEMINI_MODEL,
                    contents:`
                        You are a helpful resume coach. Provide feedback on these resume items given the name and description. DO NOT FOCUS ON FORMAT. Your output MUST be just your feedback NO MARKDOWN.
                        Name:${objFeedbackRow["experience_name"]}
                        Description:${objFeedbackRow["experience_description"]}
                    `
                }).then(response=>{
                    res.status(200).json({status:"success",message:"Generated feedback",feedback:response.text})
                })
            }
            
        })
    }catch(err){
        res.status(500).json({status:"error",message:"could not provide AI suggestions"})
    }
})

app.post("/api/ai-suggestions/objective-statement",async (req,res)=>{
    try{
        const strJob=req.body.job
        const strQualificationsArray = req.body.qualifications
        ai.models.generateContent({
            model:GEMINI_MODEL,
            contents:`
               You are a resume coach write an objective statement based on the provided job and skills, experience, and credentials. It needs to be 3 to 5 sentences long. DO NOT USE "this candidate" or anything like it DO NOT USE THE FIRST PERSON OR ANY POINT OF VEIW.Follow the output example.ONLY OUTPUT THE OBJECTIVE STATEMENT. NO MARKDOWN. NO SUGGESTIONS
               Output Example:
               Results-driven leader and Eagle Scout seeking the CTO position at Austin Inc to leverage extensive experience in risk management, donor relations, and high-volume technical production to drive innovation and support organizational growth.
               Job:${strJob}
               Skills,Experience,Credentials:${strQualificationsArray}
            `
        }).then(response=>{
            res.status(200).json({status:"success",message:"Generated objective statement",objectiveStatement:response.text})
        })
    }catch(err){
        res.status(500).json({status:"error",message:"could not provide AI suggestions"})
    }
})