<script>
    import MenuIcon from './MenuIcon.svelte'
    import { page } from '$app/stores'

    let IconAttivo = false
    let links = [
        { link: '/', name: 'Home' },
        { link: '/accesso', name: 'Accesso' }
    ]

    const styleColors = {
        navBackgroundColor: '#1a202d',
        navTextColorSelected: '#fcfcfc',
        navTextColorOpen: 'red',
        navTextColor: '#a3a7b5',
        navTextColorSelectedOpen: 'red',
        navTextColorUnderline: '#ffcd49'
    }
</script>

<nav
    class="container"
    style={`--navbackground-color:${styleColors.navBackgroundColor}; --navtext-color-selected:${styleColors.navTextColorSelected}; --navtext-color-open: ${styleColors.navTextColorOpen}; --navtext-color: ${styleColors.navTextColor}; --navtext-color-selected-open: ${styleColors.navTextColorSelectedOpen}; --navtext-color-underline: ${styleColors.navTextColorUnderline}`}
>
    <div class="menu">
        <MenuIcon class="menuIcon" active={IconAttivo} />
        <div class="logo">
            <a href="/">
                <picture>
                    <source media="(max-width:600px)" srcSet="/logo1.png" />
                    <img src="/logo.png" alt="logo" width="100%" />
                </picture>
            </a>
        </div>
        <ul class="lista" style="margin-left: auto;">
            {#each links as link}
                <li>
                    <a href={link.link} class:corrente={$page.url.pathname === link.link}
                        >{link.name}</a
                    >
                </li>
            {/each}
        </ul>
        <a href="/accesso" button=""><div>Accedi</div></a>
    </div>
</nav>

<style>
    a {
        color: inherit;
        text-decoration: none;
    }

    a[button] {
        padding: 3px;
        background-color: #272e3c;
        box-shadow: 0 0 120px var(--generate-button-shadow-wide, transparent),
            0 4px 12px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1),
            inset 0 1px 1px var(--generate-button-shadow-inset, rgba(255, 255, 255, 0.1)),
            0 0 0 var(--generate-button-shadow-outline, 0) rgba(109, 68, 244, 0.4);
        height: auto;
        display: flex;
        white-space: nowrap;
        border-radius: 50px;
        border: none;
        cursor: pointer;
        font-weight: 600;
        align-items: center;
        justify-content: center;
        letter-spacing: 0.005em;
        transform: scale(0.8);
        transition: transform 0.3s, background-color 3s, box-shadow 0.3s;
        line-height: 26px;
        margin: 0 2em 0 3em;
    }

    a[button]:hover {
        transform: scale(1);
        --generate-button-shadow-inset: rgba(255, 255, 255, 0.7);
        background: linear-gradient(-60deg, var(--navtext-color-underline), #ff3c00);
        box-shadow: 0 0 30px #ff3c0079, 0 4px 12px rgba(0, 0, 0, 0.05),
            0 0 0 4px rgba(150, 0, 255, 0.3),
            inset 0 1px 1px var(--generate-button-shadow-inset, rgba(255, 255, 255, 0.1)),
            0 0 0 var(--generate-button-shadow-outline, 0) rgba(109, 68, 244, 0.4);
    }

    a[button]:hover div {
        color: var(--navtext-color-selected);
    }

    a[button] div {
        color: var(--navtext-color);
        width: 100%;
        height: 100%;
        display: flex;
        padding: 13px 25px;
        border-radius: 50px;
        align-items: center;
        justify-content: center;
        font-size: large;
        transition: color 0.3s;
    }

    .container {
        position: sticky;
        top: 0;
    }

    .menu {
        display: flex;
        height: 4.5rem;
        background-color: var(--navbackground-color);
        align-items: center;
        width: 100%;
        padding: 0;
        transition: height 0.3s;
    }

    .menu li {
        display: inline-flex;
        align-items: center;
    }

    @media (min-width: 1000px) {
        .container {
            position: initial;
        }

        .menu {
            height: 5rem;
        }

        .menu .lista a {
            transition: transform 0.3s, color 0.3s, font-weight 0.3s;
        }

        .menu a:not(.corrente, .logo a):hover {
            transform: scale(0.9);
            color: var(--navtext-color-selected);
        }
    }

    .menuIcon {
        margin-left: 20px;
        z-index: 2;
        transition: transform 0.3s;
        order: 1;
    }

    @media (min-width: 1000px) {
        .menuIcon {
            display: none !important;
            order: initial;
        }
    }

    .logo img {
        height: 3rem;
        width: auto;
        padding-top: 0.1rem;
    }

    .logo {
        order: 3;
        /* margin-left: auto; */
        margin-right: 20px;
        z-index: 2;
        transition: transform 0.3s;
    }

    .logo a {
        display: inline-block;
    }

    @media (min-width: 1000px) {
        .logo {
            margin-left: 20px;
            margin-right: 0;
            order: initial;
        }

        .logo img {
            height: 3.5rem;
        }
    }

    .lista {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 1;
        margin: 0;
        padding: 0;
        font-size: 1.3rem;
        font-weight: 500;
        color: var(--navtext-color-open);
        gap: 4vw;
    }

    .lista li:first-child {
        margin-left: 20px;
    }

    .lista li {
        height: fit-content;
        margin-top: 5rem;
    }
    @media (min-height: 430px), (min-width: 1000px) {
        .lista {
            flex-direction: column;
            flex-wrap: initial;
            align-items: center;
            gap: 3rem;
            font-size: 1.5rem;
        }

        .lista li {
            flex: initial;
            margin-top: 0;
        }

        .lista li:first-child {
            margin-top: 23vh;
            margin-left: 0;
        }
    }

    @media (min-width: 1000px) {
        .lista {
            display: flex;
            flex-direction: row;
            margin-left: 3rem;
            position: initial;
            width: auto;
            height: auto;
            gap: 3rem;
            font-size: large;
            order: initial;
            color: var(--navtext-color);
        }

        .lista li:first-child {
            margin-top: 0;
        }
    }

    .social {
        order: 2;
        gap: 1rem;
        z-index: 2;
        padding: 0;
        margin: 0;
        position: fixed;
        left: 20px;
        bottom: 20px;
    }

    .social a {
        height: 32px;
        fill: var(--navtext-color-open);
    }

    @media (min-width: 340px) {
        .social {
            position: initial;
            margin-left: 1.6em;
            padding-bottom: 0.1em;
        }
    }

    @media (min-width: 1000px) {
        .social {
            display: flex;
            gap: 2rem;
            margin-left: auto;
            margin-right: 40px;
            order: initial;
            padding-bottom: 0;
        }

        .social [class^='menu-icona'] {
            width: 32px;
            height: 32px;
        }

        .social a {
            height: 32px;
            fill: var(--navtext-color-open);
        }

        .social a:hover {
            fill: var(--navtext-color-selected);
        }
    }

    .corrente {
        color: var(--navtext-color-selected-open);
        font-weight: bold;
    }

    .corrente::after {
        content: '';
        display: block;
        height: 2px;
        background-color: var(--navtext-color-underline);
        animation: sottolineatura 0.5s forwards;
    }

    @media (min-width: 1000px) {
        .corrente {
            color: var(--navtext-color-selected);
        }
    }

    .scroll {
        height: 3.5em;
    }

    .scroll .menuIcon {
        transform: scale(0.8);
    }

    .scroll .logo {
        transform: scale(0.8);
    }

    .scroll .buttonFiltri {
        transform: scale(0.8);
    }

    @keyframes sottolineatura {
        0% {
            width: 0;
        }
        100% {
            width: 100%;
        }
    }
</style>
