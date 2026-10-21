export default function esbuildSettings (settings) {
  return {
    ...settings,
    target: ['ios17']
  }
}
