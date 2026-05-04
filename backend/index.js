const express = require("express")
const {v4:uuidv4} = require("uuid")
const cors = require("cors")
const sqlite3 = require("sqlite3")
const {GoogleGenAI} = require("@google/genai")
const path = require("path")

//Database setup
const dbMain = new sqlite3.Database('main.db',err=>{
    if(err){
        console.error("ERROR:   Could not open connection to database")
        console.error(err)
    }else{
        console.log("SUCCESS:   Connected to database")
    }
})

// Initialize the tables incase they wern't before
dbMain.run(`
    CREATE TABLE IF NOT EXISTS "tblSkills" (
	"skill_id"	TEXT NOT NULL,
	"skill_name"	TEXT NOT NULL,
	"skill_description"	TEXT NOT NULL,
	PRIMARY KEY("skill_id")
);

CREATE TABLE IF NOT EXISTS "tblCredentials" (
	"credential_id"	TEXT NOT NULL,
	"credential_name"	TEXT NOT NULL,
	"credential_description"	TEXT NOT NULL,
	PRIMARY KEY("credential_id")
);

CREATE TABLE IF NOT EXISTS "tblExperience" (
	"experience_id"	TEXT NOT NULL,
	"experience_name"	TEXT NOT NULL,
	"experience_description"	TEXT NOT NULL,
	PRIMARY KEY("experience_id")
);

CREATE TABLE IF NOT EXISTS tblJobs(
	"job_id" TEXT NOT NULL,
	"job_title" TEXT NOT NULL,
	"job_description" TEXT NOT NULL,
	PRIMARY KEY("job_id")
)`,err=>{
    if(err){
        console.log("ERROR:    Could not initialize tables")
        console.error(err)
    }else{
        console.log("SUCCESS:   Initialized Tables")
    }
})

//AI Setup
const GEMINI_MODEL = "gemma-3-1b-it"
let ai = new GoogleGenAI({}) // I know let is unconventional here, but it lets me change the API key so I don't really care.

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

// Creates a new skill in the database
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

//Creates a new credential in the database
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

//Creates a new experience in the database
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

//Gets all skills
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

//Gets all credentials
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

//Gets all experiences
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

//Deletes a skill based on id
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

//Deletes an experience based on id
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

//Deletes a credential based on id
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

//Updates a skill based on id
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

//Updates an experience based on id
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

//Updates a credential based on id
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

//Creates a new job
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

//Gets all jobs
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

//Deletes a job from the database
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

//Gives AI suggestions for a skill by id
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

//Gives AI suggestions for a credential by id
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

//Gives AI suggestions for an experience by id
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

// Generates an objective statement when given skills and job description
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

// Sets the API key
app.put("/api/ai-suggestions/set-api-key",(req,res)=>{
    try{
        const strNewAPIKey = req.body.apiKey
        ai = new GoogleGenAI({apiKey:strNewAPIKey})
        res.status(200).json({status:"success",message:"Successfully updated API key"})
    }catch(err){
        res.status(500).json({status:"error",message:"Could not chage API keys"})
    }
})