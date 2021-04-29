import Project from '../models/project';
import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/projects', async (req, res) => {
  const projects = await Project.find({}).catch((err) => console.log(err));
  res.send(projects);
});

router.get('/project', async (req, res) => {
  const { id } = req.query;
  const project = await Project.findById(id).catch((err) => console.log(err));
  res.send(project);
});

router.get('/project/clips', async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.query.id as string)) {
    return next(new Error('Bad id'));
  }
  const { id } = req.query;
  const project = await Project.getProject(id as string);
  res.send(project.clips);
});

router.post('/project', async (req, res, next) => {
  const { name } = req.body;
  const project = Project.build({ name: name as string });
  await project.save();
  res.send({ id: project.id, name: project.name });
});

router.patch('/project', async (req, res, next) => {
  const { id, clips, name } = req.body;
  if (name) {
    await Project.updateProject(id, { name });
  }
  if (clips) {
    await Project.setClips(id, clips);
  }
  const new_project = await Project.getProject(id);
  res.send(new_project);
});

router.delete('/project', async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.query.id as string)) {
    return next(new Error('Bad id'));
  }
  const { id } = req.query;
  await Project.deleteProject(id as string);
  res.send(id);
});

export { router as projectRouter };
