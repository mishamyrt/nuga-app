<script lang="ts">
  import type { PreviewColor } from '@stores/lights/types'

  export let halo: PreviewColor
  export let backlight: PreviewColor
  export let sidelight: PreviewColor

  const fallbackColor = 'rgb(85, 85, 85)'

  function getColor (c: PreviewColor, randomId: string): string {
    if (!c) {
      return fallbackColor
    } else if (c === 'random') {
      return `url(#${randomId})`
    } else {
      return `rgb(${c.R},${c.G},${c.B})`
    }
  }

  $: haloRgb = getColor(halo, 'random-halo')
  $: backlightRgb = getColor(backlight, 'random-backlight')
  $: sidelightRgb = getColor(sidelight, 'random-sidelight')
</script>

<svg xmlns="http://www.w3.org/2000/svg" width="262" height="100" fill="none" viewBox="0 0 262 100">
  <mask id="a" width="254" height="88" x="4" y="8" maskUnits="userSpaceOnUse"
    style="mask-type:alpha">
    <rect width="14" height="13" x="4" y="8" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="20" y="8" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="36" y="8" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="52" y="8" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="68" y="8" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="84" y="8" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="100" y="8" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="116" y="8" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="132" y="8" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="148" y="8" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="164" y="8" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="180" y="8" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="196" y="8" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="212" y="8" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="228" y="8" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="244" y="8" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="4" y="23" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="20" y="23" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="36" y="23" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="52" y="23" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="68" y="23" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="84" y="23" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="100" y="23" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="116" y="23" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="132" y="23" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="148" y="23" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="164" y="23" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="180" y="23" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="196" y="23" fill="#2E2E2E" rx="2" />
    <rect width="30" height="13" x="212" y="23" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="244" y="23" fill="#2E2E2E" rx="2" />
    <rect width="22" height="13" x="4" y="38" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="28" y="38" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="44" y="38" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="60" y="38" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="76" y="38" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="92" y="38" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="108" y="38" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="124" y="38" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="140" y="38" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="156" y="38" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="172" y="38" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="188" y="38" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="204" y="38" fill="#2E2E2E" rx="2" />
    <rect width="22" height="13" x="220" y="38" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="244" y="38" fill="#2E2E2E" rx="2" />
    <rect width="26" height="13" x="4" y="53" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="32" y="53" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="48" y="53" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="64" y="53" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="80" y="53" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="96" y="53" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="112" y="53" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="128" y="53" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="144" y="53" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="160" y="53" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="176" y="53" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="192" y="53" fill="#2E2E2E" rx="2" />
    <rect width="34" height="13" x="208" y="53" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="244" y="53" fill="#2E2E2E" rx="2" />
    <rect width="34" height="13" x="4" y="68" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="40" y="68" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="56" y="68" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="72" y="68" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="88" y="68" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="104" y="68" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="120" y="68" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="136" y="68" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="152" y="68" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="168" y="68" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="184" y="68" fill="#2E2E2E" rx="2" />
    <rect width="26" height="13" x="200" y="68" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="228" y="68" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="244" y="68" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="4" y="83" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="20" y="83" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="36" y="83" fill="#2E2E2E" rx="2" />
    <rect width="110" height="13" x="52" y="83" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="164" y="83" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="180" y="83" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="196" y="83" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="212" y="83" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="228" y="83" fill="#2E2E2E" rx="2" />
    <rect width="14" height="13" x="244" y="83" fill="#2E2E2E" rx="2" />
  </mask>
  <g mask="url(#a)">
    <g filter="url(#b)">
      <rect class="keyboard-fill" width="258" height="92" x="2" y="6" fill="{backlightRgb}" fill-opacity=".6" rx="3" />
    </g>
    <g filter="url(#b)">
      <rect class="keyboard-fill" style={`opacity: ${backlight ? 1 : 0}`} width="258" height="92" x="2" y="6" fill="#fff" fill-opacity=".3" rx="3" />
    </g>
    <rect width="259" height="93" x="1.5" y="5.5" stroke="#6A6A6A" stroke-opacity=".9" rx="3.5" />
  </g>
  <g filter="url(#d)">
    <rect width="14" height="13" x="4" y="8" fill="url(#e)" rx="2" />
    <rect width="14" height="13" x="20" y="8" fill="url(#f)" rx="2" />
    <rect width="14" height="13" x="36" y="8" fill="url(#g)" rx="2" />
    <rect width="14" height="13" x="52" y="8" fill="url(#h)" rx="2" />
    <rect width="14" height="13" x="68" y="8" fill="url(#i)" rx="2" />
    <rect width="14" height="13" x="84" y="8" fill="url(#j)" rx="2" />
    <rect width="14" height="13" x="100" y="8" fill="url(#k)" rx="2" />
    <rect width="14" height="13" x="116" y="8" fill="url(#l)" rx="2" />
    <rect width="14" height="13" x="132" y="8" fill="url(#m)" rx="2" />
    <rect width="14" height="13" x="148" y="8" fill="url(#n)" rx="2" />
    <rect width="14" height="13" x="164" y="8" fill="url(#o)" rx="2" />
    <rect width="14" height="13" x="180" y="8" fill="url(#p)" rx="2" />
    <rect width="14" height="13" x="196" y="8" fill="url(#q)" rx="2" />
    <rect width="14" height="13" x="212" y="8" fill="url(#r)" rx="2" />
    <rect width="14" height="13" x="228" y="8" fill="url(#s)" rx="2" />
    <rect width="14" height="13" x="244" y="8" fill="url(#t)" rx="2" />
    <rect width="14" height="13" x="4" y="23" fill="url(#u)" rx="2" />
    <rect width="14" height="13" x="20" y="23" fill="url(#v)" rx="2" />
    <rect width="14" height="13" x="36" y="23" fill="url(#w)" rx="2" />
    <rect width="14" height="13" x="52" y="23" fill="url(#x)" rx="2" />
    <rect width="14" height="13" x="68" y="23" fill="url(#y)" rx="2" />
    <rect width="14" height="13" x="84" y="23" fill="url(#z)" rx="2" />
    <rect width="14" height="13" x="100" y="23" fill="url(#A)" rx="2" />
    <rect width="14" height="13" x="116" y="23" fill="url(#B)" rx="2" />
    <rect width="14" height="13" x="132" y="23" fill="url(#C)" rx="2" />
    <rect width="14" height="13" x="148" y="23" fill="url(#D)" rx="2" />
    <rect width="14" height="13" x="164" y="23" fill="url(#E)" rx="2" />
    <rect width="14" height="13" x="180" y="23" fill="url(#F)" rx="2" />
    <rect width="14" height="13" x="196" y="23" fill="url(#G)" rx="2" />
    <rect width="30" height="13" x="212" y="23" fill="url(#H)" rx="2" />
    <rect width="14" height="13" x="244" y="23" fill="url(#I)" rx="2" />
    <rect width="22" height="13" x="4" y="38" fill="url(#J)" rx="2" />
    <rect width="14" height="13" x="28" y="38" fill="url(#K)" rx="2" />
    <rect width="14" height="13" x="44" y="38" fill="url(#L)" rx="2" />
    <rect width="14" height="13" x="60" y="38" fill="url(#M)" rx="2" />
    <rect width="14" height="13" x="76" y="38" fill="url(#N)" rx="2" />
    <rect width="14" height="13" x="92" y="38" fill="url(#O)" rx="2" />
    <rect width="14" height="13" x="108" y="38" fill="url(#P)" rx="2" />
    <rect width="14" height="13" x="124" y="38" fill="url(#Q)" rx="2" />
    <rect width="14" height="13" x="140" y="38" fill="url(#R)" rx="2" />
    <rect width="14" height="13" x="156" y="38" fill="url(#S)" rx="2" />
    <rect width="14" height="13" x="172" y="38" fill="url(#T)" rx="2" />
    <rect width="14" height="13" x="188" y="38" fill="url(#U)" rx="2" />
    <rect width="14" height="13" x="204" y="38" fill="url(#V)" rx="2" />
    <rect width="22" height="13" x="220" y="38" fill="url(#W)" rx="2" />
    <rect width="14" height="13" x="244" y="38" fill="url(#X)" rx="2" />
    <rect width="26" height="13" x="4" y="53" fill="url(#Y)" rx="2" />
    <rect width="14" height="13" x="32" y="53" fill="url(#Z)" rx="2" />
    <rect width="14" height="13" x="48" y="53" fill="url(#aa)" rx="2" />
    <rect width="14" height="13" x="64" y="53" fill="url(#ab)" rx="2" />
    <rect width="14" height="13" x="80" y="53" fill="url(#ac)" rx="2" />
    <rect width="14" height="13" x="96" y="53" fill="url(#ad)" rx="2" />
    <rect width="14" height="13" x="112" y="53" fill="url(#ae)" rx="2" />
    <rect width="14" height="13" x="128" y="53" fill="url(#af)" rx="2" />
    <rect width="14" height="13" x="144" y="53" fill="url(#ag)" rx="2" />
    <rect width="14" height="13" x="160" y="53" fill="url(#ah)" rx="2" />
    <rect width="14" height="13" x="176" y="53" fill="url(#ai)" rx="2" />
    <rect width="14" height="13" x="192" y="53" fill="url(#aj)" rx="2" />
    <rect width="34" height="13" x="208" y="53" fill="url(#ak)" rx="2" />
    <rect width="14" height="13" x="244" y="53" fill="url(#al)" rx="2" />
    <rect width="34" height="13" x="4" y="68" fill="url(#am)" rx="2" />
    <rect width="14" height="13" x="40" y="68" fill="url(#an)" rx="2" />
    <rect width="14" height="13" x="56" y="68" fill="url(#ao)" rx="2" />
    <rect width="14" height="13" x="72" y="68" fill="url(#ap)" rx="2" />
    <rect width="14" height="13" x="88" y="68" fill="url(#aq)" rx="2" />
    <rect width="14" height="13" x="104" y="68" fill="url(#ar)" rx="2" />
    <rect width="14" height="13" x="120" y="68" fill="url(#as)" rx="2" />
    <rect width="14" height="13" x="136" y="68" fill="url(#at)" rx="2" />
    <rect width="14" height="13" x="152" y="68" fill="url(#au)" rx="2" />
    <rect width="14" height="13" x="168" y="68" fill="url(#av)" rx="2" />
    <rect width="14" height="13" x="184" y="68" fill="url(#aw)" rx="2" />
    <rect width="26" height="13" x="200" y="68" fill="url(#ax)" rx="2" />
    <rect width="14" height="13" x="228" y="68" fill="url(#ay)" rx="2" />
    <rect width="14" height="13" x="244" y="68" fill="url(#az)" rx="2" />
    <rect width="14" height="13" x="4" y="83" fill="url(#aA)" rx="2" />
    <rect width="14" height="13" x="20" y="83" fill="url(#aB)" rx="2" />
    <rect width="14" height="13" x="36" y="83" fill="url(#aC)" rx="2" />
    <rect width="110" height="13" x="52" y="83" fill="url(#aD)" rx="2" />
    <rect width="14" height="13" x="164" y="83" fill="url(#aE)" rx="2" />
    <rect width="14" height="13" x="180" y="83" fill="url(#aF)" rx="2" />
    <rect width="14" height="13" x="196" y="83" fill="url(#aG)" rx="2" />
    <rect width="14" height="13" x="212" y="83" fill="url(#aH)" rx="2" />
    <rect width="14" height="13" x="228" y="83" fill="url(#aI)" rx="2" />
    <rect width="14" height="13" x="244" y="83" fill="url(#aJ)" rx="2" />
  </g>
  <rect style={`opacity: ${halo ? 1 : 0}`} class="keyboard-fill" width="260" height="94" x="1" y="5" stroke="{haloRgb}" stroke-opacity=".8" stroke-width="2"
    rx="4" />
  <rect style={`opacity: ${halo ? 1 : 0}`} class="keyboard-fill" width="260" height="94" x="1" y="5" stroke="#fff" stroke-opacity=".3" stroke-width="2"
  rx="4" />
  <rect width="260" height="94" x="1" y="5" stroke="url(#aK)" stroke-width="2" rx="4" />
  <path class="keyboard-fill" stroke="{sidelightRgb}" stroke-linecap="round" stroke-opacity="1" stroke-width="2" d="M4 1h14" />
  <defs>
    <linearGradient id="random-backlight" x1="2" x2="260" y1="52" y2="52" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FF6861" />
      <stop offset=".161" stop-color="#FEB445" />
      <stop offset=".323" stop-color="#FED046" />
      <stop offset=".484" stop-color="#FFF848" />
      <stop offset=".651" stop-color="#77FF61" />
      <stop offset=".823" stop-color="#1CFFF1" />
      <stop offset="1" stop-color="#336CFF" />
    </linearGradient>
    <linearGradient id="random-halo" x1="2" x2="260" y1="52" y2="52" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FF6861" />
      <stop offset=".100" stop-color="#FEB445" />
      <stop offset=".200" stop-color="#FED046" />
      <stop offset=".300" stop-color="#FFF848" />
      <stop offset=".400" stop-color="#77FF61" />
      <stop offset=".500" stop-color="#1CFFF1" />
      <stop offset="1" stop-color="#336CFF" />
    </linearGradient>
    <linearGradient id="random-sidelight" x1="2" x2="260" y1="52" y2="52" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FFF848" />
      <stop offset=".1" stop-color="#27C4FF" />
    </linearGradient>
    <linearGradient id="e" x1="11" x2="11" y1="8" y2="21" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="f" x1="27" x2="27" y1="8" y2="21" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="g" x1="43" x2="43" y1="8" y2="21" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="h" x1="59" x2="59" y1="8" y2="21" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="i" x1="75" x2="75" y1="8" y2="21" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="j" x1="91" x2="91" y1="8" y2="21" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="k" x1="107" x2="107" y1="8" y2="21" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="l" x1="123" x2="123" y1="8" y2="21" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="m" x1="139" x2="139" y1="8" y2="21" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="n" x1="155" x2="155" y1="8" y2="21" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="o" x1="171" x2="171" y1="8" y2="21" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="p" x1="187" x2="187" y1="8" y2="21" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="q" x1="203" x2="203" y1="8" y2="21" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="r" x1="219" x2="219" y1="8" y2="21" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="s" x1="235" x2="235" y1="8" y2="21" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="t" x1="251" x2="251" y1="8" y2="21" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="u" x1="11" x2="11" y1="23" y2="36" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="v" x1="27" x2="27" y1="23" y2="36" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="w" x1="43" x2="43" y1="23" y2="36" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="x" x1="59" x2="59" y1="23" y2="36" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="y" x1="75" x2="75" y1="23" y2="36" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="z" x1="91" x2="91" y1="23" y2="36" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="A" x1="107" x2="107" y1="23" y2="36" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="B" x1="123" x2="123" y1="23" y2="36" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="C" x1="139" x2="139" y1="23" y2="36" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="D" x1="155" x2="155" y1="23" y2="36" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="E" x1="171" x2="171" y1="23" y2="36" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="F" x1="187" x2="187" y1="23" y2="36" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="G" x1="203" x2="203" y1="23" y2="36" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="H" x1="227" x2="227" y1="23" y2="36" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="I" x1="251" x2="251" y1="23" y2="36" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="J" x1="15" x2="15" y1="38" y2="51" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="K" x1="35" x2="35" y1="38" y2="51" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="L" x1="51" x2="51" y1="38" y2="51" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="M" x1="67" x2="67" y1="38" y2="51" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="N" x1="83" x2="83" y1="38" y2="51" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="O" x1="99" x2="99" y1="38" y2="51" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="P" x1="115" x2="115" y1="38" y2="51" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="Q" x1="131" x2="131" y1="38" y2="51" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="R" x1="147" x2="147" y1="38" y2="51" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="S" x1="163" x2="163" y1="38" y2="51" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="T" x1="179" x2="179" y1="38" y2="51" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="U" x1="195" x2="195" y1="38" y2="51" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="V" x1="211" x2="211" y1="38" y2="51" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="W" x1="231" x2="231" y1="38" y2="51" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="X" x1="251" x2="251" y1="38" y2="51" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="Y" x1="17" x2="17" y1="53" y2="66" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="Z" x1="39" x2="39" y1="53" y2="66" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="aa" x1="55" x2="55" y1="53" y2="66" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="ab" x1="71" x2="71" y1="53" y2="66" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="ac" x1="87" x2="87" y1="53" y2="66" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="ad" x1="103" x2="103" y1="53" y2="66" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="ae" x1="119" x2="119" y1="53" y2="66" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="af" x1="135" x2="135" y1="53" y2="66" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="ag" x1="151" x2="151" y1="53" y2="66" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="ah" x1="167" x2="167" y1="53" y2="66" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="ai" x1="183" x2="183" y1="53" y2="66" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="aj" x1="199" x2="199" y1="53" y2="66" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="ak" x1="225" x2="225" y1="53" y2="66" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="al" x1="251" x2="251" y1="53" y2="66" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="am" x1="21" x2="21" y1="68" y2="81" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="an" x1="47" x2="47" y1="68" y2="81" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="ao" x1="63" x2="63" y1="68" y2="81" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="ap" x1="79" x2="79" y1="68" y2="81" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="aq" x1="95" x2="95" y1="68" y2="81" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="ar" x1="111" x2="111" y1="68" y2="81" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="as" x1="127" x2="127" y1="68" y2="81" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="at" x1="143" x2="143" y1="68" y2="81" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="au" x1="159" x2="159" y1="68" y2="81" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="av" x1="175" x2="175" y1="68" y2="81" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="aw" x1="191" x2="191" y1="68" y2="81" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="ax" x1="213" x2="213" y1="68" y2="81" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="ay" x1="235" x2="235" y1="68" y2="81" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="az" x1="251" x2="251" y1="68" y2="81" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="aA" x1="11" x2="11" y1="83" y2="96" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="aB" x1="27" x2="27" y1="83" y2="96" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="aC" x1="43" x2="43" y1="83" y2="96" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="aD" x1="107" x2="107" y1="83" y2="96" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="aE" x1="171" x2="171" y1="83" y2="96" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="aF" x1="187" x2="187" y1="83" y2="96" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="aG" x1="203" x2="203" y1="83" y2="96" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="aH" x1="219" x2="219" y1="83" y2="96" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="aI" x1="235" x2="235" y1="83" y2="96" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="aJ" x1="251" x2="251" y1="83" y2="96" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFCF" stop-opacity=".12" />
      <stop offset="1" stop-color="#8C8C8C" stop-opacity=".08" />
    </linearGradient>
    <linearGradient id="aK" x1="1.5" x2="260" y1="5" y2="98" gradientUnits="userSpaceOnUse">
      <stop stop-color="#fff" stop-opacity=".29" />
      <stop offset="1" stop-color="#6F6F6F" stop-opacity=".49" />
    </linearGradient>
    <filter id="b" width="260" height="96" x="1" y="5" color-interpolation-filters="sRGB"
      filterUnits="userSpaceOnUse">
      <feFlood flood-opacity="0" result="BackgroundImageFix" />
      <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
      <feColorMatrix in="SourceAlpha" result="hardAlpha"
        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
      <feOffset dy="2" />
      <feGaussianBlur stdDeviation="2.5" />
      <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
      <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0" />
      <feBlend in2="shape" result="effect1_innerShadow_32_2088" />
    </filter>
    <filter id="d" width="256" height="90" x="3" y="8" color-interpolation-filters="sRGB"
      filterUnits="userSpaceOnUse">
      <feFlood flood-opacity="0" result="BackgroundImageFix" />
      <feColorMatrix in="SourceAlpha" result="hardAlpha"
        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
      <feOffset dy="1" />
      <feGaussianBlur stdDeviation=".5" />
      <feComposite in2="hardAlpha" operator="out" />
      <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
      <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_32_2088" />
      <feBlend in="SourceGraphic" in2="effect1_dropShadow_32_2088" result="shape" />
    </filter>
  </defs>
</svg>

<style lang="scss">
  .keyboard-fill {
    transition-timing-function: ease-out;
    transition-property: fill, opacity, stroke;
    transition-duration: .2s;
  }
</style>
