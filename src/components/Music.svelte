<script>
    import { isMusicPlaying } from "../stores/musicStore.js";

    let vinylRotation = 0;
    let isVinylSpinning = false;
    let vinylInterval;

    // Audio player state
    let audio;
    let currentTrack = null;
    let currentTrackName = "Only I AM";
    let isPlaying = false;

    // Update store when isPlaying changes
    $: isMusicPlaying.set(isPlaying);

    // Vinyl background mapping
    $: vinylBackground = currentTrackName
        ? `/img/abm_art/${currentTrackName}.jpg`
        : "/img/abm_art/Only I AM.jpg";

    // Reactive player status
    $: playerStatus =
        isPlaying && currentTrack
            ? `NOW PLAYING: ${currentTrackName}`
            : "SELECT THE TRACK TO LISTEN & ENJOY";

    function startVinylAnimation() {
        vinylInterval = setInterval(() => {
            if (isVinylSpinning) {
                vinylRotation = (vinylRotation + 0.5) % 360;
            }
        }, 16);
    }

    function handlePlayPause() {
        if (!currentTrack) {
            // Load default track if nothing is loaded
            handleTrackClick("Only I AM.mp3", "Only I AM");
        } else if (isPlaying) {
            // Pause
            audio.pause();
            isPlaying = false;
            isVinylSpinning = false;
        } else {
            // Play
            audio.play();
            isPlaying = true;
            isVinylSpinning = true;
        }
    }

    function handleTrackClick(trackFilename, trackName) {
        currentTrack = trackFilename;
        currentTrackName = trackName;
        audio.src = `/mus/${trackFilename}`;
        audio.load();
        audio.play();
        isPlaying = true;
        isVinylSpinning = true;
    }

    function handleTrackEnd() {
        isPlaying = false;
        isVinylSpinning = false;
    }

    function stopAudio() {
        if (audio && isPlaying) {
            audio.pause();
            isPlaying = false;
            isVinylSpinning = false;
        }
    }

    // Listen for stopAudio event from Art component
    if (typeof window !== "undefined") {
        window.addEventListener("stopAudio", stopAudio);
    }

    startVinylAnimation();
</script>

<audio bind:this={audio} on:ended={handleTrackEnd}></audio>

<section id="music" class="section music">
    <div class="section-header">
        <h2 class="section-title">AUDIO_FREQUENCIES</h2>
        <div class="section-line"></div>
    </div>

    <div class="music-content">
        <div class="music-player">
            <div class="player-frame">
                <div class="player-header">
                    <span class="player-icon">//_</span>
                    <span class="player-status">{playerStatus}</span>
                    <span class="player-title">
                        <button
                            class="vinyl-control"
                            on:click={handlePlayPause}
                        >
                            {isPlaying ? "◼ PAUSE" : "▶ PLAY"}
                        </button>
                    </span>
                </div>
            </div>

            <div class="player-tracklist">
                <div class="tracklist-header">SONIC_TRANSMISSIONS</div>
                <ul class="tracklist">
                    <li
                        class="track"
                        data-track="Only I AM.mp3"
                        class:currently_playing={currentTrack ===
                            "Only I AM.mp3"}
                        on:click={() =>
                            handleTrackClick("Only I AM.mp3", "Only I AM")}
                    >
                        <span class="track-num">000</span>
                        <span class="track-name">Only I AM</span>
                        <span class="track-duration">04:55</span>
                    </li>
                    <li
                        class="track"
                        data-track="NoAngel.mp3"
                        class:currently_playing={currentTrack === "NoAngel.mp3"}
                        on:click={() =>
                            handleTrackClick("NoAngel.mp3", "NoAngel")}
                    >
                        <span class="track-num">007</span>
                        <span class="track-name">NoAngel</span>
                        <span class="track-duration">03:33</span>
                    </li>
                    <li
                        class="track"
                        data-track="HYPNOTYSIS.mp3"
                        class:currently_playing={currentTrack ===
                            "HYPNOTYSIS.mp3"}
                        on:click={() =>
                            handleTrackClick("HYPNOTYSIS.mp3", "HYPNOTYSIS")}
                    >
                        <span class="track-num">999</span>
                        <span class="track-name">HYPNOTYSIS</span>
                        <span class="track-duration">05:21</span>
                    </li>
                    <li class="track soundcloud-more">
                        <span class="track-num">...</span>
                        <span class="track-name"
                            >Find more @ YOUTUBE / SOUNDCLOUD / BANDCAMP</span
                        >
                        <span class="track-duration"
                            >scroll to <u>Learn More</u></span
                        >
                    </li>
                </ul>
            </div>
        </div>

        <div class="vinyl-container">
            <div class="vinyl-player">
                <div class="vinyl-platter">
                    <div
                        class="vinyl-record"
                        style="transform: rotate({vinylRotation}deg); background-image: url('{vinylBackground}')"
                        class:paused={!isVinylSpinning}
                    >
                        <div class="vinyl-label">
                            <div class="vinyl-label-text">
                                <span class="vinyl-artist">DJ ANNIEMATRIX</span>
                                <span class="vinyl-album"
                                    >{currentTrackName || "Only I AM"}</span
                                >
                            </div>
                            <div class="vinyl-center-hole"></div>
                        </div>
                        <div class="vinyl-grooves"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    .music {
        background: linear-gradient(
            to bottom,
            transparent,
            var(--theme-02),
            transparent
        );
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
        border-bottom: 1px solid var(--theme-3);
        font-size: 0.85rem;
        justify-content: space-between;
        flex-wrap: nowrap;
        flex-direction: row;
    }

    .player-icon {
        color: var(--codec-green);
    }

    .player-title {
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
        border: 1px solid var(--theme-3);
    }

    .tracklist-header {
        padding: 0.75rem 1rem;
        font-size: 0.85rem;
        letter-spacing: 0.1em;
        border-bottom: 1px solid var(--theme-3);
        opacity: 0.7;
    }

    .tracklist {
        list-style: none;
    }

    .track {
        display: flex;
        align-items: center;
        padding: 0.75rem 1rem;
        border-bottom: 1px solid var(--theme-1);
        transition: background 0.3s;
    }

    .track:last-child {
        border-bottom: none;
    }

    .track:hover {
        background: var(--theme-05);
        cursor: pointer;
    }

    .track.currently_playing {
        background: var(--theme-05);
        border-left: 3px solid var(--codec-green);
    }

    .track.soundcloud-more {
        cursor: default;
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
        background: #111;
        border: 2px solid #000;
    }

    .vinyl-platter {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: #222;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow:
            0 0 0 10px black,
            0 0 0 12px lime,
            0 0 30px black;
    }

    .vinyl-record {
        width: 98%;
        height: 98%;
        border-radius: 50%;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        box-shadow: inset 0 0 100px rgba(0, 0, 0, 0.5);
    }

    .vinyl-record::before {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: 50%;
        background: repeating-radial-gradient(
            circle at center,
            transparent 0px,
            transparent 2px,
            rgba(0, 0, 0, 0.3) 2px,
            rgba(0, 0, 0, 0.3) 4px
        );
        pointer-events: none;
    }

    .vinyl-record.paused {
        filter: grayscale(100%);
    }

    .vinyl-label {
        width: 35%;
        height: 35%;
        border-radius: 50%;
        background: var(--bg-black);
        border: 2px solid pink;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }

    .vinyl-label-text {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-family: "VT323", monospace;
        font-size: 0.99rem;
        letter-spacing: 0.1em;
        text-align: center;
        gap: 12px;
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
        font-family: "Share Tech Mono", monospace;
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
