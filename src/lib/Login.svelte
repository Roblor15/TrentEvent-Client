<script>
    let username
    let password
</script>

<div class="background">
    <div class="container">
        <form on:submit|preventDefault={() => console.log(username, password)}>
            <p>Welcome</p>
            <input type="text" placeholder="Username" bind:value={username} />
            <input type="password" placeholder="Password" bind:value={password} />
            <button type="submit">Sign in</button>
            <a href="#">Forgot Password?</a>
        </form>

        <div class="drops">
            <div class="drop drop-1" />
            <div class="drop drop-2" />
            <div class="drop drop-3" />
            <div class="drop drop-4" />
            <div class="drop drop-5" />
        </div>
    </div>
</div>

<style>
    .background {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 3em 0;
        background: linear-gradient(45deg, #fc466b, #f9f46f);
        min-height: 550px;
        height: calc(100vh - 6em);
        font-family: 'Montserrat', sans-serif;
    }

    .container {
        position: absolute;
        width: fit-content;
        height: fit-content;
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: rgba(255, 255, 255, 0.3);
        padding: 3em;
        width: 227px;
        height: fit-content;
        border-radius: 20px;
        border-left: 1px solid rgba(255, 255, 255, 0.3);
        border-top: 1px solid rgba(255, 255, 255, 0.3);
        backdrop-filter: blur(10px);
        box-shadow: 20px 20px 40px -6px rgba(0, 0, 0, 0.2);
        position: relative;
        transition: margin 0.2s ease-in-out;
        z-index: 1;
    }
    p {
        font-weight: 500;
        color: #fff;
        opacity: 0.7;
        font-size: 1.4rem;
        margin-top: 0;
        margin-bottom: 60px;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    }

    a {
        text-decoration: none;
        color: #ddd;
        font-size: 12px;
    }
    a:hover {
        text-shadow: 2px 2px 6px #00000040;
    }

    a:active {
        text-shadow: none;
    }

    input,
    button {
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

    input {
        width: 100%;
    }

    input:hover,
    button:hover {
        background: rgba(255, 255, 255, 0.1);
        box-shadow: 4px 4px 60px 8px rgba(0, 0, 0, 0.2);
    }

    input[type='text']:focus,
    input[type='password']:focus {
        background: rgba(255, 255, 255, 0.1);
        box-shadow: 4px 4px 60px 8px rgba(0, 0, 0, 0.2);
    }

    button {
        margin-top: 10px;
        width: 150px;
        font-size: 1rem;
    }

    input:hover,
    button:hover {
        cursor: pointer;
    }

    input:active,
    button:active {
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

    a,
    input:focus,
    button:focus {
        outline: none;
    }
</style>
