export function getDuration(startTime: string, endTime: string): number {
  const sTime = startTime.split(':')
  const eTime = endTime.split(':')
  const getTotalSeconds = (time: string[]) =>
    parseInt(time[0]) * 3600 + parseInt(time[1]) * 60 + parseInt(time[2])

  return getTotalSeconds(eTime) - getTotalSeconds(sTime)
}
