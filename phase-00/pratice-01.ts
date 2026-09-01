{
	async function slowDouble(n: number): Promise<number> {
	if (n < 0) throw new Error("boom");
	await new Promise((r) => setTimeout(r, 500))
	return n * 2
}

async function main(): Promise<void> {
	const t0 = Date.now()

	
	
	await slowDouble(1)
	await slowDouble(4)
	await slowDouble(8)
	console.log('sequencial levou', Date.now() - t0, 'ms')
	
	const t1 = Date.now()
	const result = await Promise.all([
		slowDouble(1),
		slowDouble(4),
		slowDouble(3)
	])
	console.log('paralelo levou', Date.now() - t1, 'ms')

	try {
		await slowDouble(-1)
	} catch (error) {
		console.log("deu error log: ", error)
	}

}

main()
}
