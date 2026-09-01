{
    async function slowCounter(signal: AbortSignal) {
        for(let i = 0;i < 9;i++) {
            signal.throwIfAborted()
            await new Promise(r => setTimeout(r, 200))
            console.log("passo: ", i)
        }
    }

    async function main() {
        const ac = new AbortController()
        const prom = slowCounter(ac.signal)
        setTimeout(() => ac.abort(), 850)

        try {
            await prom
        } catch (error) {
            const name = (error as Error).name
            if(name === 'AbortError') {
                console.log("cancelado no meio")
            } else {
                throw error
            }
        }

        console.log("timeout version")
        try {
            await slowCounter(AbortSignal.timeout(850))
        } catch (error) {
            const name = (error as Error).name
            if(name === 'TimeoutError') {
                console.log("cancelado no meio de novo")
            } else {
                throw error
            }
        }
    }
    main()
}