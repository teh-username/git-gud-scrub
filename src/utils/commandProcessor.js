export const commandParser = commandString => {
  const [executable, command, ...rest] = commandString.split(' ');
  return {
    executable,
    command,
    argument: rest.pop(),
    flags: rest
  };
};

export const commandRebuilder = ({ executable, command, argument, flags }) => {
  let originalCommand = executable;

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
