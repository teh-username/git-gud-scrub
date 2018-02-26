const commandParser = commandString => {
  const [, command, ...rest] = commandString.split(' ');
  return {
    command,
    argument: rest.pop(),
    flags: rest
  };
};

export default commandParser;
