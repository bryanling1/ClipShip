import { Clip } from '../../reducers/types';
import { ClipActions } from '../clips';
import { Middleware } from 'redux';
import {
  ProjectActions,
  createProject,
  editName,
  fetchProject,
  saveProject,
  setName,
  setProject,
  setProjectError,
} from '../project';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares: Middleware[] = [thunk];
const mockStore = configureMockStore(middlewares);

const mock = new MockAdapter(axios);

const clip: Clip = {
  id: '1',
  url:
    'https://clips.twitch.tv/embed?clip=AmazonianEncouragingLyrebirdAllenHuhu&tt_medium=clips_api&tt_content=embed',
  start: 0,
  end: 32.000333,
  length: 32.000333,
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

  it('creates SET_PROJECT, SET_CLIPS, and SET_PROJECT_ERROR when fetching project has been done and there are clips', () => {
    mock
      .onGet('http://localhost:3000/projects?id=project_id_1')
      .reply(200, [{ id: 'project_id_1', name: 'my_project_name', clips: [clip] }]);

    const expectedActions = [
      {
        type: ProjectActions.SET_PROJECT,
        payload: { id: 'project_id_1', name: 'my_project_name' },
      },
      { type: ProjectActions.SET_PROJECT_ERROR, val: false },
      { type: ClipActions.SET_CLIPS, clips: [clip] },
    ];

    const store = mockStore({ clips: [], project: { name: null, error: null, id: null } });

    return store.dispatch<any>(fetchProject('project_id_1')).then(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });

  it('creates SET_PROJECT, SET_CLIPS, and SET_PROJECT_ERROR when fetching project has been done and there are no clips', () => {
    mock
      .onGet('http://localhost:3000/projects?id=project_id_1')
      .reply(200, [{ id: 'project_id_1', name: 'my_project_name', clips: null }]);

    const expectedActions = [
      {
        type: ProjectActions.SET_PROJECT,
        payload: { id: 'project_id_1', name: 'my_project_name' },
      },
      { type: ProjectActions.SET_PROJECT_ERROR, val: false },
      { type: ClipActions.SET_CLIPS, clips: [] },
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
    mock
      .onPatch('http://localhost:3000/projects/project_id_1')
      .reply(200, { name: 'name', id: 'some_id' });

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

  it('creates SET_PROJECT_ERROR when updating project clips has succeeded', () => {
    mock.onPut('http://localhost:3000/projects/project_id_1').reply(200);

    const expectedActions = [{ type: ProjectActions.SET_PROJECT_ERROR, val: false }];

    const store = mockStore({ clips: [], project: { name: null, error: null, id: null } });

    return store.dispatch<any>(saveProject('project_id_1', [])).then(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });

  it('creates SET_PROJECT_ERROR when updating project clips has failed', () => {
    mock.onPut('http://localhost:3000/projects/project_id_1').reply(400);

    const expectedActions = [{ type: ProjectActions.SET_PROJECT_ERROR, val: true }];

    const store = mockStore({ clips: [], project: { name: null, error: null, id: null } });

    return store.dispatch<any>(saveProject('project_id_1', [])).then(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });

  it('creates SET_PROJECT_ERROR, SET_CLIPS, SET_PROJECT when updating project clips has succeeded', () => {
    mock.onPost('http://localhost:3000/projects').reply(200, {
      name: 'project_id_1',
      id: '123',
    });

    const expectedActions = [
      { type: ProjectActions.SET_PROJECT_ERROR, val: false },
      { type: ProjectActions.SET_PROJECT, payload: { name: 'project_id_1', id: '123' } },
      { type: ClipActions.SET_CLIPS, clips: [] },
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
});
