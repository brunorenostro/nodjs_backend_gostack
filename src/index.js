const express= require('express');
const { uuid, isUuid} = require('uuidv4');
const { json } = require('express');

const app=express();

app.use(express.json());

const projects=[];

function logRequests(request,response, next){

const { method, url }=request;

const logLabel=`[${method.toUpperCase()}] ${url}`;
console.time(logLabel);

next();

console.timeEnd(logLabel);
}

function validadeProjectId(request, response, next){

    const {id}=request.params;

    if(!isUuid(id)){
        return response.status(400).json({error:"Invalid project Id."});
    }

    return next();

}


app.use(logRequests);
app.use('projects/:id',validadeProjectId);


app.get('/projects',logRequests,  (request, response)=>{

    const {title}=request.query;
    const result= title ? projects.filter(project => project.title.includes(title)) : projects;
return response.json(result);

});

app.post('/projects',(request,response)=>{

const {title,owner}=request.body;
const project= {id:uuid(),title , owner} 

projects.push(project);
return response.json(project);    
});

app.put('/projects/:id',(request,response)=>{

const {id}=request.params;
const{title, owner}=request.body;
const projectIndex=projects.findIndex(project => project.id===id);

const project={
id,
title,
owner
};

projects[projectIndex]=project;
return response.json(project);
if(projectIndex < 0){
    return response.status(400).json({error:"Project not found"});
}


    return response.json([
 
        'projeto 2',
        'projeto 3',
        'projeto 4'
    ])   
});

app.delete('/projects/:id',(request,response)=>{
const {id}=request.params;

const projectIndex=projects.findIndex(project => project.id===id);
projects.splice(projectIndex,1);

if(projectIndex < 0){
    return response.status(400).json({error: "project not found"});
}
else return response.status(204).json({});
   
});

app.listen(3333,()=>{

console.log("backend started");    
});