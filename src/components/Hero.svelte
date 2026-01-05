<script>
    export let scrollTo;
    export let showAlterEgo;
    export let toggleAlterEgo;

    function getRandomChar() {
        const chars =
            "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789";
        return chars[Math.floor(Math.random() * chars.length)];
    }
</script>

<section id="hero" class="section hero">
    <div class="hero-content">
        <div
            class="hero-portrait"
            on:click={toggleAlterEgo}
            on:keypress={toggleAlterEgo}
        >
            <div class="portrait-frame" class:dark={showAlterEgo}>
                <div class="portrait-inner" class:flipped={showAlterEgo}>
                    <div class="portrait-face front">
                        <div class="silhouette">
                            <div class="glitch-lines"></div>
                        </div>
                    </div>
                    <div class="portrait-face back">
                        <div class="alter-ego">
                            <div class="alter-ego-code">
                                {#each Array(8) as _, i}
                                    <span
                                        class="code-char"
                                        style="animation-delay: {i * 0.1}s"
                                        >{getRandomChar()}</span
                                    >
                                {/each}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p class="portrait-hint">
                [<u style="color: yellow">CLICK</u> TO TOGGLE <b>ALTER EGO</b>]
            </p>
        </div>

        <div class="hero-text">
            <div class="hero-tagline">
                {showAlterEgo
                    ? "ALTERNATIVE DIGITAL ARTIST"
                    : "ALGORITHMIC MUSIC PRODUCER"}
            </div>
            <h1 class="hero-title glow-text">
                <span class="title-name">
                    {showAlterEgo ? "VJ" : "DJ"}
                    {showAlterEgo ? "AnimeTrix" : "AnnieMatrix"}</span
                >
            </h1>
            <p class="hero-description">
                analog <i class="alert-red">Soul</i> in digital
                <i class="alert-red">Skin</i>.<br />
                conducting
                <b>{showAlterEgo ? "visual revolution" : "sonic warfare"}</b>
                against
                <b
                    >{showAlterEgo
                        ? "digital oppression"
                        : "algorithmic tyranny"}</b
                >.<br />
                <span class="alert-red">transmitting from my server://</span>
            </p>
            <div class="hero-status">
                <span class="status-indicator"></span>
                <span class="status-text">Connection Status: PERSISTENT</span>
            </div>
        </div>
    </div>

    <div
        class="scroll-indicator"
        on:click={() => scrollTo(showAlterEgo ? "art" : "music")}
        on:keypress={() => scrollTo(showAlterEgo ? "art" : "music")}
    >
        <span class="scroll-text"
            >SCROLL_TO_{showAlterEgo ? "VISUALS" : "FREQUENCIES"}</span
        >
        <span class="scroll-arrow">▼</span>
    </div>
</section>

<style>
    .hero {
        position: relative;
        justify-content: center;
        align-items: center;
        text-align: center;

        padding: 48px;
        min-height: 100vh;
        display: flex;
    }

    .hero-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3rem;
        margin-top: -14vh;
    }

    .hero-portrait {
        cursor: pointer;
    }

    .portrait-frame {
        width: 250px;
        height: 300px;
        border: 1px solid #000;
        position: relative;
        perspective: 777px;
        transition: box-shadow 0.7s ease-in-out;
    }
    .portrait-frame:hover {
        box-shadow: 0px 0px 69px -33px yellow;
    }
    .portrait-frame.dark:hover {
        box-shadow: 0px 0px 69px -33px hotpink;
    }

    .portrait-frame::before,
    .portrait-frame::after {
        content: "";
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
        background: url("/ava/dj.png") center/cover no-repeat;
        align-items: flex-end;
        color: red;
    }

    .portrait-face.back {
        transform: rotateY(180deg);
        background: url("/ava/vj.png") center/cover no-repeat;
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
            var(--theme-03) 2px,
            var(--theme-03) 4px
        );
    }

    .alter-ego {
        text-align: center;
        font-family: "VT323", monospace;
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
        opacity: 1;
        letter-spacing: 0.1em;
    }

    .hero-text {
        max-width: 800px;
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
        font-family: "VT323", monospace;
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

        z-index: -9;
        bottom: 4rem;
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
        color: yellow;
    }

    .scroll-text {
        font-size: 0.75rem;
        letter-spacing: 0.2em;
    }

    .scroll-arrow {
        animation: bounce 2s ease-in-out infinite;
    }

    @keyframes bounce {
        0%,
        100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(5px);
        }
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

    #hero {
        padding: 16px;
    }
    .hero-content {
        transform: scale(0.7);
    }

    /* For Screen height < 640px */
    @media (min-height: 800px) {
        #hero {
            padding: 48px;
        }
        .hero-content {
            transform: scale(1);
        }
    }
</style>
