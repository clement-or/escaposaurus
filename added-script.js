function addedFunction() {

  const firstVideo = document.getElementById("04122018-18-42.mp4");
  const wsyCall = document.getElementById("divcontact-WeSecurYou");
  const closeCall = document.getElementById("btn-closecall");
  const lastVideo = document.getElementById("appel-wesecuryouul");

  lastVideo.style.display = "none";

  firstVideo.addEventListener("click", e => {
    if (sequenceNumber === 0) {
      changingSequence();
      document.getElementById("video-watched-window").classList.remove("hidden");
    }

    console.log(sequenceNumber);
  });

  closeCall.addEventListener("click", e=> {
    if (sequenceNumber === 3) {
      lastVideo.style.display = "block";
    }
  });

  lastVideo.addEventListener("click", e => {
    if (sequenceNumber === 3)
      changingSequence();
  });

  //unlockContacts();
  mainHintFound = true ;
  unlockContacts() ;

/*
  wsyCall.addEventListener("click", e => {
    if (sequenceNumber === 3)
      changingSequence();
  })
  */
}
