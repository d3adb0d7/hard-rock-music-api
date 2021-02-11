const searchsong = async() => {
    const searchtext = document.getElementById('search-field').value;
    const url =`https://api.lyrics.ovh/suggest/${searchtext}`
    const res = await fetch(url)
    const data = await res.json()
    displaySong(data.data)
}
//Get songs Information and Preview music
const displaySong = songs => {
    const songcontainer = document.getElementById('song-container');
    songcontainer.innerHTML = "";
    const lyricsdiv = document.getElementById('songlyric');
    lyricsdiv.innerText = "";
    songs.forEach(song => {
      const songdiv =  document.createElement('div');
      songdiv.className = 'single-result row align-items-center my-3 p-3';
      songdiv.innerHTML = `
                <div class="col-md-9">
                        <h3 class="lyrics-name">${song.title}</h3>
                        <p class="author lead">Album by <span>${song.artist.name}</span></p>
                </div>
                <div class="col-md-3 text-md-right text-center">
                        <button onclick="getlyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
                </div>
                <div> 
                    <audio controls>
                    <source src="${song.preview}" type="audio/mpeg">
                    </audio
                 </div>
                  
      `;
      songcontainer.appendChild(songdiv);
    } );
// Get song lyrics 
}
const getlyrics = async (artist,title) => {
    try{
        const searchlyricurl = `https://api.lyrics.ovh/v1/${artist}/${title}`
        const res = await fetch(searchlyricurl)
        const data = await res.json()
        displaylyrics(data.lyrics);

    }
    catch (error) {
        displayerror("Lyrics Not found")
    }
    // console.log(data.lyrics);
}
const displaylyrics = lyrics => {
    const lyricsdiv = document.getElementById('songlyric');
    
    
    lyricsdiv.innerText = lyrics;
    
}
const displayerror = error => {
    const errormessage = document.getElementById('error-message');
    errormessage.innerText = error;
}


