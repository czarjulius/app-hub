const reminder = async () => {
  if ('speechSynthesis' in window) {
    // Speech Synthesis supported 🎉
    var msg = new SpeechSynthesisUtterance();

    msg.text =
      'Hi Julius, You promised to spend only 30 minutes on twitter today. I want you to know you have 5 minutes left till I redirect you to a more useful page. Thanks for understanding.';
    window.speechSynthesis.speak(msg);
    setInterval(() => {
      window.location.href = 'https://orla.africa';
    }, 10000);
  } else {
    // Speech Synthesis Not Supported 😣
    alert("Sorry, your browser doesn't support text to speech!");
  }
};

const el = document.getElementById('reminder');
el.addEventListener('click', reminder);
