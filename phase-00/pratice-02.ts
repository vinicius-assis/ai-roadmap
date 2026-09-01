const phrase = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi erat mi, vulputate sed ex eget, ultrices rutrum turpis."

async function* stream(text: string): AsyncGenerator<string> {
	const words = text.split(" ")
	let i = 0
	for(const word of words) {
		i += 1
		if (i === 4) throw new Error(" conexao caiu!")
		await new Promise((r) => setTimeout(r, 200));
		yield word;
	}
}

async function main() {
	const t0 = Date.now()
	let result = ''
	let isFirst = true
	const text = stream(phrase)
	try {
		for await(const chunk of text) {
			if (isFirst) {
				console.log("primeiro token: ", Date.now() - t0)
				isFirst = false
			}
			result += " " + chunk
			console.log(result.trim())
		}
		console.log("Ultimo token: ", Date.now() - t0)
		
	} catch (error) {
		console.log("error found: ", error, ", acumulado ate aqui: " + result)
	}

}

main()