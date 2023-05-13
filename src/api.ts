export interface Meme {
    id: number;
    title: string;
    original: string;
    url: string;
    author: string;
    upvote_ratio: number;
    width: number;
    height: number;
}

export const fetchMemes = async (category: string | undefined, limit = 10): Promise<Meme[]> => {
    let url = ""
    if (category === undefined) {
        url = `https://api.reddit.com/r/memes/top.json?limit=${limit}`
    }
    switch (category) {
        case "dank":
            url = `https://api.reddit.com/r/dankmemes/top.json?limit=${limit}`
            break;
        case "normal":
            url = `https://api.reddit.com/r/memes/top.json?limit=${limit}`
            break;
    }
    const response = await fetch(url)
    const json = await response.json()
    let memes = json.data.children.map((child: any) => {
        const data = child.data
        return {
            id: data.id,
            title: data.title,
            original: data.url_overridden_by_dest,
            url: data.url,
            author: data.author,
            upvote_ratio: data.upvote_ratio,
            width: data.preview.images[0].source.width,
            height: data.preview.images[0].source.height,
        }
    })

    // filter memes url and thumbnail by extension 
    // valid extensions are jpg, jpeg, png, gif

    // if width / height ratio is too big, filter it out looks like a banner
    memes = memes.filter((meme: Meme) => {
        const ratio = meme.width / meme.height
        return ratio > 0.6 && ratio < 2
    })

    memes = memes.filter((meme: Meme) => {
        const extension = meme.url.split(".").pop()
        console.log(extension)
        for (const validExtension of ["jpg", "jpeg", "png", "gif", "webm"]) {
            if (extension === validExtension) {
                return true
            }
        }
    })

    return memes
}
