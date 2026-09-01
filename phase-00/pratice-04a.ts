{
    async function main() {
        function* numbers() {
            let n = 1
            while(true) {
                yield n++
            }
        }
    
        for(const n of numbers()) {
            if (n > 5) break
            console.log(n)
        }
    
        async function searchPage(p: number) {
            await new Promise((r) => setTimeout(r, 100))
            if(p > 3) return []
            return [p*10, p*10+1, p*10+2]
        }
    
        async function* allPages() {
            let page = 1
            while(true) {
                const data = await searchPage(page)
                if(data.length === 0) return;
                for(const item of data) yield item
                page++
            }
        }
        let total = 0
        for await(const item of allPages()) {
            console.log(item)
            total++
        }
        console.log("total: ", total)
    }
    main()
}