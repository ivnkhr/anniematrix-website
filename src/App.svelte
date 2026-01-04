<script>
  import { onMount } from 'svelte';
  import Navigation from './components/Navigation.svelte';
  import Hero from './components/Hero.svelte';
  import Music from './components/Music.svelte';
  import Art from './components/Art.svelte';
  import Socials from './components/Socials.svelte';

  let currentSection = 'hero';
  let glitchActive = false;

  function scrollTo(sectionId) {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }

  function getRandomChar() {
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';
    return chars[Math.floor(Math.random() * chars.length)];
  }

  let rainColumns = [];
  let mounted = false;

  onMount(() => {
    mounted = true;

    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.95) {
        glitchActive = true;
        setTimeout(() => glitchActive = false, 150);
      }
    }, 2000);

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
      clearInterval(glitchInterval);
      observer.disconnect();
    };
  });

  $: if (mounted) {
    rainColumns = Array.from({ length: 30 }, () => ({
      chars: Array.from({ length: 20 }, () => getRandomChar()),
      speed: 0.5 + Math.random() * 2,
      delay: Math.random() * 5
    }));
  }
</script>

<main class:glitch={glitchActive}>
  <div class="crt-flicker"></div>
  <div class="scanline-moving"></div>

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

  <Navigation currentSection={currentSection} {scrollTo} />
  <Hero {scrollTo} />
  <Music />
  <Art />
  <Socials />
</main>

<style>
  main {
    position: relative;
    z-index: 1;
  }

  main.glitch {
    animation: glitch 0.15s ease-in-out;
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

  @media (max-width: 768px) {
    .digital-rain {
      display: none;
    }
  }
</style>
