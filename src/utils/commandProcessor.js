export const commandParser = commandString => {
  if (!commandString) {
    return {
      executable: undefined,
      command: undefined,
      argument: undefined,
      flags: [],
    };
  }

  const [executable, command, ...rest] = commandString
    .split("'")
    .join('"')
    .match(/("[^"]+"|[^"\s]+)/g)
    .map(substring => substring.replace(/^"([^"]+)"$/, '$1'));
  return {
    executable,
    command,
    argument: rest.pop(),
    flags: rest,
  };
};

export const commandRebuilder = ({ executable, command, argument, flags }) => {
  let originalCommand = executable || '';

  if (command) {
    originalCommand += ` ${command}`;
  }

  if (flags && flags.length >= 1) {
    originalCommand += ` ${flags.join(' ')}`;
  }

  if (argument) {
    originalCommand += ` ${argument}`;
  }

  return originalCommand;
};
