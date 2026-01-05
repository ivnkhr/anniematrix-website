<script>
    import { onMount } from "svelte";
    import { isMusicPlaying } from "../stores/musicStore.js";

    let artworks = [];
    let currentPage = 0;
    let selectedArtIndex = null; // null means no selection, show iframe
    const itemsPerPage = 4;
    let selectedArtToggle = false;

    // Calculate total pages
    $: totalPages = Math.ceil(artworks.length / itemsPerPage);

    // Get current page items
    $: currentPageItems = artworks.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage,
    );

    onMount(async () => {
        // Load artworks from JSON
        const response = await fetch("/img/list.json");
        artworks = await response.json();
    });

    function selectArtwork(index) {
        selectedArtToggle = false;
        setTimeout(() => {
            selectedArtToggle = true;
            selectedArtIndex = index;
        }, 500);

        // stopAudio();
    }

    function nextPage() {
        if (currentPage < totalPages - 1) {
            currentPage++;
        }
    }

    function prevPage() {
        if (currentPage > 0) {
            currentPage--;
        }
    }

    function stopAudio() {
        // Dispatch event to stop audio playback
        window.dispatchEvent(new CustomEvent("stopAudio"));
    }

    function handleIframeClick(event) {
        console.log("Iframe container clicked");
        stopAudio();
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
                {#if selectedArtIndex === null}
                    <!-- Default YouTube iframe -->
                    <div
                        class="iframe-container"
                        on:mousedown={handleIframeClick}
                        on:pointerdown={handleIframeClick}
                    >
                        <div
                            class="iframe-overlay"
                            class:no-music={!$isMusicPlaying}
                            on:click={handleIframeClick}
                        ></div>
                        <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/lykrZ2ipCsY?si=v61zKd-xbLs2Kouz"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin"
                            allowfullscreen
                        ></iframe>
                    </div>
                {:else}
                    <!-- Selected artwork -->
                    <div
                        class="preview-image"
                        class:active={selectedArtToggle &&
                            selectedArtIndex !== null}
                        style="background-image: url({artworks[selectedArtIndex]
                            .url})"
                    >
                        <div class="preview-noise"></div>
                        <div class="preview-fallback">
                            <div class="fallback-grid">
                                {#each Array(16) as _}
                                    <div class="grid-cell"></div>
                                {/each}
                            </div>
                            <span class="fallback-text"
                                >{artworks[selectedArtIndex].name}</span
                            >
                        </div>
                    </div>
                    <div class="preview-info">
                        <span class="preview-index"
                            >[{String(selectedArtIndex + 1).padStart(
                                2,
                                "0",
                            )}/{String(artworks.length).padStart(2, "0")}]</span
                        >
                        <span class="preview-title"
                            >{artworks[selectedArtIndex].name}</span
                        >
                    </div>
                {/if}
            </div>
        </div>

        <div class="art-gallery">
            <div class="gallery-controls">
                <div class="pagination">
                    <button
                        class="nav-btn"
                        on:click={prevPage}
                        disabled={currentPage === 0}
                    >
                        &lt;
                    </button>
                    <span class="page-info">
                        {currentPage + 1}/{totalPages}
                    </span>
                    <button
                        class="nav-btn"
                        on:click={nextPage}
                        disabled={currentPage >= totalPages - 1}
                    >
                        &gt;
                    </button>
                </div>
                <div class="gallery-header">SELECT_VISUAL</div>
            </div>

            <div class="gallery-grid">
                {#each currentPageItems as artwork, i}
                    {@const globalIndex = currentPage * itemsPerPage + i}
                    <button
                        class="gallery-item"
                        class:selected={selectedArtIndex === globalIndex}
                        on:click={() => selectArtwork(globalIndex)}
                    >
                        <div
                            class="gallery-thumb"
                            style="background-image: url({artwork.url})"
                        >
                            <div class="thumb-fallback">
                                <span
                                    >{String(globalIndex + 1).padStart(
                                        2,
                                        "0",
                                    )}</span
                                >
                            </div>
                        </div>
                        <div class="gallery-label">{artwork.name}</div>
                    </button>
                {/each}
            </div>
        </div>
    </div>
</section>

<style>
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
        background: linear-gradient(
            to bottom,
            transparent,
            var(--theme-02),
            transparent
        );
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
        margin-bottom: 32px;
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

    .iframe-container {
        width: 100%;
        height: 100%;
        position: relative;
        cursor: pointer;
    }

    .iframe-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 5;
        opacity: 0.9;
        background-color: #51515178;
    }
    .iframe-overlay:hover {
        opacity: 0.777;
        background-color: #22222278;
    }
    .iframe-overlay.no-music {
        opacity: 1 !important;
        background-color: transparent;
    }

    .iframe-overlay.no-music {
        pointer-events: none;
    }

    .iframe-container iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
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
        transition: opacity 0.5s ease-in;
    }

    .preview-image.active {
        opacity: 1;
    }

    .preview-image.active .preview-fallback {
        opacity: 0;
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
        opacity: 1;
        transition: opacity 0.3s ease-in;
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
        background: var(--theme-1);
        border: 1px solid var(--theme-2);
    }

    .fallback-text {
        font-family: "VT323", monospace;
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
        background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
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
        margin-top: -3.1rem;
    }

    .gallery-controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid var(--theme-3);
    }

    .pagination {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }

    .nav-btn {
        background: transparent;
        border: 1px solid var(--theme-3);
        color: var(--codec-green);
        padding: 0.25rem 0.75rem;
        cursor: pointer;
        font-family: "Share Tech Mono", monospace;
        font-size: 1rem;
        transition: all 0.3s;
    }

    .nav-btn:hover:not(:disabled) {
        border-color: var(--codec-green);
        box-shadow: 0 0 10px var(--theme-2);
    }

    .nav-btn:disabled {
        opacity: 0.3;
        cursor: not-allowed;
    }

    .page-info {
        font-size: 0.85rem;
        letter-spacing: 0.1em;
        opacity: 0.7;
        min-width: 60px;
        text-align: center;
    }

    .gallery-header {
        font-size: 0.85rem;
        letter-spacing: 0.1em;
        opacity: 0.7;
    }

    .gallery-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
    }

    .gallery-item {
        background: transparent;
        border: 1px solid var(--theme-3);
        padding: 0;
        cursor: pointer;
        transition: all 0.3s;
    }

    .gallery-item:hover,
    .gallery-item.selected {
        border-color: var(--codec-green);
        box-shadow: 0 0 15px var(--theme-2);
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
        font-family: "VT323", monospace;
        font-size: 1.5rem;
        color: var(--codec-green);
        opacity: 0.5;
        transition: opacity 0.2s ease-out;
    }
    .thumb-fallback:hover {
        opacity: 0.2;
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
