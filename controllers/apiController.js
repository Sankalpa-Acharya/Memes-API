
const fetchData = async (limit = 10, type = "normal") => {
    const url = {
      dank: `https://api.reddit.com/r/dankmemes/?limit=100`,
      normal: `https://api.reddit.com/r/memes?limit=100`,
    };
    const data = await fetch(url[type] || url["normal"]);
    const meme = await data.json();
    const result ={ 
      type:url[type] ? type : "normal",
      memes:[
  
      ]
  };
  const memes=[]
    const memeData = await meme.data.children;
    for (const post of memeData) {
      try {
        if (post.data.post_hint == "image") {
          let meme = post.data.preview.images[0].source.url;
          meme = meme.replace(/&amp;/g, "&");
          memes.push({title:post.data.title,author:post.data.author,url:meme});
        }
      } catch {

      }
    }
    result.memes=memes.slice(0,limit)
    return result;
  };

export const apiController = (req,res)=>{
    const limit = req.query.limit ? req.query.limit : 10;
    const type = req.query.type ? req.query.type : 'normal';
    fetchData(limit,type,).then((data)=>{
        
        res.status(200).json(data);
    }).catch((err)=>{
        res.status(400).json({error:'sorry, we couldn\'t process your request'})
    })

}
