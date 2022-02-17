// x4.3.3. function*
export default function* x433() {
  let count = 1
  while (true) {
    yield 'x433'.repeat(count)
    count++
  }
}
