export const playCPSClickSound = () => {
  const sound = new Howl({
    src: ["./cps-test-click.mp3"],
  });
  sound.play();
};

export const playBackgroundMusic = () => {
  const sound = new Howl({
    src: ["./background-music.mp3"],
  });
  sound.play();
};
