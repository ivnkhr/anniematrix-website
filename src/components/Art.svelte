<script>
  const artworks = [
    { id: 1, title: 'FREQUENCY_001', src: '/art/freq001.jpg', alt: 'Abstract frequency visualization' },
    { id: 2, title: 'CODEC_DREAMS', src: '/art/codec.jpg', alt: 'Digital rain composition' },
    { id: 3, title: 'SILENT_TRANSMISSION', src: '/art/silent.jpg', alt: 'Noir electronic atmosphere' },
    { id: 4, title: 'PSX_MEMORY', src: '/art/psx.jpg', alt: 'Retro gaming aesthetic' },
    { id: 5, title: 'MIDNIGHT_PROTOCOL', src: '/art/midnight.jpg', alt: 'Tactical minimalist design' },
    { id: 6, title: 'ANALOG_GHOST', src: '/art/analog.jpg', alt: 'VHS degradation art' },
  ];

  let selectedArtIndex = 0;

  function selectArtwork(index) {
    selectedArtIndex = index;
  }
</script>

<section id="art" class="section art">
  <div class="section-header">
    <h2 class="section-title">◫ VISUAL_TRANSMISSIONS</h2>
    <div class="section-line"></div>
  </div>

  <div class="art-content">
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

<style>
  .section {
    min-height: 100vh;
    padding: 6rem 2rem;
    display: flex;
    flex-direction: column;
    position: relative;
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

  @media (max-width: 1024px) {
    .art-content {
      grid-template-columns: 1fr;
      gap: 3rem;
    }
  }

  @media (max-width: 768px) {
    .gallery-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 480px) {
    .gallery-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
