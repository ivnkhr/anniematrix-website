<script>
  export let currentSection;
  export let scrollTo;

  const navLinks = [
    { id: 'hero', label: 'HOME' },
    { id: 'music', label: 'MUSIC' },
    { id: 'art', label: 'ART' },
    { id: 'socials', label: 'CONNECT' },
  ];
</script>

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

<style>
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

  @media (max-width: 768px) {
    .nav {
      padding: 0.75rem 1rem;
    }

    .nav-links {
      display: none;
    }

    .nav-time {
      display: none;
    }
  }
</style>
