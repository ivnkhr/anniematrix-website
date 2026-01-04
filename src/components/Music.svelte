<script>
  let vinylRotation = 0;
  let isVinylSpinning = true;
  let vinylInterval;

  function startVinylAnimation() {
    vinylInterval = setInterval(() => {
      if (isVinylSpinning) {
        vinylRotation = (vinylRotation + 0.5) % 360;
      }
    }, 16);
  }

  startVinylAnimation();
</script>

<section id="music" class="section music">
  <div class="section-header">
    <h2 class="section-title">◉ FREQUENCIES</h2>
    <div class="section-line"></div>
  </div>

  <div class="music-content">
    <div class="music-player">
      <div class="player-frame">
        <div class="player-header">
          <span class="player-icon">▶</span>
          <span class="player-title">SOUNDCLOUD_STREAM</span>
          <span class="player-status">LIVE</span>
        </div>
        <div class="player-embed">
          <iframe 
            width="100%" 
            height="300" 
            scrolling="no" 
            frameborder="no" 
            allow="autoplay" 
            src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/YOUR_PLAYLIST_ID&color=%2300ff41&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false"
            title="SoundCloud Player"
          ></iframe>
          <div class="player-fallback">
            <p>[ SOUNDCLOUD PLAYER ]</p>
            <p class="dim">Connect to stream frequencies</p>
          </div>
        </div>
      </div>

      <div class="player-tracklist">
        <div class="tracklist-header">RECENT_TRANSMISSIONS</div>
        <ul class="tracklist">
          <li class="track">
            <span class="track-num">001</span>
            <span class="track-name">Codec Dreams</span>
            <span class="track-duration">04:32</span>
          </li>
          <li class="track">
            <span class="track-num">002</span>
            <span class="track-name">Silent Frequencies</span>
            <span class="track-duration">05:18</span>
          </li>
          <li class="track">
            <span class="track-num">003</span>
            <span class="track-name">PSX Memory Bank</span>
            <span class="track-duration">06:45</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="vinyl-container">
      <div class="vinyl-player">
        <div class="vinyl-platter">
          <div 
            class="vinyl-record" 
            style="transform: rotate({vinylRotation}deg)"
            class:paused={!isVinylSpinning}
          >
            <div class="vinyl-label">
              <div class="vinyl-label-text">
                <span class="vinyl-artist">DJ ANNIEMATRIX</span>
                <span class="vinyl-album">FREQUENCY_001</span>
              </div>
              <div class="vinyl-center-hole"></div>
            </div>
            <div class="vinyl-grooves"></div>
          </div>
        </div>
        <div class="vinyl-tonearm" class:playing={isVinylSpinning}>
          <div class="tonearm-base"></div>
          <div class="tonearm-arm"></div>
          <div class="tonearm-head"></div>
        </div>
      </div>
      <button 
        class="vinyl-control"
        on:click={() => isVinylSpinning = !isVinylSpinning}
      >
        {isVinylSpinning ? '◼ PAUSE' : '▶ PLAY'}
      </button>
    </div>
  </div>
</section>

<style>
  .music {
    background: linear-gradient(to bottom, transparent, rgba(0, 255, 65, 0.02), transparent);
  }

  .section-header {
    margin-bottom: 3rem;
  }

  .section-title {
    display: inline-block;
  }

  .section-line {
    height: 1px;
    background: linear-gradient(to right, var(--codec-green), transparent);
    margin-top: 1rem;
    max-width: 400px;
  }

  .music-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    flex: 1;
    align-items: center;
    max-width: 1400px;
    margin: 0 auto;
    width: 100%;
  }

  .music-player {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .player-frame {
    border: 1px solid var(--codec-green);
    background: var(--bg-darker);
  }

  .player-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid rgba(0, 255, 65, 0.3);
    font-size: 0.85rem;
  }

  .player-icon {
    color: var(--codec-green);
  }

  .player-title {
    flex: 1;
    letter-spacing: 0.1em;
  }

  .player-status {
    color: var(--alert-red);
    animation: blink 2s ease-in-out infinite;
  }

  .player-embed {
    min-height: 300px;
    position: relative;
  }

  .player-embed iframe {
    position: relative;
    z-index: 1;
  }

  .player-fallback {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: var(--bg-darker);
  }

  .player-fallback .dim {
    opacity: 0.5;
    font-size: 0.85rem;
    margin-top: 0.5rem;
  }

  .player-tracklist {
    border: 1px solid rgba(0, 255, 65, 0.3);
  }

  .tracklist-header {
    padding: 0.75rem 1rem;
    font-size: 0.85rem;
    letter-spacing: 0.1em;
    border-bottom: 1px solid rgba(0, 255, 65, 0.3);
    opacity: 0.7;
  }

  .tracklist {
    list-style: none;
  }

  .track {
    display: flex;
    align-items: center;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid rgba(0, 255, 65, 0.1);
    transition: background 0.3s;
  }

  .track:last-child {
    border-bottom: none;
  }

  .track:hover {
    background: rgba(0, 255, 65, 0.05);
  }

  .track-num {
    width: 40px;
    opacity: 0.5;
    font-size: 0.85rem;
  }

  .track-name {
    flex: 1;
  }

  .track-duration {
    opacity: 0.5;
    font-size: 0.85rem;
  }

  .vinyl-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  .vinyl-player {
    position: relative;
    width: 350px;
    height: 350px;
  }

  .vinyl-platter {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: #111;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 
      0 0 0 10px #0a0a0a,
      0 0 0 12px var(--codec-green-dim),
      0 0 30px rgba(0, 255, 65, 0.2);
  }

  .vinyl-record {
    width: 90%;
    height: 90%;
    border-radius: 50%;
    background: 
      repeating-radial-gradient(
        circle at center,
        #111 0px,
        #111 2px,
        #1a1a1a 2px,
        #1a1a1a 4px
      );
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    transition: transform 0.1s linear;
  }

  .vinyl-record.paused {
    filter: grayscale(50%);
  }

  .vinyl-label {
    width: 35%;
    height: 35%;
    border-radius: 50%;
    background: var(--bg-black);
    border: 2px solid var(--codec-green);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .vinyl-label-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'VT323', monospace;
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    text-align: center;
  }

  .vinyl-artist {
    opacity: 0.7;
  }

  .vinyl-album {
    font-size: 0.6rem;
    opacity: 0.5;
  }

  .vinyl-center-hole {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--codec-green);
    box-shadow: 0 0 10px var(--codec-green);
  }

  .vinyl-grooves {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    pointer-events: none;
  }

  .vinyl-tonearm {
    position: absolute;
    top: 20px;
    right: 40px;
    transform-origin: top right;
    transition: transform 0.5s ease-in-out;
  }

  .vinyl-tonearm.playing {
    transform: rotate(-25deg);
  }

  .tonearm-base {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #222;
    border: 2px solid var(--codec-green-dim);
    position: absolute;
    top: -15px;
    right: -15px;
  }

  .tonearm-arm {
    width: 150px;
    height: 4px;
    background: linear-gradient(to left, #333, #222);
    transform: rotate(45deg);
    transform-origin: right center;
    position: absolute;
    top: 0;
    right: 0;
  }

  .tonearm-head {
    width: 20px;
    height: 8px;
    background: var(--codec-green-dim);
    position: absolute;
    top: 100px;
    left: -80px;
    transform: rotate(45deg);
  }

  .vinyl-control {
    background: transparent;
    border: 1px solid var(--codec-green);
    color: var(--codec-green);
    padding: 0.75rem 2rem;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.9rem;
    cursor: pointer;
    letter-spacing: 0.1em;
    transition: all 0.3s;
  }

  .vinyl-control:hover {
    background: var(--codec-green);
    color: var(--bg-black);
    box-shadow: 0 0 20px var(--codec-green-glow);
  }

  @media (max-width: 1024px) {
    .music-content {
      grid-template-columns: 1fr;
      gap: 3rem;
    }

    .vinyl-player {
      width: 280px;
      height: 280px;
    }
  }

  @media (max-width: 480px) {
    .vinyl-player {
      width: 220px;
      height: 220px;
    }
  }
</style>
