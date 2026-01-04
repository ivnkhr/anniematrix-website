<script>
  import { onMount } from 'svelte';
  
  // State management
  let mounted = false;
  let currentSection = 'hero';
  let selectedArtIndex = 0;
  let vinylRotation = 0;
  let isVinylSpinning = true;
  let glitchActive = false;
  let showAlterEgo = false;
  
  // Art gallery data (placeholder - replace with actual images)
  const artworks = [
    { id: 1, title: 'FREQUENCY_001', src: '/art/freq001.jpg', alt: 'Abstract frequency visualization' },
    { id: 2, title: 'CODEC_DREAMS', src: '/art/codec.jpg', alt: 'Digital rain composition' },
    { id: 3, title: 'SILENT_TRANSMISSION', src: '/art/silent.jpg', alt: 'Noir electronic atmosphere' },
    { id: 4, title: 'PSX_MEMORY', src: '/art/psx.jpg', alt: 'Retro gaming aesthetic' },
    { id: 5, title: 'MIDNIGHT_PROTOCOL', src: '/art/midnight.jpg', alt: 'Tactical minimalist design' },
    { id: 6, title: 'ANALOG_GHOST', src: '/art/analog.jpg', alt: 'VHS degradation art' },
  ];
  
  // Navigation links
  const navLinks = [
    { id: 'hero', label: 'HOME' },
    { id: 'music', label: 'MUSIC' },
    { id: 'art', label: 'ART' },
    { id: 'socials', label: 'CONNECT' },
  ];
  
  // Social links
  const socials = [
    { name: 'SOUNDCLOUD', url: 'https://soundcloud.com/djanniematrix', icon: '◉' },
    { name: 'INSTAGRAM', url: 'https://instagram.com/djanniematrix', icon: '◫' },
    { name: 'THREADS', url: 'https://threads.net/djanniematrix', icon: '◈' },
    { name: 'BANDCAMP', url: 'https://djanniematrix.bandcamp.com', icon: '◆' },
  ];
  
  // Vinyl animation
  let vinylInterval;
  
  onMount(() => {
    mounted = true;
    
    // Vinyl spinning animation
    vinylInterval = setInterval(() => {
      if (isVinylSpinning) {
        vinylRotation = (vinylRotation + 0.5) % 360;
      }
    }, 16);
    
    // Random glitch effect
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.95) {
        glitchActive = true;
        setTimeout(() => glitchActive = false, 150);
      }
    }, 2000);
    
    // Intersection observer for section tracking
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          currentSection = entry.target.id;
        }
      });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });
    
    return () => {
      clearInterval(vinylInterval);
      clearInterval(glitchInterval);
      observer.disconnect();
    };
  });
  
  function selectArtwork(index) {
    selectedArtIndex = index;
  }
  
  function toggleAlterEgo() {
    showAlterEgo = !showAlterEgo;
  }
  
  function scrollTo(sectionId) {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }
  
  // Generate digital rain characters
  function getRandomChar() {
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';
    return chars[Math.floor(Math.random() * chars.length)];
  }
  
  let rainColumns = [];
  $: if (mounted) {
    rainColumns = Array.from({ length: 30 }, () => ({
      chars: Array.from({ length: 20 }, () => getRandomChar()),
      speed: 0.5 + Math.random() * 2,
      delay: Math.random() * 5
    }));
  }
</script>

<main class:glitch={glitchActive}>
  <!-- CRT Overlay Effects -->
  <div class="crt-flicker"></div>
  <div class="scanline-moving"></div>
  
  <!-- Digital Rain Background -->
  <div class="digital-rain" aria-hidden="true">
    {#each rainColumns as column, i}
      <div 
        class="rain-column" 
        style="left: {(i / rainColumns.length) * 100}%; animation-duration: {column.speed + 3}s; animation-delay: {column.delay}s;"
      >
        {#each column.chars as char}
          <span>{char}</span>
        {/each}
      </div>
    {/each}
  </div>
  
  <!-- Navigation -->
  <nav class="nav" class:nav-hidden={currentSection === 'hero'}>
    <div class="nav-brand" on:click={() => scrollTo('hero')} on:keypress={() => scrollTo('hero')}>
      <span class="nav-logo">▣</span>
      <span class="nav-name">ANNIEMATRIX</span>
    </div>
    <ul class="nav-links">
      {#each navLinks as link}
        <li>
          <button 
            class="nav-link" 
            class:active={currentSection === link.id}
            on:click={() => scrollTo(link.id)}
          >
            {link.label}
          </button>
        </li>
      {/each}
    </ul>
    <div class="nav-time">
      {new Date().toLocaleTimeString('en-US', { hour12: false })}
    </div>
  </nav>
  
  <!-- HERO SECTION -->
  <section id="hero" class="section hero">
    <div class="hero-content">
      <div class="hero-portrait" on:click={toggleAlterEgo} on:keypress={toggleAlterEgo}>
        <div class="portrait-frame">
          <div class="portrait-inner" class:flipped={showAlterEgo}>
            <!-- Front: Human silhouette -->
            <div class="portrait-face front">
              <div class="silhouette">
                <svg viewBox="0 0 200 300" class="silhouette-svg">
                  <defs>
                    <linearGradient id="silhouetteGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style="stop-color:var(--codec-green);stop-opacity:0.3" />
                      <stop offset="100%" style="stop-color:var(--codec-green);stop-opacity:0.1" />
                    </linearGradient>
                  </defs>
                  <!-- Head with geometric bob -->
                  <ellipse cx="100" cy="60" rx="40" ry="50" fill="url(#silhouetteGrad)" stroke="var(--codec-green)" stroke-width="1"/>
                  <!-- Bob haircut -->
                  <path d="M55 40 Q50 80 60 100 L140 100 Q150 80 145 40 Q130 20 100 15 Q70 20 55 40" fill="var(--codec-green)" opacity="0.4"/>
                  <!-- Shoulders/body -->
                  <path d="M60 100 Q40 120 35 180 L165 180 Q160 120 140 100" fill="url(#silhouetteGrad)" stroke="var(--codec-green)" stroke-width="1"/>
                </svg>
                <div class="glitch-lines"></div>
              </div>
            </div>
            <!-- Back: VJ AnimeTrix -->
            <div class="portrait-face back">
              <div class="alter-ego">
                <div class="alter-ego-text">VJ</div>
                <div class="alter-ego-name">AnimeTrix</div>
                <div class="alter-ego-code">
                  {#each Array(8) as _, i}
                    <span class="code-char" style="animation-delay: {i * 0.1}s">{getRandomChar()}</span>
                  {/each}
                </div>
              </div>
            </div>
          </div>
        </div>
        <p class="portrait-hint">[CLICK TO TOGGLE ALTER EGO]</p>
      </div>
      
      <div class="hero-text">
        <div class="hero-tagline">UNDERGROUND ELECTRONIC PRODUCER</div>
        <h1 class="hero-title glow-text">
          <span class="title-dj">DJ</span>
          <span class="title-name">AnnieMatrix</span>
        </h1>
        <div class="hero-coords">25.7617° N, 80.1918° W</div>
        <p class="hero-description">
          Analog soul in digital skin.<br/>
          Conducting sonic warfare against algorithmic tyranny.<br/>
          <span class="alert-red">Transmitting from Miami. 3 AM.</span>
        </p>
        <div class="hero-status">
          <span class="status-indicator"></span>
          <span class="status-text">SIGNAL ACTIVE</span>
        </div>
      </div>
    </div>
    
    <div class="scroll-indicator" on:click={() => scrollTo('music')} on:keypress={() => scrollTo('music')}>
      <span class="scroll-text">SCROLL_DOWN</span>
      <span class="scroll-arrow">▼</span>
    </div>
  </section>
  
  <!-- MUSIC SECTION -->
  <section id="music" class="section music">
    <div class="section-header">
      <h2 class="section-title">◉ FREQUENCIES</h2>
      <div class="section-line"></div>
    </div>
    
    <div class="music-content">
      <!-- SoundCloud Embed -->
      <div class="music-player">
        <div class="player-frame">
          <div class="player-header">
            <span class="player-icon">▶</span>
            <span class="player-title">SOUNDCLOUD_STREAM</span>
            <span class="player-status">LIVE</span>
          </div>
          <div class="player-embed">
            <!-- Replace with actual SoundCloud embed -->
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
      
      <!-- Vinyl Record -->
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
  
  <!-- ART SECTION -->
  <section id="art" class="section art">
    <div class="section-header">
      <h2 class="section-title">◫ VISUAL_TRANSMISSIONS</h2>
      <div class="section-line"></div>
    </div>
    
    <div class="art-content">
      <!-- Main Preview -->
      <div class="art-preview">
        <div class="preview-frame">
          <div class="preview-scanlines"></div>
          {#each artworks as artwork, i}
            <div 
              class="preview-image" 
              class:active={selectedArtIndex === i}
              style="background-image: url({artwork.src})"
            >
              <div class="preview-noise"></div>
              <div class="preview-fallback">
                <div class="fallback-grid">
                  {#each Array(16) as _}
                    <div class="grid-cell"></div>
                  {/each}
                </div>
                <span class="fallback-text">{artwork.title}</span>
              </div>
            </div>
          {/each}
          <div class="preview-info">
            <span class="preview-index">[{String(selectedArtIndex + 1).padStart(2, '0')}/{String(artworks.length).padStart(2, '0')}]</span>
            <span class="preview-title">{artworks[selectedArtIndex].title}</span>
          </div>
        </div>
      </div>
      
      <!-- Gallery Grid -->
      <div class="art-gallery">
        <div class="gallery-header">SELECT_VISUAL</div>
        <div class="gallery-grid">
          {#each artworks as artwork, i}
            <button 
              class="gallery-item" 
              class:selected={selectedArtIndex === i}
              on:click={() => selectArtwork(i)}
            >
              <div class="gallery-thumb" style="background-image: url({artwork.src})">
                <div class="thumb-fallback">
                  <span>{String(i + 1).padStart(2, '0')}</span>
                </div>
              </div>
              <div class="gallery-label">{artwork.title}</div>
            </button>
          {/each}
        </div>
      </div>
    </div>
  </section>
  
  <!-- SOCIALS SECTION -->
  <section id="socials" class="section socials">
    <div class="section-header">
      <h2 class="section-title">◈ CONNECT</h2>
      <div class="section-line"></div>
    </div>
    
    <div class="socials-content">
      <div class="socials-grid">
        {#each socials as social}
          <a 
            href={social.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            class="social-link"
          >
            <span class="social-icon">{social.icon}</span>
            <span class="social-name">{social.name}</span>
            <span class="social-arrow">→</span>
          </a>
        {/each}
      </div>
      
      <div class="contact-info">
        <div class="contact-block">
          <span class="contact-label">BOOKING_INQUIRIES</span>
          <span class="contact-value">booking@djanniematrix.com</span>
        </div>
        <div class="contact-block">
          <span class="contact-label">LOCATION</span>
          <span class="contact-value">MIAMI, FL | 25.7617° N, 80.1918° W</span>
        </div>
        <div class="contact-block">
          <span class="contact-label">TRANSMISSION_HOURS</span>
          <span class="contact-value">3:00 - 6:00 EST</span>
        </div>
      </div>
      
      <div class="terminal-prompt">
        <span class="prompt-cursor">▮</span>
        <span class="prompt-text">I don't perform—I transmit frequencies.</span>
      </div>
    </div>
    
    <footer class="footer">
      <div class="footer-line"></div>
      <div class="footer-content">
        <span class="footer-copyright">© 2025 DJ ANNIEMATRIX</span>
        <span class="footer-tagline">ANALOG SOUL. DIGITAL SKIN.</span>
        <span class="footer-freq">140.85 MHz</span>
      </div>
    </footer>
  </section>
</main>

<style>
  /* Main Layout */
  main {
    position: relative;
    z-index: 1;
  }
  
  main.glitch {
    animation: glitch 0.15s ease-in-out;
  }
  
  .section {
    min-height: 100vh;
    padding: 6rem 2rem;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  
  /* CRT Effects */
  .crt-flicker {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: transparent;
    pointer-events: none;
    z-index: 9996;
    animation: flicker 8s infinite;
  }
  
  .scanline-moving {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(
      to bottom,
      transparent,
      rgba(0, 255, 65, 0.1),
      transparent
    );
    pointer-events: none;
    z-index: 9999;
    animation: scanline 8s linear infinite;
  }
  
  /* Digital Rain */
  .digital-rain {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    pointer-events: none;
    z-index: 0;
    opacity: 0.15;
  }
  
  .rain-column {
    position: absolute;
    top: -100%;
    display: flex;
    flex-direction: column;
    animation: rain-fall linear infinite;
    font-family: 'VT323', monospace;
    font-size: 1.2rem;
    color: var(--codec-green);
  }
  
  .rain-column span {
    opacity: 0.3;
  }
  
  .rain-column span:first-child {
    opacity: 1;
    text-shadow: 0 0 10px var(--codec-green);
  }
  
  @keyframes rain-fall {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(200vh); }
  }
  
  /* Navigation */
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(to bottom, rgba(0,0,0,0.9), transparent);
    z-index: 100;
    transition: opacity 0.3s, transform 0.3s;
  }
  
  .nav-hidden {
    opacity: 0;
    transform: translateY(-100%);
  }
  
  .nav-brand {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }
  
  .nav-logo {
    font-size: 1.5rem;
    color: var(--codec-green);
  }
  
  .nav-name {
    font-family: 'VT323', monospace;
    font-size: 1.2rem;
    letter-spacing: 0.1em;
  }
  
  .nav-links {
    display: flex;
    list-style: none;
    gap: 2rem;
  }
  
  .nav-link {
    background: none;
    border: none;
    color: var(--codec-green);
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.9rem;
    cursor: pointer;
    padding: 0.5rem;
    position: relative;
    opacity: 0.7;
    transition: opacity 0.3s;
  }
  
  .nav-link:hover,
  .nav-link.active {
    opacity: 1;
  }
  
  .nav-link.active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: var(--codec-green);
    box-shadow: 0 0 10px var(--codec-green-glow);
  }
  
  .nav-time {
    font-family: 'VT323', monospace;
    font-size: 1.1rem;
    opacity: 0.7;
  }
  
  /* Section Headers */
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
  
  /* HERO SECTION */
  .hero {
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  
  .hero-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3rem;
  }
  
  .hero-portrait {
    cursor: pointer;
  }
  
  .portrait-frame {
    width: 250px;
    height: 300px;
    border: 1px solid var(--codec-green);
    position: relative;
    perspective: 1000px;
  }
  
  .portrait-frame::before,
  .portrait-frame::after {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    border: 1px solid var(--codec-green);
  }
  
  .portrait-frame::before {
    top: -5px;
    left: -5px;
    border-right: none;
    border-bottom: none;
  }
  
  .portrait-frame::after {
    bottom: -5px;
    right: -5px;
    border-left: none;
    border-top: none;
  }
  
  .portrait-inner {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.8s ease-in-out;
  }
  
  .portrait-inner.flipped {
    transform: rotateY(180deg);
  }
  
  .portrait-face {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg-darker);
  }
  
  .portrait-face.back {
    transform: rotateY(180deg);
  }
  
  .silhouette {
    width: 80%;
    height: 80%;
    position: relative;
  }
  
  .silhouette-svg {
    width: 100%;
    height: 100%;
  }
  
  .glitch-lines {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent 0px,
      transparent 2px,
      rgba(0, 255, 65, 0.03) 2px,
      rgba(0, 255, 65, 0.03) 4px
    );
  }
  
  .alter-ego {
    text-align: center;
    font-family: 'VT323', monospace;
  }
  
  .alter-ego-text {
    font-size: 2rem;
    opacity: 0.5;
  }
  
  .alter-ego-name {
    font-size: 2.5rem;
    letter-spacing: 0.2em;
    color: var(--codec-green);
    text-shadow: 0 0 20px var(--codec-green-glow);
  }
  
  .alter-ego-code {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    gap: 0.3rem;
  }
  
  .code-char {
    animation: blink 1s ease-in-out infinite;
    opacity: 0.6;
  }
  
  .portrait-hint {
    margin-top: 1rem;
    font-size: 0.75rem;
    opacity: 0.5;
    letter-spacing: 0.1em;
  }
  
  .hero-text {
    max-width: 600px;
  }
  
  .hero-tagline {
    font-size: 0.9rem;
    letter-spacing: 0.3em;
    opacity: 0.6;
    margin-bottom: 1rem;
  }
  
  .hero-title {
    margin-bottom: 1rem;
  }
  
  .title-dj {
    display: block;
    font-size: 0.4em;
    letter-spacing: 0.5em;
    opacity: 0.7;
  }
  
  .title-name {
    display: block;
  }
  
  .hero-coords {
    font-family: 'VT323', monospace;
    font-size: 1.2rem;
    opacity: 0.5;
    margin-bottom: 2rem;
  }
  
  .hero-description {
    line-height: 2;
    opacity: 0.8;
  }
  
  .hero-status {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    margin-top: 2rem;
  }
  
  .status-indicator {
    width: 8px;
    height: 8px;
    background: var(--codec-green);
    border-radius: 50%;
    animation: blink 2s ease-in-out infinite;
    box-shadow: 0 0 10px var(--codec-green);
  }
  
  .status-text {
    font-size: 0.85rem;
    letter-spacing: 0.2em;
    opacity: 0.7;
  }
  
  .scroll-indicator {
    position: absolute;
    bottom: 3rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    opacity: 0.5;
    transition: opacity 0.3s;
  }
  
  .scroll-indicator:hover {
    opacity: 1;
  }
  
  .scroll-text {
    font-size: 0.75rem;
    letter-spacing: 0.2em;
  }
  
  .scroll-arrow {
    animation: bounce 2s ease-in-out infinite;
  }
  
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(5px); }
  }
  
  /* MUSIC SECTION */
  .music {
    background: linear-gradient(to bottom, transparent, rgba(0, 255, 65, 0.02), transparent);
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
  
  /* Vinyl Record */
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
  
  /* ART SECTION */
  .art {
    background: linear-gradient(to bottom, transparent, rgba(0, 255, 65, 0.02), transparent);
  }
  
  .art-content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 3rem;
    flex: 1;
    max-width: 1400px;
    margin: 0 auto;
    width: 100%;
  }
  
  .art-preview {
    position: relative;
  }
  
  .preview-frame {
    aspect-ratio: 16/9;
    border: 1px solid var(--codec-green);
    position: relative;
    overflow: hidden;
    background: var(--bg-darker);
  }
  
  .preview-scanlines {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent 0px,
      transparent 1px,
      rgba(0, 0, 0, 0.3) 1px,
      rgba(0, 0, 0, 0.3) 2px
    );
    pointer-events: none;
    z-index: 10;
  }
  
  .preview-image {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-size: cover;
    background-position: center;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  }
  
  .preview-image.active {
    opacity: 1;
  }
  
  .preview-noise {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.1'/%3E%3C/svg%3E");
    pointer-events: none;
    opacity: 0.5;
  }
  
  .preview-fallback {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
  
  .fallback-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 4px;
    width: 60%;
    max-width: 200px;
  }
  
  .grid-cell {
    aspect-ratio: 1;
    background: rgba(0, 255, 65, 0.1);
    border: 1px solid rgba(0, 255, 65, 0.2);
  }
  
  .fallback-text {
    font-family: 'VT323', monospace;
    font-size: 1.5rem;
    letter-spacing: 0.2em;
    opacity: 0.5;
  }
  
  .preview-info {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
    display: flex;
    justify-content: space-between;
    z-index: 20;
    font-size: 0.9rem;
  }
  
  .preview-index {
    opacity: 0.5;
  }
  
  .preview-title {
    letter-spacing: 0.1em;
  }
  
  .art-gallery {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .gallery-header {
    font-size: 0.85rem;
    letter-spacing: 0.1em;
    opacity: 0.7;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgba(0, 255, 65, 0.3);
  }
  
  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  
  .gallery-item {
    background: transparent;
    border: 1px solid rgba(0, 255, 65, 0.3);
    padding: 0;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .gallery-item:hover,
  .gallery-item.selected {
    border-color: var(--codec-green);
    box-shadow: 0 0 15px rgba(0, 255, 65, 0.2);
  }
  
  .gallery-thumb {
    aspect-ratio: 1;
    background-size: cover;
    background-position: center;
    position: relative;
  }
  
  .thumb-fallback {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg-darker);
    font-family: 'VT323', monospace;
    font-size: 1.5rem;
    color: var(--codec-green);
    opacity: 0.5;
  }
  
  .gallery-label {
    padding: 0.5rem;
    font-size: 0.7rem;
    color: var(--codec-green);
    letter-spacing: 0.1em;
    text-align: center;
    background: var(--bg-black);
  }
  
  /* SOCIALS SECTION */
  .socials {
    justify-content: center;
  }
  
  .socials-content {
    max-width: 800px;
    margin: 0 auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 4rem;
  }
  
  .socials-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  
  .social-link {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.5rem;
    border: 1px solid rgba(0, 255, 65, 0.3);
    background: transparent;
    transition: all 0.3s;
    text-decoration: none;
  }
  
  .social-link:hover {
    border-color: var(--codec-green);
    background: rgba(0, 255, 65, 0.05);
    transform: translateX(5px);
    box-shadow: 0 0 20px rgba(0, 255, 65, 0.1);
  }
  
  .social-icon {
    font-size: 1.5rem;
    width: 40px;
    text-align: center;
  }
  
  .social-name {
    flex: 1;
    letter-spacing: 0.15em;
    font-size: 0.9rem;
  }
  
  .social-arrow {
    opacity: 0.5;
    transition: opacity 0.3s, transform 0.3s;
  }
  
  .social-link:hover .social-arrow {
    opacity: 1;
    transform: translateX(5px);
  }
  
  .contact-info {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 2rem;
    border: 1px solid rgba(0, 255, 65, 0.2);
    background: rgba(0, 255, 65, 0.02);
  }
  
  .contact-block {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .contact-label {
    font-size: 0.75rem;
    letter-spacing: 0.2em;
    opacity: 0.5;
  }
  
  .contact-value {
    font-size: 0.95rem;
  }
  
  .terminal-prompt {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1.5rem;
    border-left: 2px solid var(--codec-green);
    background: rgba(0, 255, 65, 0.03);
  }
  
  .prompt-cursor {
    animation: blink 1s step-end infinite;
    color: var(--codec-green);
  }
  
  .prompt-text {
    font-style: italic;
    opacity: 0.8;
  }
  
  /* Footer */
  .footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 2rem;
  }
  
  .footer-line {
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(0, 255, 65, 0.3), transparent);
    margin-bottom: 2rem;
  }
  
  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8rem;
    opacity: 0.5;
  }
  
  .footer-tagline {
    letter-spacing: 0.2em;
  }
  
  .footer-freq {
    font-family: 'VT323', monospace;
  }
  
  /* Mobile Responsive */
  @media (max-width: 1024px) {
    .music-content,
    .art-content {
      grid-template-columns: 1fr;
      gap: 3rem;
    }
    
    .vinyl-player {
      width: 280px;
      height: 280px;
    }
  }
  
  @media (max-width: 768px) {
    .section {
      padding: 4rem 1.5rem;
    }
    
    .nav {
      padding: 0.75rem 1rem;
    }
    
    .nav-links {
      display: none;
    }
    
    .nav-time {
      display: none;
    }
    
    .hero-content {
      gap: 2rem;
    }
    
    .portrait-frame {
      width: 200px;
      height: 250px;
    }
    
    .socials-grid {
      grid-template-columns: 1fr;
    }
    
    .gallery-grid {
      grid-template-columns: repeat(3, 1fr);
    }
    
    .footer-content {
      flex-direction: column;
      gap: 0.5rem;
      text-align: center;
    }
    
    .digital-rain {
      display: none;
    }
  }
  
  @media (max-width: 480px) {
    .hero-title {
      font-size: 2rem;
    }
    
    .vinyl-player {
      width: 220px;
      height: 220px;
    }
    
    .gallery-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
