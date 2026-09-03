{
	const vocab  = ["cachorro", "gato", "filhote", "ração", "planilha"];
	const logits = [2.0, 1.4, 0.9, 0.3, -1.2];

	function softmax(logits: number[], T: number): number[] {
		const exps = logits.map((l) => Math.exp(l/T))
		const sum = exps.reduce((acc, i) => acc + i, 0)
		return exps.map(e => e / sum)
	}

	function sample(probs: number[]): number {
		const r = Math.random()
		let acc = 0;
		for(let i = 0; i < probs.length ; i++) {
			acc += probs[i]
			if(r < acc) {
				return i
			}
		}
		return probs.length - 1
	}

	function main() {
		for(const T of [0.2, 0.7, 1.0, 1.8]) {
			const probs = softmax(logits, T)
			probs.forEach((p, i) => {
				console.log(`${vocab[i]} ${(p * 100).toFixed(2)}%`)
			});

			const counts = new Array(vocab.length).fill(0)
			for(let c = 0; c < 1000; c++) {
				const s = sample(probs)
				counts[s]++
			}

			console.log(counts)
		}
	}

	main()
}