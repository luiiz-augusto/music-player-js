
let song = document.getElementById('song');
let play_btn = document.getElementById('play_btn');
let next = document.querySelector('#next');
let prev = document.querySelector('#prev');
let img = document.querySelector('.img');
let progress= document.querySelector('.progress');
let beginduration = document.querySelector("#beginduration");
let endduration = document.querySelector("#endduration");
let options = document.querySelector('.options');
let music_list = document.querySelector('.music_list');
let volume = document.querySelector('#vol');
let volume_mute = document.querySelector('#volume_mute');

//todas as músicas
const music =[{
  name:'Gusttavo Lima',
  title:' Na hora de amar',
  img:'gt_na_hora.jpeg',
  path:'Song_3'
}, 
{
  name:'Beauz Jvna',
  title:'Crazy',
  img:'ncs.jpeg',
  path:'Song_4'
},
{
  name:'Alok',
  title:'Alive (It Feels Like)',
  img:'alok_alive.jpeg',
  path:'Song_5'
},
{
  name:'Fearless (feat. Chris Linton)',
  title:'Lost Sky ',
  img:'ncs_1.jpeg',
  path:'Song_6'
}];

//variável que usei ao longo do js
let indexMusic = 0;
let isPlayng = false;
let musicIndex = 0;
 
//rodar 
window.addEventListener("load", () => {
    load_music(indexMusic);
    playingSong();
    volume_change();
});

//função load
function load_music(indexMusic){
  artist.innerHTML = music[indexMusic].name;
	title.innerHTML = music[indexMusic].title;
	img.src = music[indexMusic].img;
	song.src = `${music[indexMusic].path}.mp3`;
};

load_music(indexMusic);

//volume
function volume_change() {
  song.volume = volume.value / 100;
}

//mutar
function mute(){
    if(song.muted){
      song.muted = false;
      volume_mute.innerHTML = "<i class='bx bx-volume-full'></i>";
       }else{
      song.muted = true ;
      volume_mute.innerHTML = "<i class='bx bx-volume-mute'></i>";
    }
  }
 
//função play/pause
function playsong(){
  if(song.paused){
    song.play();
    isPlayng = true;
    play_btn.innerHTML = "<i class='bx bx-pause'></i>";
    playingSong();
  
  }else{
    song.pause();
    isPlayng = false;
    play_btn.innerHTML = "<i class='bx bx-play'></i>";
    playingSong();
    
  }
}

//função next
nextsong = () =>{
  if (indexMusic < music.length -1){
    indexMusic += 1;
    load_music(indexMusic);
    playsong();
    playingSong();
  }else{
    indexMusic = 0;
    load_music(indexMusic);
    playsong();
    playingSong();
  }
};

//função prev
prevsong = () =>{
  if (indexMusic >0){
    indexMusic -= 1;
    load_music(indexMusic);
    playsong();
    playingSong();
  }else{
    indexMusic = music.length;
    load_music(indexMusic);
    playsong();
    playingSong();
  }
};

//função duração
function UpProgress(e){
  const {duration,currentTime} = e.srcElement;
  const ProgressTime= (currentTime/duration) * 100;
  progress.style.width=`${ProgressTime}%`
  ;
 
    song.addEventListener("loadeddata", () => {
 
  //parte contagem do fim da música
        let mainAdDuration = song.duration;
        let totalMin = Math.floor(mainAdDuration / 60);
        let totalSec = Math.floor(mainAdDuration % 60);
        if (totalSec < 10) { 
            totalSec = `0${totalSec}`;
        }
 
        endduration.innerText = `${totalMin}:${totalSec}`;
 
    });
 
  // contagem começo da música- 0:00
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) { 
      currentSec = `0${currentSec}`;
    }
 
    beginduration.innerText = `${currentMin}:${currentSec}`;
}

//função de adianta ou não a musica
function setProgress(e){
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = song.duration;
  
  song.currentTime = (clickX / width) * duration;
  song.play();
}

//abrir as opções
function sidebar(){
	options.classList.toggle('active2');
		}
		
//abrir a lista de música
function open_p(){
	music_list.classList.toggle('active');
		}

//organizar músicas corretamente na lista 
const ulTag = document.querySelector("ul");
 
/*uma forma de chamar todas as músicas pelo javascript*/
for (let i = 0; i < music.length; i++) {
  let liTag = `<li li-index="${i}">
    <div class="row">
      <span>${music[i].title}</span>
      <p>${music[i].name}</p>
    </div>
    <audio class="${music[i].path} "src="${music[i].path}.mp3"></audio>
    <span id="${music[i].path}" class="audio-duration">1:54</span>
  </li>`;
  
  ulTag.insertAdjacentHTML("beforeend", liTag);
  
/*criação de let para a duração da música ficasse na lista de música*/
  let liAudioDurationTag = ulTag.querySelector(`#${music[i].path}`);
  let liAudioTag = ulTag.querySelector(`.${music[i].path}`);
  
  liAudioTag.addEventListener("loadeddata", () => {
    let mainAdDuration = liAudioTag.duration;
    let totalMin = Math.floor(mainAdDuration / 60);
    let totalSec = Math.floor(mainAdDuration % 60);
    if (totalSec < 10) { 
      totalSec = `0${totalSec}`;
      }
 
  liAudioDurationTag.innerText = `${totalMin}:${totalSec}`;
  liAudioDurationTag.setAttribute("t-duration", `${totalMin}:${totalSec}`);
  });
  
};

//quando a música toca aparece Playing
const allLiTags = ulTag.querySelectorAll("li");
function playingSong() {
  for (let j = 0; j < allLiTags.length; j++) {
   let audioTag = allLiTags[j].querySelector(".audio-duration");
    if(allLiTags[j].classList.contains("playing")){
            allLiTags[j].classList.remove("playing");
    
    let adDuration = audioTag.getAttribute("t-duration");
        audioTag.innerText = adDuration;
        }
     
    if(allLiTags[j].getAttribute("li-index") == indexMusic){
       allLiTags[j].classList.add("playing");
      audioTag.innerText = "Playing";
        }
     
    allLiTags[j].setAttribute("onclick", "clicked(this)");
    }
}

//selecionar a música na lista de música
function clicked(element){
 
  let getLiIndex = element.getAttribute("li-index");
  indexMusic =  getLiIndex; 
    load_music(indexMusic);
    playsong(); 
    playingSong();
    
}
//contagem da barra
song.addEventListener("timeupdate",UpProgress);
// clicar no parte da música na barra
progressduration.addEventListener("click",setProgress);
//quando acaba uma música ja vai para outra
song.addEventListener('ended',nextsong);
