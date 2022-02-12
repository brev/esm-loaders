<script lang="ts">
  export let phrase: string = 'Brave New'
  const extra: number = 23
</script>

<h1>
  <span>
    Hello {phrase} World {extra.toString()}
  </span>
</h1>

<style lang="postcss">
  h1 { 
    span {
      color: blue; 
    }
  }
</style>
