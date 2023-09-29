const text = `
Out of the night that covers me,
Black as the pit from pole to pole,
I thank whatever gods may be
For my unconquerable soul.

In the fell clutch of circumstance,
I have not winced nor cried aloud.
Under the bludgeonings of chance,
My head is bloody, but unbowed.

Beyond this place of wrath and tears,
Looms but the Horror of the shade,
And yet the menace of the years,
Finds and shall find me unafraid.

It matters not how strait the gate,
How charged with punishments the scroll,
I am the master of my fate,
I am the captain of my soul.
`;

const playVoice = async () => {
  if ('speechSynthesis' in window) {
    var utterance = new SpeechSynthesisUtterance();
    utterance.text = text;
    utterance.pitch = 0.2;
    utterance.volume = 3;
    utterance.rate = 0.5;
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  } else {
    alert("Sorry, your browser doesn't support text to speech!");
  }
};

const el = document.getElementById('src-btn');
el.addEventListener('click', playVoice);
