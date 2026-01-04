<script>
  export let scrollTo;

  let showAlterEgo = false;

  function toggleAlterEgo() {
    showAlterEgo = !showAlterEgo;
  }

  function getRandomChar() {
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';
    return chars[Math.floor(Math.random() * chars.length)];
  }
</script>

<section id="hero" class="section hero">
  <div class="hero-content">
    <div class="hero-portrait" on:click={toggleAlterEgo} on:keypress={toggleAlterEgo}>
      <div class="portrait-frame">
        <div class="portrait-inner" class:flipped={showAlterEgo}>
          <div class="portrait-face front">
            <div class="silhouette">
              <svg viewBox="0 0 200 300" class="silhouette-svg">
                <defs>
                  <linearGradient id="silhouetteGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:var(--codec-green);stop-opacity:0.3" />
                    <stop offset="100%" style="stop-color:var(--codec-green);stop-opacity:0.1" />
                  </linearGradient>
                </defs>
                <ellipse cx="100" cy="60" rx="40" ry="50" fill="url(#silhouetteGrad)" stroke="var(--codec-green)" stroke-width="1"/>
                <path d="M55 40 Q50 80 60 100 L140 100 Q150 80 145 40 Q130 20 100 15 Q70 20 55 40" fill="var(--codec-green)" opacity="0.4"/>
                <path d="M60 100 Q40 120 35 180 L165 180 Q160 120 140 100" fill="url(#silhouetteGrad)" stroke="var(--codec-green)" stroke-width="1"/>
              </svg>
              <div class="glitch-lines"></div>
            </div>
          </div>
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

<style>
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

  @media (max-width: 768px) {
    .hero-content {
      gap: 2rem;
    }

    .portrait-frame {
      width: 200px;
      height: 250px;
    }
  }

  @media (max-width: 480px) {
    .hero-title {
      font-size: 2rem;
    }
  }
</style>
