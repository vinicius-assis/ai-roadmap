// Lição 7 — Capstone: streaming de tokens do Ollama
// Rode:  npx tsx pratice-07.ts
// Antes: ollama pull qwen2.5:0.5b   (confira com: curl http://localhost:11434/api/tags)

async function* streamChat(
	prompt: string,
	opts: { temperature?: number } = {},
): AsyncGenerator<string> {
	const res = await fetch("http://localhost:11434/api/chat", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			model: "qwen2.5:0.5b",
			messages: ([{ role: "user", content: prompt }]),
			stream: true,
			options: { 
				temperature: opts.temperature ?? 0.8,
				num_predict: 60 
			}
		}),
		signal: AbortSignal.timeout(60_000),
	});
	if (!res.ok) throw new Error(`Ollama ${res.status}`);

	const decoder = new TextDecoder();
	let buffer = "";
	for await (const bytes of res.body as AsyncIterable<Uint8Array>) {
		buffer += decoder.decode(bytes, { stream: true });
		const linhas = buffer.split("\n");
		buffer = linhas.pop() ?? ""; // fatia incompleta volta pro buffer
		for (const linha of linhas) {
			if (!linha.trim()) continue;
			const obj = JSON.parse(linha);
			if (obj.message?.content) yield obj.message.content
			if (obj.done) return
		}
	}
}

async function main() {
	const prompt = "Em uma frase, o que é uma similaridade de cosseno?";
	for (const T of [0.2, 1.3]) {
		console.log(`\n\n--- temperature ${T} ---`);
		for await (const token of streamChat(prompt, { temperature: T})) {
			process.stdout.write(token)
		}
	}
	console.log();
}

main(); // não esqueça
