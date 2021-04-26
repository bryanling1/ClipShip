import Project from '../project';

const clips = [
    {
        "id": "3",
        "url": "https://clips.twitch.tv/embed?clip=AmazonianEncouragingLyrebirdAllenHuhu&tt_medium=clips_api&tt_content=embed",
        "start": 6.52,
        "end": 25.24,
        "length": 32.000333,
        "label": false,
        "labelContent": null,
        "labelPosition": 0,
        "labelGlobalPosition": null,
        "thumbnailUrl": "https://ytexpert.net/wp-content/uploads/2019/11/How-To-Make-An-Eye-Catching-Thumbnail-For-More-Clicks-862x485.jpg",
        "title": "Clip Title Editing",
        "broadcaster": "TheBroadcasterGuy",
        "labelGlobal": false
      },
      {
        "id": "1",
        "url": "https://clips.twitch.tv/embed?clip=AmazonianEncouragingLyrebirdAllenHuhu&tt_medium=clips_api&tt_content=embed",
        "start": 10,
        "end": 32.000333,
        "length": 32.000333,
        "label": true,
        "labelContent": null,
        "labelPosition": 0,
        "labelGlobalPosition": null,
        "thumbnailUrl": "https://ytexpert.net/wp-content/uploads/2019/11/How-To-Make-An-Eye-Catching-Thumbnail-For-More-Clicks-862x485.jpg",
        "title": "Clip Title Editing",
        "broadcaster": "TheBroadcasterGuy",
        "labelGlobal": false
      },
]

describe('Project mongoose model', ()=>{
    it('saves a new project', async ()=>{
        const project = Project.build({name: 'project name'});
        await project.save();
        expect(project.isNew).toEqual(false);
    })

    it('updates the name of a project', async ()=>{
        const project = Project.build({name: 'project name'});
        await project.save();
        await Project.updateProject(project._id, {name:'some other name'});
        const project2 = await Project.findOne({_id: project._id})
        expect(project2 && project2.name).toEqual('some other name');
    })

    it('gets a project by id', async ()=>{
        const project = Project.build({name: 'project name'});
        await project.save();
        const project2 = await Project.getProject(project._id);
        expect(project2 && project2.name).toEqual('project name');
    })

    it('sets a projects clips', async ()=>{
        const project = Project.build({name: 'project name'});
        await project.save();
        await Project.setClips(project._id, clips);
        const project2 = await Project.getProject(project.id);
        expect(project2 && project2.clips.length === 2).toEqual(true);
    })

    it('sets a projects clips', async ()=>{
        const project = Project.build({name: 'project name'});
        await project.save();
        await Project.deleteProject(project.id);
        const project2 = await Project.findById(project.id);
        expect(!project2).toEqual(true);
    })
})