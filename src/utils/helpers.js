// a timer than returns a promise once finished
export function reqTimer(duration = 1500) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}
