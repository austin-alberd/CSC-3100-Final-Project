CREATE TABLE "tblSkills" (
	"skill_id"	TEXT NOT NULL,
	"skill_name"	TEXT NOT NULL,
	"skill_description"	TEXT NOT NULL,
	PRIMARY KEY("skill_id")
);

CREATE TABLE "tblCredentials" (
	"credential_id"	TEXT NOT NULL,
	"credential_name"	TEXT NOT NULL,
	"credential_description"	TEXT NOT NULL,
	PRIMARY KEY("credential_id")
);

CREATE TABLE "tblExperience" (
	"experience_id"	TEXT NOT NULL,
	"experience_name"	TEXT NOT NULL,
	"experience_description"	TEXT NOT NULL,
	PRIMARY KEY("experience_id")
);

CREATE TABLE tblJobs(
	"job_id" TEXT NOT NULL,
	"job_title" TEXT NOT NULL,
	"job_description" TEXT NOT NULL,
	PRIMARY KEY("job_id")
)