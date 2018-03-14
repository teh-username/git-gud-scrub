import { commandParser, commandRebuilder } from './commandProcessor';

describe('Command Processor Util', () => {
  describe('command parser', () => {
    it('should return the correct default object when empty string is passed', () => {
      expect(commandParser('')).toEqual({
        executable: undefined,
        command: undefined,
        argument: undefined,
        flags: [],
      });
    });

    it('should return the correct default object when no command is passed', () => {
      expect(commandParser('git')).toEqual({
        executable: 'git',
        command: undefined,
        argument: undefined,
        flags: [],
      });
    });

    it('should properly parse a simple git command', () => {
      const parsed = commandParser('git status');
      expect(parsed).toMatchObject({
        command: 'status',
      });
    });

    it('should return flags as an array attribute', () => {
      const parsed = commandParser('git add --a --b --c dummy');
      expect(parsed).toMatchObject({
        flags: ['--a', '--b', '--c'],
      });
    });

    it('should parse the argument correctly when there are no flags', () => {
      const parsed = commandParser('git add dummy');
      expect(parsed).toMatchObject({
        argument: 'dummy',
      });
    });

    it('should parse the argument correctly when wrapped in single quotes', () => {
      const parsed = commandParser("git add 'dummy argument'");
      expect(parsed).toMatchObject({
        argument: 'dummy argument',
      });
    });

    it('should parse the argument correctly when wrapped in double quotes', () => {
      const parsed = commandParser('git add "dummy argument"');
      expect(parsed).toMatchObject({
        argument: 'dummy argument',
      });
    });

    it('should parse the argument correctly when there are flags', () => {
      const parsed = commandParser('git add --a --b --c .');
      expect(parsed).toMatchObject({
        argument: '.',
      });
    });

    it('should parse the command string correctly on full options', () => {
      const parsed = commandParser('git add --x --e --n "dummy argument"');
      expect(parsed).toEqual({
        executable: 'git',
        command: 'add',
        argument: 'dummy argument',
        flags: ['--x', '--e', '--n'],
      });
    });
  });

  describe('command rebuilder', () => {
    it('should rebuild an empty string', () => {
      expect(
        commandRebuilder({
          executable: undefined,
          command: undefined,
          argument: undefined,
          flags: [],
        })
      ).toEqual('');
    });

    it('should rebuild an executable', () => {
      expect(
        commandRebuilder({
          executable: 'git',
          command: undefined,
          argument: undefined,
          flags: [],
        })
      ).toEqual('git');
    });

    it('should rebuild an executable and command', () => {
      expect(
        commandRebuilder({
          executable: 'git',
          command: 'status',
          argument: undefined,
          flags: [],
        })
      ).toEqual('git status');
    });

    it('should rebuild an executable, command and argument', () => {
      expect(
        commandRebuilder({
          executable: 'git',
          command: 'add',
          argument: 'test.js',
          flags: [],
        })
      ).toEqual('git add test.js');
    });

    it('should rebuild an executable, command, flags and argument', () => {
      expect(
        commandRebuilder({
          executable: 'git',
          command: 'commit',
          argument: '"test commit message"',
          flags: ['-m'],
        })
      ).toEqual('git commit -m "test commit message"');
    });
  });
});
