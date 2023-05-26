<div class="container">
    <form on:submit|preventDefault>
        <slot />
    </form>
    <div class="drops">
        <div class="drop drop-1" />
        <div class="drop drop-2" />
        <div class="drop drop-3" />
        <div class="drop drop-4" />
        <div class="drop drop-5" />
    </div>
</div>

<style>
    .container {
        position: relative;
        width: fit-content;
        height: fit-content;
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: rgba(255, 255, 255, 0.3);
        padding: 3em 2.5em;
        width: 243px;
        height: fit-content;
        border-radius: 20px;
        border-left: 1px solid rgba(255, 255, 255, 0.3);
        border-top: 1px solid rgba(255, 255, 255, 0.3);
        backdrop-filter: blur(10px);
        box-shadow: 20px 20px 40px -6px rgba(0, 0, 0, 0.2);
        position: relative;
        transition: margin 0.2s ease-in-out;
        z-index: 1;
        text-align: center;
        overflow: hidden;
    }

    form :global(div) {
        width: 100%;
    }

    form :global(p) {
        font-weight: 500;
        color: #fff;
        opacity: 0.7;
        font-size: 1.4rem;
        margin-top: 0;
        margin-bottom: 40px;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    }

    form :global(p[name='error']) {
        color: red;
        margin-bottom: 20px;
        text-shadow: none;
    }

    form :global(a) {
        text-decoration: none;
        color: #ddd;
        font-size: 12px;
        transition: text-shadow 0.2s ease-in-out;
    }
    form :global(a):hover {
        text-shadow: 2px 2px 6px #00000040;
    }

    form :global(a):active {
        text-shadow: none;
    }

    form :global(input),
    form :global(button) {
        box-sizing: border-box;
        background: transparent;
        padding: 1em;
        margin-bottom: 2em;
        border: none;
        border-left: 1px solid rgba(255, 255, 255, 0.3);
        border-top: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 5000px;
        backdrop-filter: blur(5px);
        box-shadow: 4px 4px 60px rgba(0, 0, 0, 0.2);
        color: #fff;
        font-family: Montserrat, sans-serif;
        font-weight: 500;
        transition-property: background, box-shadow;
        transition-duration: 0.2s;
        transition-timing-function: ease-in-out;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    }

    form :global(input) {
        width: 100%;
    }

    form :global(input):hover,
    form :global(button):hover {
        background: rgba(255, 255, 255, 0.1);
        box-shadow: 4px 4px 60px 8px rgba(0, 0, 0, 0.2);
    }

    form :global(input):focus,
    form :global(input):focus {
        background: rgba(255, 255, 255, 0.1);
        box-shadow: 4px 4px 60px 8px rgba(0, 0, 0, 0.2);
    }

    form :global(button) {
        margin-top: 10px;
        width: 150px;
        font-size: 1rem;
    }

    form :global(input):hover,
    form :global(button):hover {
        cursor: pointer;
    }

    form :global(input):active,
    form :global(button):active {
        background: rgba(255, 255, 255, 0.2);
    }

    form:hover {
        margin: 4px;
    }

    ::placeholder {
        font-family: Montserrat, sans-serif;
        font-weight: 400;
        color: #fff;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
    }

    .drop {
        background: rgba(255, 255, 255, 0.3);
        backdrop-filter: blur(10px);
        border-radius: 10px;
        border-left: 1px solid rgba(255, 255, 255, 0.3);
        border-top: 1px solid rgba(255, 255, 255, 0.3);
        box-shadow: 10px 10px 60px -8px rgba(0, 0, 0, 0.2);
        position: absolute;
        transition: all 0.2s ease;
    }

    @media (min-width: 500px) {
        .drop:nth-child(1) {
            height: 80px;
            width: 80px;
            top: -20px;
            left: -40px;
            z-index: 0;
        }

        .drop:nth-child(2) {
            height: 80px;
            width: 80px;
            bottom: -30px;
            right: -10px;
            z-index: 2;
        }

        .drop:nth-child(3) {
            height: 100px;
            width: 100px;
            bottom: 120px;
            right: -50px;
            z-index: 0;
        }

        .drop:nth-child(4) {
            height: 120px;
            width: 120px;
            top: -60px;
            right: -60px;
            z-index: 2;
        }

        .drop:nth-child(5) {
            height: 60px;
            width: 60px;
            bottom: 170px;
            left: 90px;
            z-index: 0;
        }
    }

    form :global(a),
    form :global(input):focus,
    form :global(button):focus {
        outline: none;
    }
</style>
