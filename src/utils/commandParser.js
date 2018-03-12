const commandParser = commandString => {
  const [executable, command, ...rest] = commandString.split(' ');
  return {
    executable,
    command,
    argument: rest.pop(),
    flags: rest
  };
};

export default commandParser;
