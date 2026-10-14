Experiment: Student Management System using Node.js and MongoDB
1. Aim
To develop a Student Management System using Node.js, Express.js, and MongoDB to perform CRUD operations such as creating, reading, updating, and deleting student records.

2. Software Requirements
Operating System: Windows
Editor: Visual Studio Code
Runtime: Node.js
Backend framework: Express.js
Database: MongoDB
ODM library: Mongoose
Terminal: PowerShell

3. Procedure
Check Node.js, npm, and MongoDB Server installation.
Locate and test the MongoDB Shell executable.
Start MongoDB Server.
Create a project directory named StudentLab.
Initialize the Node.js project.
Install Express.js and Mongoose.
Create the server.js file and define the student schema.
Connect the application to MongoDB.
Implement POST, GET, PUT, and DELETE API endpoints.
Execute the server and test all CRUD operations.
Verify the database records and note the output.

4. Full terminal commands
Step 1: Check Node.js and npm
               node -v
               npm -v
Expected versions on your computer:
v20.18.0
10.8.2
Step 2: Check MongoDB Server
              Get-Service MongoDB
If the status is Running, continue. If it is Stopped, run:
              Start-Service MongoDB
Step 3: Locate MongoDB Shell
Un system-la MongoDB Shell install location registry-la confirm pannirukkom:
C:\Users\BALAMURUGAN\AppData\Local\Programs\mongosh\
Exact executable path kandupidikka:
              Get-ChildItem "$env:LOCALAPPDATA\Programs\mongosh" -Filter mongosh.exe -Recurse -ErrorAction SilentlyContinue | Select-Object -ExpandProperty FullName
Version test:
              & "$env:LOCALAPPDATA\Programs\mongosh\mongosh.exe" --version
Shell open panna:
              & "$env:LOCALAPPDATA\Programs\mongosh\mongosh.exe"
Shell prompt-la execute pannu:
              db.runCommand({ ping: 1 })
Expected output:
{ ok: 1 }
Shell-la irundhu veliya vara:
              exit
Note: Executable path different-ah irundha, Step 3-la kidaicha actual path use pannu.

5. Create Node.js project
PowerShell-la:
              cd $env:USERPROFILE
              mkdir StudentLab
              cd StudentLab
              npm init -y
              npm install express mongoose
StudentLab folder already irundha mkdir StudentLab skip pannu.

6. Create server.js
VS Code-la File → Open Folder → C:\Users\BALAMURUGAN\StudentLab select pannu. New File click panni server.js create pannu.
Keela irukkura full code paste panni save pannu.
  
const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("MongoDB Error:", err.message));
// Student schema
const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    department: { type: String, required: true },
    age: { type: Number, required: true }
});
const Student = mongoose.model("Student", studentSchema);
// CREATE - Insert student
app.post("/students", async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(201).json(student);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});
// READ - Display students
app.get("/students", async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// UPDATE - Update student
app.put("/students/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json(student);
    } catch (err) {
        res.status(400).json({
            error: "Invalid student ID or input"
        });
    }
});
// DELETE - Delete student
app.delete("/students/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json({
            message: "Student deleted successfully"
        });
    } catch (err) {
        res.status(400).json({ error: "Invalid student ID" });
    }
});
// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});

7. Run the application
VS Code terminal-la, StudentLab folder-kulla irundhu:
            node server.js

Expected output:
Server running on port 3000
MongoDB Connected
Server running-a irukkura terminal-ah close pannadha. API testing-ku Terminal → New Terminal use pannu.

8. Test CRUD operations
A. Create — POST
$body = @{
    name = "Bala"
    department = "IT"
    age = 19
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/students" -Method Post -ContentType "application/json" -Body $body

Expected output: student details and generated _id.

B. Read — GET
Invoke-RestMethod -Uri "http://localhost:3000/students" -Method Get

Expected output:
name       : Bala
department : IT
age        : 19
_id        : <generated MongoDB ID>
C. Update — PUT
GET output-la irukkura actual _id copy panni:

$id = "PASTE_ACTUAL_ID_HERE"

Age update panna:

$body = @{
    age = 20
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/students/$id" -Method Put -ContentType "application/json" -Body $body

D. Delete — DELETE
Invoke-RestMethod -Uri "http://localhost:3000/students/$id" -Method Delete

Expected output:
message
-------
Student deleted successfully
Verify deletion:
Invoke-RestMethod -Uri "http://localhost:3000/students" -Method Get
Delete pannina student record list-la irukkaadhu.

9. Result
The Student Management System was successfully developed using Node.js, Express.js, and MongoDB. The application was tested to perform create, read, update, and delete operations on student records.

10. Viva questions
Question
Answer
What is Node.js? JavaScript runtime environment.
What is MongoDB? NoSQL document database.
What is Express.js? A framework for building Node.js web applications and APIs.
What is Mongoose? An ODM library for MongoDB.
What is CRUD? Create, Read, Update, Delete.
What is POST? Creates a new record.
What is GET? Retrieves records.
What is PUT? Updates an existing record.
What is DELETE? Removes a record.
What is port 3000? The port used by the application server.
