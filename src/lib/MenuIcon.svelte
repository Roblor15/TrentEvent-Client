<script>
    let className
    export { className as class }
    export let active
</script>

<div
    style="display: none;"
    class={className}
    class:active
    on:click|preventDefault={() => {
        active = !active
        console.log(active)
    }}
    on:keydown={() => {}}
>
    <span />
    <span />
    <span />
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
        width: 2.5rem;
        cursor: pointer;
    }

    div span {
        background: var(--navtext-color-selected);
        border-radius: 0.357rem;
        height: 0.25rem;
        margin: 0.25rem 0;
        transition: transform 0.4s, width 0.4s;
    }

    span:nth-of-type(1) {
        width: 50%;
    }

    span:nth-of-type(2) {
        width: 100%;
    }

    span:nth-of-type(3) {
        width: 75%;
    }

    .active > span:nth-of-type(1) {
        transform-origin: bottom;
        transform: rotatez(45deg) translate(0.2857rem, 0.045rem);
    }

    .active > span:nth-of-type(2) {
        transform-origin: top;
        transform: rotatez(-45deg);
    }

    .active > span:nth-of-type(3) {
        transform-origin: bottom;
        width: 50%;
        transform: translate(1.0714rem, -0.3927rem) rotatez(45deg);
    }
</style>
