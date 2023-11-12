<script lang="ts">
  import { ColorSelector, FormGroup, FormRow, Select, Slider, Toggle } from '@naco-ui/svelte'

</script>

<FormGroup>
  <FormRow title="Enable">
    <Toggle />
  </FormRow>
  <FormRow title="Mode">
    <Select options={[{ value: 'asd' }]} />
  </FormRow>
  <FormRow title="Color">
    <ColorSelector primaryProp="index" options={['#FF00FF']} />
  </FormRow>
  <FormRow title="Brightness">
    <Slider step={1} min={1} max={7} />
  </FormRow>
  <FormRow title="Speed">
    <Slider step={1} min={1} max={7} />
  </FormRow>
</FormGroup>
