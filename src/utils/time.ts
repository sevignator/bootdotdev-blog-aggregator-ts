export function parseDuration(durationStr: string): number {
  const regex = /^(\d+)(ms|s|m|h)$/;
  const match = durationStr.match(regex);

  if (!match) {
    console.log('Provide a valid duration value.');
    process.exit(1);
  }

  const [, time, unit] = match;

  switch (unit) {
    case 'ms': {
      return Number.parseInt(time);
    }
    case 's': {
      return Number.parseInt(time) * 1000;
    }
    case 'm': {
      return Number.parseInt(time) * 60000;
    }
    case 'h': {
      return Number.parseInt(time) * 3.6e6;
    }
    default: {
      console.log('Provide a valid time unit (ms, s, m or h).');
      process.exit(1);
    }
  }
}
