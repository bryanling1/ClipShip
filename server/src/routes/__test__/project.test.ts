import Project from '../../models/project';
import app from '../../app';
import request from 'supertest';

const clips = [
  {
    id: '3',
    url:
      'https://clips.twitch.tv/embed?clip=AmazonianEncouragingLyrebirdAllenHuhu&tt_medium=clips_api&tt_content=embed',
    start: 6.52,
    end: 25.24,
    duration: 32.000333,
    label: false,
    labelContent: null,
    labelPosition: 0,
    labelGlobalPosition: null,
    thumbnailUrl:
      'https://ytexpert.net/wp-content/uploads/2019/11/How-To-Make-An-Eye-Catching-Thumbnail-For-More-Clicks-862x485.jpg',
    title: 'Clip Title Editing',
    broadcaster: 'TheBroadcasterGuy',
    labelGlobal: false,
  },
  {
    id: '1',
    url:
      'https://clips.twitch.tv/embed?clip=AmazonianEncouragingLyrebirdAllenHuhu&tt_medium=clips_api&tt_content=embed',
    start: 10,
    end: 32.000333,
    duration: 32.000333,
    label: true,
    labelContent: null,
    labelPosition: 0,
    labelGlobalPosition: null,
    thumbnailUrl:
      'https://ytexpert.net/wp-content/uploads/2019/11/How-To-Make-An-Eye-Catching-Thumbnail-For-More-Clicks-862x485.jpg',
    title: 'Clip Title Editing',
    broadcaster: 'TheBroadcasterGuy',
    labelGlobal: false,
  },
];

describe('Project Routes', () => {
  it('returns a 200 when fetching projects', async () => {
    return request(app).get('/projects').expect(200);
  });

  it('gets a list of projects', async () => {
    const project = await Project.build({ name: 'MyProject' });
    await project.save();
    const res = await request(app).get('/projects');
    expect(res.body.length).toEqual(1);
    expect(res.body[0].name).toEqual('MyProject');
    expect(res.body[0].id).toEqual(project.id);
  });

  it('gets a project', async () => {
    const project = await Project.build({ name: 'MyProject' });
    await project.save();
    const res = await request(app).get(`/project?id=${project.id}`).expect(200);
    expect(res.body.name).toEqual('MyProject');
    expect(res.body.id).toEqual(project.id);
  });

  it('gets projects clips', async () => {
    const project = await Project.build({ name: 'MyProject' });
    project.clips.push(clips[0]);
    project.clips.push(clips[1]);
    await project.save();
    const res = await request(app).get(`/project/clips?id=${project.id}`);
    expect(res.body.length).toEqual(2);
  });

  it('throws error when getting project clips with bad id', async () => {
    await request(app).get(`/project/clips?id=badid`).expect(400);
  });

  it('patches project clips', async () => {
    const project = await Project.build({ name: 'MyProject' });
    await project.save();
    await request(app).patch(`/project`).send({ id: project.id, clips }).expect(200);
    const project_result = await Project.getProject(project.id);
    expect(project_result && project_result.clips.length === 2).toEqual(true);
    expect(project_result && project_result.clips[0].start === 6.52).toEqual(true);
  });

  it('patches project name', async () => {
    const project = await Project.build({ name: 'MyProject' });
    await project.save();
    await request(app)
      .patch(`/project`)
      .send({ id: project.id, name: 'NewProjectName' })
      .expect(200);
    const project_result = await Project.getProject(project.id);
    expect(project_result && project_result.name === 'NewProjectName').toEqual(true);
  });

  it('deletes a project', async () => {
    const project = await Project.build({ name: 'MyProject' });
    await project.save();
    await request(app).delete(`/project?id=${project.id}`).expect(200);
    const project_result = await Project.getProject(project.id);
    expect(!project_result).toEqual(true);
  });

  it('returns an error with deleting a project with a bad id', async () => {
    await request(app).delete(`/project?id=badid`).expect(400);
  });

  it('Creates a project', async () => {
    const response = await request(app).post(`/project`).send({ name: 'PROJECT_NAME' }).expect(200);
    const project_result = await Project.getProject(JSON.parse(response.text).id);
    expect(Object.keys(project_result).length > 0).toEqual(true);
  });
});
