<div style="font-family: sans-serif">
  <button id="gotoFMHYBtn">Open fmhy.net</button>
  <button id="fullscreenBtn">⛶ Fullscreen</button>
  Volume: <input type="range" min="0" max="100" value="100" id="range">
  <p>Current website: <span id="currentSite"></p>
</div>
<div id="cloudComputerDiv" style="height:720px;width:1280px"></div>
<script type="module">
  import Hyperbeam from "https://unpkg.com/@hyperbeam/web@latest/dist/index.js"
  const resp = await fetch("/computer")
  const data = await resp.json()
  const hb = await Hyperbeam(cloudComputerDiv, data.embed_url)

  gotoFMHYBtn.addEventListener("click", () => {
    hb.tabs.update({ url: "https://fmhy.net" })
  })

  fullscreenBtn.addEventListener("click", () => {
    if (cloudComputerDiv.requestFullscreen) {
      cloudComputerDiv.requestFullscreen()
    }
  })

  range.addEventListener("change", (e) => {
    hb.volume = e.target.value / 100
  })
  hb.tabs.onUpdated.addListener((tabId, changeInfo) => {
    if (changeInfo.title)
      currentSite.innerText = changeInfo.title
  })
</script>
