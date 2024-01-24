console.log('Hello')

//Initializing the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.querySelector('#masterplay');
let progressBar = document.querySelector('.progress-bar');
let gif = document.querySelector('.player .song-gif #gif');
let masterSongName = document.getElementById('masterSongName');
let masterCoverImg = document.getElementById('masterCoverImg');

let songItems = Array.from(document.getElementsByClassName('songItem'));
 
let songs = [
    {songName: "Asal Mein", filePath: "songs/1.mp3", coverPath: "covers/cover-1.jpg"},
    {songName: "Tera Zikr", filePath: "songs/2.mp3", coverPath: "covers/cover-2.jpg"},
    {songName: "Hawa Banke", filePath: "songs/3.mp3", coverPath: "covers/cover-3.jpg"},
    {songName: "Mujhe Peene Do", filePath: "songs/4.mp3", coverPath: "covers/cover-4.jpg"},
    {songName: "Kabhi Tumhe", filePath: "songs/5.mp3", coverPath: "covers/cover-5.jpg"},
    {songName: "Meherma", filePath: "songs/6.mp3", coverPath: "covers/cover-6.jpg"},
    {songName: "Rabba Mehar Kari", filePath: "songs/7.mp3", coverPath: "covers/cover-7.jpg"},
    {songName: "Ek Tarfa", filePath: "songs/8.mp3", coverPath: "covers/cover-8.jpg"},
    {songName: "Shayad", filePath: "songs/9.mp3", coverPath: "covers/cover-9.jpg"},
    {songName: "Banjara", filePath: "songs/10.mp3", coverPath: "covers/cover-10.jpg"},
    {songName: "Subahnallah", filePath: "songs/11.mp3", coverPath: "covers/cover-11.jpg"},
    {songName: "Khamoshiyan", filePath: "songs/12.mp3", coverPath: "covers/cover-12.jpg"}
]

songItems.forEach((element,i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerHTML = songs[i].songName;
})

// Handle play/pause click on masterplay
masterPlay.addEventListener('click', ()=>{
    if (audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterPlay.classList.remove('ri-play-fill');
        masterPlay.classList.add('ri-pause-fill');       
        gif.style.opacity = 1;      
    } else {
        audioElement.pause();
        masterPlay.classList.remove('ri-pause-fill');
        masterPlay.classList.add('ri-play-fill');   
        gif.style.opacity = 0;    
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    // update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
    progressBar.value = progress;
})

progressBar.addEventListener('input', ()=>{
    audioElement.currentTime = (progressBar.value * audioElement.duration)/100; 
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('ri-pause-circle-line');
        element.classList.add('ri-play-circle-line');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();      
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('ri-play-circle-line');
        e.target.classList.add('ri-pause-circle-line');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        masterCoverImg.src = songs[songIndex].coverPath;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('ri-play-fill');
        masterPlay.classList.add('ri-pause-fill');
        gif.style.opacity = 1;   
    })
})

let songItemPlay = document.querySelector('.songItemPlay');

audioElement.addEventListener('ended', () => {    
    songIndex++;
    if (songIndex >= songs.length) {    //end of song list
        songIndex = 0;  
    }
    const currentPlayIcon = document.getElementById(songIndex.toString());
    if (currentPlayIcon) {  // Change the icon in song list
        makeAllPlays(); // Reset all play icons
        currentPlayIcon.classList.remove('ri-play-circle-line');
        currentPlayIcon.classList.add('ri-pause-circle-line');
    }
    masterSongName.innerText = songs[songIndex].songName;
    masterCoverImg.src = songs[songIndex].coverPath;
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;    
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex >= 11){
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }

    const currentPlayIcon = document.getElementById(songIndex.toString());
    if (currentPlayIcon) {  // Change the icon in song list
        makeAllPlays(); // Reset all play icons
        currentPlayIcon.classList.remove('ri-play-circle-line');
        currentPlayIcon.classList.add('ri-pause-circle-line');
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    masterCoverImg.src = songs[songIndex].coverPath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('ri-play-fill');
    masterPlay.classList.add('ri-pause-fill');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex <= 0){
        songIndex = 0;
    }
    else {
        songIndex -= 1;
    }

    const currentPlayIcon = document.getElementById(songIndex.toString());
    if (currentPlayIcon) { // Change the icon in song list
        makeAllPlays(); // Reset all play icons
        currentPlayIcon.classList.remove('ri-play-circle-line');
        currentPlayIcon.classList.add('ri-pause-circle-line');
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerHTML = songs[songIndex].songName;
    masterCoverImg.src = songs[songIndex].coverPath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('ri-play-fill');
    masterPlay.classList.add('ri-pause-fill');
})