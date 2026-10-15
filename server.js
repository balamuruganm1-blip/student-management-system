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


 --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- 
Experiment: Student Registration using AngularJS
1. Aim
To develop a Student Registration application using AngularJS to add student details and display them in a table.
2. Software Requirements
Operating System: Windows
Editor: Visual Studio Code
Browser: Google Chrome
Technology: HTML, CSS, AngularJS
3. Procedure
Open Visual Studio Code and create a new HTML file named student.html.
Create a student registration form with Name and Department fields.
Apply CSS to style the form and table.
Include the AngularJS library in the HTML file.
Use ng-model to collect student details.
Use ng-submit to call the add() function.
Use students.push() to add student details to the array.
Use ng-repeat to display student details in a table.
Save the file and open it in Google Chrome.
Enter student details and click Add Student to display them in the table.
4. Program

<!DOCTYPE html>
<html ng-app="myApp">
<head>
<title>Student Registration</title>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
<style>
body{font-family:Arial;background:#eaf2ff;padding:30px}
.box{background:white;padding:20px;border-radius:10px}
input,button{padding:10px;margin:5px}
button{background:blue;color:white;border:0}
table{width:100%;margin-top:20px;border-collapse:collapse}
th,td{padding:10px;border:1px solid #ccc}
</style>
</head>
<body ng-controller="myCtrl">
<div class="box">
<h2>Student Registration</h2>
<form ng-submit="add()">
<input ng-model="name" placeholder="Enter Name" required>
<input ng-model="dept" placeholder="Department" required>
<button type="submit">Add Student</button>
</form>
<table>
<tr><th>Name</th><th>Department</th></tr>
<tr ng-repeat="s in students">
<td>{{s.name}}</td>
<td>{{s.dept}}</td>
</tr>
</table>
</div>
<script>
var app=angular.module("myApp",[]);
app.controller("myCtrl",function($scope){
$scope.students=[];
$scope.add=function(){
$scope.students.push({name:$scope.name,dept:$scope.dept});
$scope.name="";
$scope.dept="";
};
});
</script>
</body>
</html>

----------------------------------------------------------------------------------------------------------------------------------------------------



Selenium WebDriver Practical
Experiment: Automate Google Search using Selenium WebDriver.

1. Aim
To automate a web browser using Selenium WebDriver and verify the title of a web page.

2. Software requirements
Java JDK
Eclipse IDE or VS Code
Google Chrome
Selenium WebDriver library
ChromeDriver, if required by the Selenium setup

3. Procedure
Open Eclipse IDE and create a Java project named SeleniumLab.
Add the Selenium WebDriver library to the project.
Create a Java class named SeleniumTest.
Import WebDriver and ChromeDriver packages.
Create a Chrome browser object using new ChromeDriver().
Open a website using driver.get().
Get the page title using driver.getTitle().
Display the title and close the browser using driver.quit().

4. Program
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
public class SeleniumTest {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://www.selenium.dev");
        System.out.println("Title: " + driver.getTitle());
        driver.quit();
    }
}
This follows the basic Java WebDriver pattern in Selenium's official documentation. 
Selenium
+1
5. How to execute
Selenium library project-la add pannirukkanum.
Java file-ah save pannu.
SeleniumTest.java-la right-click panni Run As → Java Application select pannu.
Chrome browser open aagum.
Selenium website load aagum; title console-la print aagum.
Browser close aagum.
Sample Output
Title: Selenium
Browser opens, loads the page, and closes automatically.
6. Result
Thus, the website was successfully opened and its title was verified using Selenium WebDriver.


------------------------------------------------------------------------------------------------------------------------------------------------------------

  XML DTD Practical
Experiment: Create and validate an XML document using DTD.

1. Aim
To create an XML document for student details and validate it using a Document Type Definition (DTD).

2. Software requirements
Visual Studio Code / Notepad
Web browser or XML validator

3. Procedure
Open VS Code and create a file named student.xml.
Define the student details using XML tags.
Create a DTD file named student.dtd.
Define the permitted elements and their order in the DTD.
Link the DTD file to the XML document.
Save both files in the same folder.
Validate the XML document using an XML validator.

4. Program 1 — student.xml

<?xml version="1.0"?>
<!DOCTYPE student SYSTEM "student.dtd">

<student>
    <name>Bala</name>
    <department>IT</department>
    <age>20</age>
</student>

5. Program 2 — student.dtd

<!ELEMENT student (name, department, age)>
<!ELEMENT name (#PCDATA)>
<!ELEMENT department (#PCDATA)>
<!ELEMENT age (#PCDATA)>

Step 1: Open the terminal
In VS Code, click Terminal → New Terminal.
Step 2: Install the library
Run this command once:
python -m pip install lxml
Step 3: Check XML syntax
python -c "import xml.etree.ElementTree as E; E.parse('student.xml'); print('XML syntax is correct')"
Expected output:
XML syntax is correct
This checks XML syntax only, not DTD validity.
Step 4: Validate XML against DTD
Run this command:
python -c "from lxml import etree; parser=etree.XMLParser(dtd_validation=True); etree.parse('student.xml', parser); print('DTD validation successful - XML is valid')"
Expected output:
DTD validation successful - XML is valid
Important: Both files must be saved in the same folder, and the filenames must match exactly.
7. Sample Output
XML syntax is correct
DTD validation successful - XML is valid
8. Result
Thus, an XML document containing student details was created and successfully validated against a DTD.
