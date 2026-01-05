<script>
    const socials = [
        {
            name: "YOUTUBE (LISTEN & WATCH)",
            url: "https://www.youtube.com/@djanniematrix",
            icon: "◉",
        },
        {
            name: "X (DIGITAL ART & CONTACT)",
            url: "https://x.com/djanniematrix",
            icon: "◫",
        },
        {
            name: "SOUNDCLOUD (WIP/CONCEPTS/SETS)",
            url: "https://soundcloud.com/djanniematrix",
            icon: "◈",
        },
        {
            name: "BANDCAMP (MUSIC RELEASES)",
            url: "https://djanniematrix.bandcamp.com",
            icon: "◆",
        },
    ];
</script>

<section id="socials" class="section socials">
    <div class="section-header">
        <h2 class="section-title">DISCOVER_&_CONNECT</h2>
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
                <span class="contact-label">CONNECTION_INTERFACE</span>
                <span class="contact-value"> djanniematrix@outlook.com</span>
            </div>
            <div class="contact-block">
                <span class="contact-label">LOCATION</span>
                <span class="contact-value">Server, EARTH | 33° N, 48° W</span>
            </div>
            <div class="contact-block">
                <span class="contact-label">TRANSMISSION_HOURS</span>
                <span class="contact-value">3:33 - 4:20 EST</span>
            </div>
        </div>

        <div class="terminal-prompt">
            <span class="prompt-cursor">▮</span>
            <span class="prompt-text"
                >I don't transmit - I transmute frequencies.</span
            >
        </div>
    </div>

    <footer class="footer">
        <div class="footer-line"></div>
        <div class="footer-content">
            <span class="footer-copyright">© 8080 DJ ANNIEMATRIX.</span>
            <span class="footer-tagline">ANALOG SOUL. DIGITAL SKIN.</span>
            <span class="footer-freq">
                <!-- hitwebcounter Code START -->
                <a href="https://www.hitwebcounter.com/" target="_blank">
                    <img
                        src="https://hitwebcounter.com/counter/counter.php?page=21467381&style=0007&nbdigits=4&type=ip&initCount=777"
                        title="Free Tools"
                        Alt="Free Tools"
                        border="0"
                    /></a
                >
                Hz by <a href="https://ivnkhr.com/">IVANTHEONE</a></span
            >
        </div>
    </footer>
</section>

<style>
    .section-header {
        margin-top: 2rem;
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

    .socials {
        justify-content: center;
        padding-bottom: 120px;
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
        border: 1px solid var(--theme-3);
        background: transparent;
        transition: all 0.3s;
        text-decoration: none;
    }

    .social-link:hover {
        border-color: var(--codec-green);
        background: var(--theme-05);
        transform: translateX(5px);
        box-shadow: 0 0 20px var(--theme-1);
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
        transition:
            opacity 0.3s,
            transform 0.3s;
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
        border: 1px solid var(--theme-2);
        background: var(--theme-02);
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
        background: var(--theme-03);
    }

    .prompt-cursor {
        animation: blink 1s step-end infinite;
        color: var(--codec-green);
    }

    .prompt-text {
        font-style: italic;
        opacity: 0.8;
    }

    .footer {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 2rem;
    }

    .footer-line {
        height: 1px;
        background: linear-gradient(
            to right,
            transparent,
            var(--theme-3),
            transparent
        );
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
        font-family: "VT323", monospace;
    }

    @media (max-width: 768px) {
        .socials-grid {
            grid-template-columns: 1fr;
        }

        .footer-content {
            flex-direction: column;
            gap: 0.5rem;
            text-align: center;
        }
    }
</style>
