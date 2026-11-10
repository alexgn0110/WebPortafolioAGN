import { useEffect, useState } from 'react';

/** Current time in a given IANA time zone, refreshed every 30 seconds. */
export function useLocalTime(timeZone: string): string {
  const format = () =>
    new Intl.DateTimeFormat('en-US', { timeZone, hour: 'numeric', minute: '2-digit' }).format(
      new Date(),
    );

  const [time, setTime] = useState(format);

  useEffect(() => {
    const id = window.setInterval(() => setTime(format()), 30_000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- format only depends on timeZone
  }, [timeZone]);

  return time;
}
