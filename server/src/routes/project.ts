import express from 'express';
import Project from '../models/project';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/projects', async (req, res)=>{
    let projects = await Project.find({}).catch((err)=>console.log(err))
    res.send(projects);
})

router.get('/project/clips', async (req, res, next)=>{
    if(!mongoose.Types.ObjectId.isValid(req.query.id as string)){
        return next(new Error('Bad id'));
    }
    const {id} = req.query;
    const project = await Project.getProject(id as string);
    res.send(project.clips);
})

router.post('/project', async (req, res, next)=>{
    if(!mongoose.Types.ObjectId.isValid(req.body.name as string)){
        return next(new Error('Bad id'));
    }
    const {name} = req.body;
    const project = Project.build({name: name as string});
    await project.save();
    res.send(project.id);
})

router.patch('/project', async (req, res, next)=>{
    const {id, clips, name} = req.body;
    let project;
    if(name){
        project = await Project.updateProject(id, {name})
    }
    if(clips){
        project = await Project.setClips(id, clips);
    }
    res.send(project);
})

router.delete('/project', async (req, res, next)=>{
    if(!mongoose.Types.ObjectId.isValid(req.query.id as string)){
        return next(new Error('Bad id'));
    }
    const {id} = req.query;
    const project = await Project.deleteProject(id as string);
    res.send(id);
})

export {router as projectRouter}