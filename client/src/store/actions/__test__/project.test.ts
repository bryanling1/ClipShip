import { Clip } from '@clipship/common';
import { Actions as ClipActions } from '../types';
import { Middleware } from 'redux';
import {
  createProject,
  deleteProject,
  editName,
  fetchProject,
  saveProject,
  setDBClips,
  setName,
  setProject,
  setProjectError,
  setSelectedClip,
} from '../project';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const ProjectActions = ClipActions;

const middlewares: Middleware[] = [thunk];
const mockStore = configureMockStore(middlewares);

const mock = new MockAdapter(axios);

const clip: Clip = {
  id: '1',
  url:
    'https://clips.twitch.tv/embed?clip=AmazonianEncouragingLyrebirdAllenHuhu&tt_medium=clips_api&tt_content=embed',
  start: 0,
  end: 32.000333,
  duration: 32.000333,
  label: false,
  labelContent: null,
  labelPosition: null,
  labelGlobalPosition: null,
  thumbnailUrl:
    'https://ytexpert.net/wp-content/uploads/2019/11/How-To-Make-An-Eye-Catching-Thumbnail-For-More-Clicks-862x485.jpg',
  title: 'Clip Title Editing',
  broadcaster: 'TheBroadcasterGuy',
  labelGlobal: false,
};

describe('Project action creators', () => {
  afterEach(() => {
    mock.reset();
  });
  it('generates an action creator for setting the project', () => {
    const expectedState = {
      type: ProjectActions.SET_PROJECT,
      payload: {
        id: '123',
        name: 'project_name',
      },
    };
    expect(setProject(expectedState.payload.id, expectedState.payload.name)).toEqual(expectedState);
  });
  it('generates an action creator for setting the project error', () => {
    const expectedState = {
      type: ProjectActions.SET_PROJECT_ERROR,
      val: true,
    };
    expect(setProjectError(true)).toEqual(expectedState);
  });
  it('generates an action create for setting the selected clip', () => {
    const expectedState = {
      type: ProjectActions.SET_PROJECT_SELECTED_CLIP,
      index: 0,
    };
    expect(setSelectedClip(0)).toEqual(expectedState);
  });
  it('creates SET_PROJECT, SET_CLIPS, SET_PROJECT_ERROR, SET_PROJECT_SELECTED_CLIP, SET_DB_CLIPS when fetching project has been done and there are clips', () => {
    mock
      .onGet('http://localhost:5000/project?id=project_id_1')
      .reply(200, { id: 'project_id_1', name: 'my_project_name', clips: [clip] });

    const expectedActions = [
      {
        type: ProjectActions.SET_PROJECT,
        payload: { id: 'project_id_1', name: 'my_project_name' },
      },
      { type: ProjectActions.SET_PROJECT_ERROR, val: false },
      { type: ProjectActions.SET_PROJECT_SELECTED_CLIP, index: 0 },
      { type: ClipActions.SET_CLIPS, clips: [clip] },
      { type: ProjectActions.SET_DB_CLIPS, clips: [clip] },
    ];

    const store = mockStore({ clips: [], project: { name: null, error: null, id: null } });

    return store.dispatch<any>(fetchProject('project_id_1')).then(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });

  it('creates SET_PROJECT, SET_CLIPS, SET_PROJECT_ERROR, and SET_PROJECT_SELECTED_CLIP when fetching project has been done and there are no clips', () => {
    mock
      .onGet('http://localhost:5000/project?id=project_id_1')
      .reply(200, { id: 'project_id_1', name: 'my_project_name', clips: null });

    const expectedActions = [
      {
        type: ProjectActions.SET_PROJECT,
        payload: { id: 'project_id_1', name: 'my_project_name' },
      },
      { type: ProjectActions.SET_PROJECT_ERROR, val: false },
      { type: ProjectActions.SET_PROJECT_SELECTED_CLIP, index: null },
      { type: ClipActions.SET_CLIPS, clips: [] },
      { type: ProjectActions.SET_DB_CLIPS, clips: [] },
    ];

    const store = mockStore({ clips: [], project: { name: null, error: null, id: null } });

    return store.dispatch<any>(fetchProject('project_id_1')).then(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });

  it('creates SET_PROJECT_ERROR when server status is bad', () => {
    mock.onGet('http://localhost:3000/projects?id=project_id_1').reply(404);

    const expectedActions = [{ type: ProjectActions.SET_PROJECT_ERROR, val: true }];

    const store = mockStore({ clips: [], project: { name: null, error: null, id: null } });

    return store.dispatch<any>(fetchProject('project_id_1')).then(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });

  it('creates SET_PROJECT_ERROR when no project is found', () => {
    mock.onGet('http://localhost:3000/projects?id=project_id_1').reply(200, []);

    const expectedActions = [{ type: ProjectActions.SET_PROJECT_ERROR, val: true }];

    const store = mockStore({ clips: [], project: { name: null, error: null, id: null } });

    return store.dispatch<any>(fetchProject('project_id_1')).then(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });

  it('creates edit name action', () => {
    const expected = {
      type: ProjectActions.EDIT_NAME,
      content: 'content',
    };
    expect(setName(expected.content)).toEqual(expected);
  });

  it('creates SET_PROJECT_ERROR and EDIT_NAME when updating project name has finished', () => {
    mock.onPatch('http://localhost:5000/project').reply(200, { name: 'name', id: 'some_id' });

    const expectedActions = [
      { type: ProjectActions.SET_PROJECT_ERROR, val: false },
      {
        type: ProjectActions.EDIT_NAME,
        content: 'name',
      },
    ];

    const store = mockStore({ clips: [], project: { name: null, error: null, id: null } });

    return store.dispatch<any>(editName('project_id_1', 'name')).then(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });

  it('creates SET_PROJECT_ERROR updating project name request has failed', () => {
    mock
      .onPatch('http://localhost:3000/projects/project_id_1')
      .reply(400, { name: 'name', id: 'some_id' });

    const expectedActions = [{ type: ProjectActions.SET_PROJECT_ERROR, val: true }];

    const store = mockStore({ clips: [], project: { name: null, error: null, id: null } });

    return store.dispatch<any>(editName('project_id_1', 'name')).then(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });

  it('creates SET_PROJECT_ERROR and SAVE_DB_CLIPS when updating project clips has succeeded', () => {
    mock.onPatch('http://localhost:5000/project').reply(200, { clips: [clip] });

    const expectedActions = [
      { type: ProjectActions.SET_PROJECT_ERROR, val: false },
      { type: ProjectActions.SET_DB_CLIPS, clips: [clip] },
    ];

    const store = mockStore({ clips: [], project: { name: null, error: null, id: null } });

    return store.dispatch<any>(saveProject('project_id_1', [])).then(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });

  it('creates SET_PROJECT_ERROR and SAVE_DB_CLIPS when updating project clips has succeeded and no clips are returned', () => {
    mock.onPatch('http://localhost:5000/project').reply(200, { clips: [] });

    const expectedActions = [
      { type: ProjectActions.SET_PROJECT_ERROR, val: false },
      { type: ProjectActions.SET_DB_CLIPS, clips: [] },
    ];

    const store = mockStore({ clips: [], project: { name: null, error: null, id: null } });

    return store.dispatch<any>(saveProject('project_id_1', [])).then(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });

  it('creates SET_PROJECT_ERROR when updating project clips has failed', () => {
    mock.onPatch('http://localhost:3000/projects/project_id_1').reply(400);

    const expectedActions = [{ type: ProjectActions.SET_PROJECT_ERROR, val: true }];

    const store = mockStore({ clips: [], project: { name: null, error: null, id: null } });

    return store.dispatch<any>(saveProject('project_id_1', [])).then(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });

  it('creates SET_PROJECT_ERROR, SET_CLIPS, SET_PROJECT when updating project clips has succeeded', () => {
    mock.onPost('http://localhost:5000/project').reply(200, {
      name: 'project_id_1',
      id: '123',
    });

    const expectedActions = [
      { type: ProjectActions.SET_PROJECT_ERROR, val: false },
      { type: ProjectActions.SET_PROJECT, payload: { name: 'project_id_1', id: '123' } },
      { type: ProjectActions.SET_PROJECT_SELECTED_CLIP, index: null },
      { type: ClipActions.SET_CLIPS, clips: [] },
      { type: ClipActions.SET_DB_CLIPS, clips: [] },
    ];

    const store = mockStore({ clips: [], project: { name: null, error: null, id: null } });

    return store.dispatch<any>(createProject('project_id_1')).then(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });

  it('creates SET_PROJECT_ERROR when updating project clips has failed', () => {
    mock.onPost('http://localhost:3000/projects').reply(400);

    const expectedActions = [{ type: ProjectActions.SET_PROJECT_ERROR, val: true }];

    const store = mockStore({ clips: [], project: { name: null, error: null, id: null } });

    return store.dispatch<any>(createProject('project_id_1')).then(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });

  it('create an action for setting DB clips', () => {
    const expectedAction = {
      type: ProjectActions.SET_DB_CLIPS,
      clips: [clip],
    };
    expect(setDBClips([clip])).toEqual(expectedAction);
  });

  it('creates SET_PROJECT_ERROR and SET_PROJECT project has been deleted', () => {
    mock.onDelete('http://localhost:5000/project?id=project_id_1').reply(200);

    const expectedActions = [
      { type: ProjectActions.SET_PROJECT_ERROR, val: false },
      { type: ProjectActions.SET_PROJECT, payload: { id: null, name: null } },
    ];

    const store = mockStore({ clips: [], project: { name: null, error: null, id: null } });

    return store.dispatch<any>(deleteProject('project_id_1')).then(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });

  it('creates SET_PROJECT_ERROR when project delete fails', () => {
    mock.onDelete('http://localhost:3000/projects/project_id_1').reply(400);

    const expectedActions = [{ type: ProjectActions.SET_PROJECT_ERROR, val: true }];

    const store = mockStore({ clips: [], project: { name: null, error: null, id: null } });

    return store.dispatch<any>(deleteProject('project_id_1')).then(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });
});
