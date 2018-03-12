import commandParser from './commandParser';

describe('Command Parser Util', () => {
  it('should return the correct default object when empty string is passed', () => {
    expect(commandParser('')).toEqual({
      executable: '',
      command: undefined,
      argument: undefined,
      flags: []
    });
  });

  it('should return the correct default object when no command is passed', () => {
    expect(commandParser('git')).toEqual({
      executable: 'git',
      command: undefined,
      argument: undefined,
      flags: []
    });
  });

  it('should properly parse a simple git command', () => {
    const parsed = commandParser('git status');
    expect(parsed).toMatchObject({
      command: 'status'
    });
  });

  it('should return flags as an array attribute', () => {
    const parsed = commandParser('git add --a --b --c dummy');
    expect(parsed).toMatchObject({
      flags: ['--a', '--b', '--c']
    });
  });

  it('should parse the argument correctly when there are no flags', () => {
    const parsed = commandParser('git add dummy');
    expect(parsed).toMatchObject({
      argument: 'dummy'
    });
  });

  it('should parse the argument correctly when there are flags', () => {
    const parsed = commandParser('git add --a --b --c .');
    expect(parsed).toMatchObject({
      argument: '.'
    });
  });

  it('should parse the command string correctly on full options', () => {
    const parsed = commandParser('git add --x --e --n dummy');
    expect(parsed).toEqual({
      executable: 'git',
      command: 'add',
      argument: 'dummy',
      flags: ['--x', '--e', '--n']
    });
  });
});
