import commandParser from './commandParser';

describe('Command Parser Util', () => {
  it('should return the correct default object when no command is passed', () => {
    expect(commandParser('git')).toEqual({
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
      command: 'add',
      argument: 'dummy',
      flags: ['--x', '--e', '--n']
    });
  });
});
