<script>
    import { onMount } from "svelte";
    import Hero from "./components/Hero.svelte";
    import Music from "./components/Music.svelte";
    import Art from "./components/Art.svelte";
    import Socials from "./components/Socials.svelte";

    let showAlterEgo = false;
    let glitchActive = false;

    function scrollTo(sectionId) {
        document
            .getElementById(sectionId)
            ?.scrollIntoView({ behavior: "smooth" });
    }

    function toggleAlterEgo() {
        showAlterEgo = !showAlterEgo;
    }

    // Reactive color theming
    $: themeColor = showAlterEgo ? "#FF1744" : "#00FF41";
    $: themeColorGlow = showAlterEgo
        ? "rgba(255, 23, 68, 0.4)"
        : "rgba(0, 255, 65, 0.4)";
    $: scanlineColor = showAlterEgo
        ? "rgba(255, 23, 68, 0.1)"
        : "rgba(0, 255, 65, 0.1)";
    $: themeColor02 = showAlterEgo
        ? "rgba(255, 23, 68, 0.02)"
        : "rgba(0, 255, 65, 0.02)";
    $: themeColor03 = showAlterEgo
        ? "rgba(255, 23, 68, 0.03)"
        : "rgba(0, 255, 65, 0.03)";
    $: themeColor05 = showAlterEgo
        ? "rgba(255, 23, 68, 0.05)"
        : "rgba(0, 255, 65, 0.05)";
    $: themeColor1 = showAlterEgo
        ? "rgba(255, 23, 68, 0.1)"
        : "rgba(0, 255, 65, 0.1)";
    $: themeColor2 = showAlterEgo
        ? "rgba(255, 23, 68, 0.2)"
        : "rgba(0, 255, 65, 0.2)";
    $: themeColor3 = showAlterEgo
        ? "rgba(255, 23, 68, 0.3)"
        : "rgba(0, 255, 65, 0.3)";

    function getRandomChar() {
        console.log("run");
        const chars =
            "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789";
        return chars[Math.floor(Math.random() * chars.length)];
    }

    let rainColumns = [];
    let mounted = false;

    onMount(() => {
        mounted = true;

        const glitchInterval = setInterval(() => {
            if (Math.random() > 0.95) {
                glitchActive = true;
                setTimeout(() => (glitchActive = false), 250);
            }
        }, 80);

        return () => {
            clearInterval(glitchInterval);
        };
    });

    $: if (mounted) {
        rainColumns = Array.from({ length: 20 }, () => {
            const baseSpeed = Math.random();
            const speed =
                baseSpeed < 0.3
                    ? 0.3 + Math.random() * 1 // Fast: 0.3-1.3s (30%)
                    : baseSpeed < 0.7
                      ? 1.5 + Math.random() * 2 // Medium: 1.5-3.5s (40%)
                      : 3 + Math.random() * 4; // Slow: 3-7s (30%)

            const delay = Math.random() * 10; // 0-10s staggered delays
            const charCount = 15 + Math.floor(Math.random() * 15); // 15-30 chars

            return {
                chars: Array.from({ length: charCount }, () => getRandomChar()),
                speed,
                delay,
            };
        });
    }
</script>

<main
    class:glitch={glitchActive}
    style="--codec-green: {themeColor}; --codec-green-glow: {themeColorGlow}; --theme-02: {themeColor02}; --theme-03: {themeColor03}; --theme-05: {themeColor05}; --theme-1: {themeColor1}; --theme-2: {themeColor2}; --theme-3: {themeColor3};"
>
    <div class="crt-flicker"></div>
    <div
        class="scanline-moving"
        style="background: linear-gradient(to bottom, transparent, {scanlineColor}, transparent);"
    ></div>

    <div class="digital-rain" aria-hidden="true">
        {#each rainColumns as column, i}
            <div
                class="rain-column"
                style="left: {(i / rainColumns.length) *
                    100}%; animation-duration: {column.speed +
                    3}s; animation-delay: {column.delay}s;
                    "
            >
                {#each column.chars as char, j}
                    <span style="opacity: {(j - 10) / 10}"
                        >{j ? char : "X"}</span
                    >
                {/each}
            </div>
        {/each}
    </div>

    <Hero {scrollTo} {showAlterEgo} {toggleAlterEgo} />
    <div class:hidden={showAlterEgo}>
        <Music />
    </div>
    <div class:hidden={!showAlterEgo}>
        <Art />
    </div>
    <Socials />
</main>

<style>
    main {
        position: relative;
        z-index: 1;
    }

    .hidden {
        display: none;
    }

    .crt-flicker {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: transparent;
        pointer-events: none;
        z-index: 9996;
        animation: flicker 4s infinite;
    }

    .scanline-moving {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        pointer-events: none;
        z-index: 9999;
        animation: scanline 12s linear infinite;
    }

    .digital-rain {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
        pointer-events: none;
        z-index: 0;
        opacity: 0.44;
    }

    .rain-column {
        position: absolute;
        top: -100%;
        display: flex;
        flex-direction: column;
        animation: rain-fall linear infinite;

        font-family: "VT323", monospace;
        font-size: 1.2rem;
        color: var(--codec-green);
        align-items: center;
        justify-content: center;
    }

    .rain-column span {
        opacity: 0.3;
    }

    .rain-column span:first-child {
        opacity: 1;
        text-shadow: 0 0 10px var(--codec-green);
    }

    @keyframes rain-fall {
        0% {
            transform: translateY(-100%);
        }
        100% {
            transform: translateY(200vh);
        }
    }

    .section {
        min-height: 100vh;
        padding: 6rem 2rem;
        display: flex;
        flex-direction: column;
        position: relative;
    }

    @media (max-width: 768px) {
        .digital-rain {
            display: none;
        }

        .section {
            padding: 4rem 1.5rem;
        }
    }
</style>
