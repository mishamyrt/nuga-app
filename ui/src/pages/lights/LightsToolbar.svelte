<script lang="ts">
  import { KeyboardLights } from '$features/lights'
</script>

<div class="lights-toolbar">
  <KeyboardLights />
</div>

<style lang="scss">
  .lights-toolbar {
    flex: 1;
    height: 100%;
    width: 100%;
    justify-content: center;
    display: flex;
    align-items: center;
  }
</style>
