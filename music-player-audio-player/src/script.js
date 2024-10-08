$(function () {
  var playerTrack = $("#player-track"),
    bgArtwork = $("#bg-artwork"),
    bgArtworkUrl,
    albumName = $("#album-name"),
    trackName = $("#track-name"),
    albumArt = $("#album-art"),
    sArea = $("#s-area"),
    seekBar = $("#seek-bar"),
    trackTime = $("#track-time"),
    insTime = $("#ins-time"),
    sHover = $("#s-hover"),
    playPauseButton = $("#play-pause-button"),
    i = playPauseButton.find("i"),
    tProgress = $("#current-time"),
    tTime = $("#track-length"),
    seekT,
    seekLoc,
    seekBarPos,
    cM,
    ctMinutes,
    ctSeconds,
    curMinutes,
    curSeconds,
    durMinutes,
    durSeconds,
    playProgress,
    bTime,
    nTime = 0,
    buffInterval = null,
    tFlag = false,
    albums = [
      "Pizzeria Simulator OST",
      "Pizzeria Simulator OST",
      "Pizzeria Simulator OST",
      "Security Breach OST",
      "Security Breach OST",
      "Security Breach OST",
      "Security Breach OST",
      "Security Breach OST",
      "Pizzeria Simulator OST",
      "Pizzeria Simulator OST",
      "Pizzeria Simulator OST",
      "Pizzeria Simulator OST",
      "Sister Location OST",
      "Sister Location OST",
      "Security Breach OST",
      "Security Breach OST",
      "Pizzeria Simulator OST",
      "Pizzeria Simulator OST",
      "Pizzeria Simulator OST",
      "Pizzeria Simulator OST",
      "Pizzeria Simulator OST",
      "Pizzeria Simulator OST",
      "Pizzeria Simulator OST"
    ],
    trackNames = [
      "Just Add Water",
      "Legal Woes",
      "A Slice And A Scoop",
      "Daycare Theme",
      "Rockstar Row",
      "Mini Golf Intro",
      "Fazer Blast Lobby",
      "El Chips Theme",
      "Thank You For Your Patience",
      "Smashing Windshields",
      "Minor Corrosion Of The Bizet",
      "Creme De La Creme",
      "MVP",
      "Turtle Crusher",
      "Elevator Song",
      "Purple Smasher Glitched",
      "Title Screen",
      "The Runaway",
      "No Time For Popcorn",
      "Four Bits To The Left",
      "Forgotten Sunday Show",
      "Alchemist's Fantasy",
      "240 Bits Per Mile"
    ],
    albumArtworks = ["_1", "_2", "_3", "_4", "_5"],
    trackUrl = [
      "https://youtu.be/qJuZmfOMpm0?si=lQ4VH7h6cw5-LFQ-",
     
      "https://youtu.be/GVOh2ZAn3xo?si=oHt8K5KV7koHtFni",
      
      "https://youtu.be/W5-XeMjaMQI?si=0lB6eJgULzRbS_90",
      
      "https://youtu.be/9R-AVyXtonk?si=NDozLd9SoP5J7Heg",
      
      "https://youtu.be/ZUPCoWAvaog?si=QhfzNBbFByujni-m",
      
      "https://youtu.be/ov73qlK0T7c?si=CronC0yLVV0GtQRz",
      
      "https://youtu.be/ZOgrCRaeIHM?si=WEvG-ODR9XqLq4oK",
      
      "https://youtu.be/aqULuGhguAI?si=Jr46NBnsDvvx4qMF",
      
      "https://youtu.be/FA1XMNNC4xk?si=vIk84DxfIx2TKJIq",
      
      "https://youtu.be/AUcmp_DzB4E?si=DjK7_1hVnc2LhlMB",
      
      "https://youtu.be/ER5r4NMAbc4?si=BcvfMV0Ph3TOjzaz",
      
      "https://youtu.be/Vk3sngqyyvY?si=5tJ5DdfDjcBLhvL4",
      
      "https://youtu.be/BuvXJKNO-MU?si=Zx2BRDsf8xaSJKCi",
      
      "https://youtu.be/DKzJLZHND24?si=N3WTRPlXPtqnL_oi",
      
      "https://youtu.be/XxKfFct5iA8?si=UWwaZZ8S_k-jM1gw",
      
      "https://youtu.be/lm2c2bHrexM?si=p5gaO38wjStwU-NE",
      
      "https://youtu.be/znu5fyvUvQU?si=tOXneYWPoi_sKvu6",
      
      "https://youtu.be/VlhrOTmCp0g?si=_Wx561F-uoqyf-to",
      
      "https://youtu.be/b9iKxpX3GX0?si=zCfN9ZM44bqCDUS2",
      
      "https://youtu.be/NlFtd_l_Q7w?si=TfuhfeZODzrxGKMR",
      
      "https://youtu.be/7nEXGvvLskQ?si=jt_p00X5vCUjWR4W",
      
      "https://youtu.be/vE5o9QWR_AU?si=NWdtwQS41B4T_tel",
      
      "https://youtu.be/_AGkrUkflUc?si=XRBRBYa6QhEExj_L"
      
    ],
    playPreviousTrackButton = $("#play-previous"),
    playNextTrackButton = $("#play-next"),
    currIndex = -1;

  function playPause() {
    setTimeout(function () {
      if (audio.paused) {
        playerTrack.addClass("active");
        albumArt.addClass("active");
        checkBuffering();
        i.attr("class", "fas fa-pause");
        audio.play();
      } else {
        playerTrack.removeClass("active");
        albumArt.removeClass("active");
        clearInterval(buffInterval);
        albumArt.removeClass("buffering");
        i.attr("class", "fas fa-play");
        audio.pause();
      }
    }, 300);
  }

  function showHover(event) {
    seekBarPos = sArea.offset();
    seekT = event.clientX - seekBarPos.left;
    seekLoc = audio.duration * (seekT / sArea.outerWidth());

    sHover.width(seekT);

    cM = seekLoc / 60;

    ctMinutes = Math.floor(cM);
    ctSeconds = Math.floor(seekLoc - ctMinutes * 60);

    if (ctMinutes < 0 || ctSeconds < 0) return;

    if (ctMinutes < 0 || ctSeconds < 0) return;

    if (ctMinutes < 10) ctMinutes = "0" + ctMinutes;
    if (ctSeconds < 10) ctSeconds = "0" + ctSeconds;

    if (isNaN(ctMinutes) || isNaN(ctSeconds)) insTime.text("--:--");
    else insTime.text(ctMinutes + ":" + ctSeconds);

    insTime.css({ left: seekT, "margin-left": "-21px" }).fadeIn(0);
  }

  function hideHover() {
    sHover.width(0);
    insTime.text("00:00").css({ left: "0px", "margin-left": "0px" }).fadeOut(0);
  }

  function playFromClickedPos() {
    audio.currentTime = seekLoc;
    seekBar.width(seekT);
    hideHover();
  }

  function updateCurrTime() {
    nTime = new Date();
    nTime = nTime.getTime();

    if (!tFlag) {
      tFlag = true;
      trackTime.addClass("active");
    }

    curMinutes = Math.floor(audio.currentTime / 60);
    curSeconds = Math.floor(audio.currentTime - curMinutes * 60);

    durMinutes = Math.floor(audio.duration / 60);
    durSeconds = Math.floor(audio.duration - durMinutes * 60);

    playProgress = (audio.currentTime / audio.duration) * 100;

    if (curMinutes < 10) curMinutes = "0" + curMinutes;
    if (curSeconds < 10) curSeconds = "0" + curSeconds;

    if (durMinutes < 10) durMinutes = "0" + durMinutes;
    if (durSeconds < 10) durSeconds = "0" + durSeconds;

    if (isNaN(curMinutes) || isNaN(curSeconds)) tProgress.text("00:00");
    else tProgress.text(curMinutes + ":" + curSeconds);

    if (isNaN(durMinutes) || isNaN(durSeconds)) tTime.text("00:00");
    else tTime.text(durMinutes + ":" + durSeconds);

    if (
      isNaN(curMinutes) ||
      isNaN(curSeconds) ||
      isNaN(durMinutes) ||
      isNaN(durSeconds)
    )
      trackTime.removeClass("active");
    else trackTime.addClass("active");

    seekBar.width(playProgress + "%");

    if (playProgress == 100) {
      i.attr("class", "fa fa-play");
      seekBar.width(0);
      tProgress.text("00:00");
      albumArt.removeClass("buffering").removeClass("active");
      clearInterval(buffInterval);
    }
  }

  function checkBuffering() {
    clearInterval(buffInterval);
    buffInterval = setInterval(function () {
      if (nTime == 0 || bTime - nTime > 1000) albumArt.addClass("buffering");
      else albumArt.removeClass("buffering");

      bTime = new Date();
      bTime = bTime.getTime();
    }, 100);
  }

  function selectTrack(flag) {
    if (flag == 0 || flag == 1) ++currIndex;
    else --currIndex;

    if (currIndex > -1 && currIndex < albumArtworks.length) {
      if (flag == 0) i.attr("class", "fa fa-play");
      else {
        albumArt.removeClass("buffering");
        i.attr("class", "fa fa-pause");
      }

      seekBar.width(0);
      trackTime.removeClass("active");
      tProgress.text("00:00");
      tTime.text("00:00");

      currAlbum = albums[currIndex];
      currTrackName = trackNames[currIndex];
      currArtwork = albumArtworks[currIndex];

      audio.src = trackUrl[currIndex];

      nTime = 0;
      bTime = new Date();
      bTime = bTime.getTime();

      if (flag != 0) {
        audio.play();
        playerTrack.addClass("active");
        albumArt.addClass("active");

        clearInterval(buffInterval);
        checkBuffering();
      }

      albumName.text(currAlbum);
      trackName.text(currTrackName);
      albumArt.find("img.active").removeClass("active");
      $("#" + currArtwork).addClass("active");

      bgArtworkUrl = $("#" + currArtwork).attr("src");

      bgArtwork.css({ "background-image": "url(" + bgArtworkUrl + ")" });
    } else {
      if (flag == 0 || flag == 1) --currIndex;
      else ++currIndex;
    }
  }

  function initPlayer() {
    audio = new Audio();

    selectTrack(0);

    audio.loop = false;

    playPauseButton.on("click", playPause);

    sArea.mousemove(function (event) {
      showHover(event);
    });

    sArea.mouseout(hideHover);

    sArea.on("click", playFromClickedPos);

    $(audio).on("timeupdate", updateCurrTime);

    playPreviousTrackButton.on("click", function () {
      selectTrack(-1);
    });
    playNextTrackButton.on("click", function () {
      selectTrack(1);
    });
  }

  initPlayer();
});
