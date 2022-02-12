// x4.2.3. function*
export default function* () {
  let count = 1
  while (true) {
    yield 'x423'.repeat(count)
    count++
  }
}
