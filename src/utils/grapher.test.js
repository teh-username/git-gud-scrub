import grapher from './grapher';

describe('grapher', () => {
  const state = {
    head: 'malak',
    branches: {
      master: 'vkf5as',
      revan: 'imi313',
      malak: 'pvni32',
      bane: 'kals213',
    },
    commits: ['vkf5as', 'imi313', 'pvni32', 'kals213'],
    lookup: {
      vkf5as: {
        message: "Hi! I'm the initial commit",
        children: ['imi313', 'pvni32'],
      },
      imi313: {
        message: 'Test commit',
        children: [],
      },
      pvni32: {
        message: 'Test commit',
        children: ['kals213'],
      },
      kals213: {
        message: 'Test commit',
        children: [],
      },
    },
  };

  it('should output a vis compatible object given a state', () => {
    expect(grapher(state)).toEqual({
      edges: [
        {
          arrows: 'from',
          from: 'vkf5as',
          to: 'imi313',
        },
        {
          arrows: 'from',
          from: 'vkf5as',
          to: 'pvni32',
        },
        {
          arrows: 'from',
          from: 'pvni32',
          to: 'kals213',
        },
        {
          arrows: 'from',
          from: 'vkf5as',
          to: 'master',
        },
        {
          arrows: 'from',
          from: 'imi313',
          to: 'revan',
        },
        {
          arrows: 'from',
          from: 'pvni32',
          to: 'malak',
        },
        {
          arrows: 'from',
          from: 'kals213',
          to: 'bane',
        },
        {
          arrows: 'from',
          from: 'malak',
          to: 'HEAD',
        },
      ],
      nodes: [
        {
          id: 'vkf5as',
          label: 'vkf5as',
          title: "Hi! I'm the initial commit",
        },
        {
          id: 'imi313',
          label: 'imi313',
          title: 'Test commit',
        },
        {
          id: 'pvni32',
          label: 'pvni32',
          title: 'Test commit',
        },
        {
          id: 'kals213',
          label: 'kals213',
          title: 'Test commit',
        },
        {
          color: '#39AA56',
          id: 'master',
          label: 'master',
        },
        {
          color: '#39AA56',
          id: 'revan',
          label: 'revan',
        },
        {
          color: '#39AA56',
          id: 'malak',
          label: 'malak',
        },
        {
          color: '#39AA56',
          id: 'bane',
          label: 'bane',
        },
        {
          color: '#B94947',
          id: 'HEAD',
          label: 'HEAD',
        },
      ],
    });
  });
});
