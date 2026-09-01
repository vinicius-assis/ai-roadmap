{
	let calls = 0
	async function fakeApi(): Promise<{status: number}> {
		if (calls < 2) {
			calls++
			return { status: 503}
		}
		return { status: 400}
	}
	
	function backoff(tries: number): number {
		const base = 100 * 2 ** tries
		return base + Math.random() * base
	}

	const esperar = (ms: number) => new Promise((r) => setTimeout(r, ms))

	async function execWithRetry(maxTries = 5) {
		for(let i = 0; i < maxTries; i++) {
			const response = await fakeApi()
			if (response.status === 200) {
				console.log('ok na tentativa ', i)
				return
			}
			if (response.status >= 400 && response.status < 500 && response.status !== 429) {
				throw new Error(`erro permanente, sem retry: ${response.status}`)
			}
			const ms = backoff(i)
			console.log(`tentativa ${i} falhou (${response.status}) esperando ${Math.round(ms)} ms`)
			await esperar(ms)
		}

		throw new Error("esgotou")
		
	}

	async function main() {
		try {
			await execWithRetry()
		} catch(error) {
			console.log((error as Error).message)
		}
	}

	main()
}