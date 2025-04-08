<script>
  import { onMount } from 'svelte';
  let timeLeft = 0;
  let interval;
  let isRunning = false;
  let audio;
  let flash = false;

  onMount(() => {
    audio = new Audio('https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg');
  });

  function playSoundBriefly() {
    if (audio) {
      audio.play();
      setTimeout(() => {
        audio.pause();
        audio.currentTime = 0;
      }, 3000);
    }
  }

  function triggerFlash() {
    flash = true;
    setTimeout(() => flash = false, 300);
  }

  function vibrate() {
    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200]);
    }
  }

  function onTimerEnd() {
    playSoundBriefly();
    vibrate();
    triggerFlash();
  }

  function startTimer(seconds) {
    clearInterval(interval);
    timeLeft = seconds;
    isRunning = true;
    interval = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
      } else {
        clearInterval(interval);
        isRunning = false;
        onTimerEnd();
      }
    }, 1000);
  }

  function togglePause() {
    if (isRunning) {
      clearInterval(interval);
    } else {
      interval = setInterval(() => {
        if (timeLeft > 0) {
          timeLeft--;
        } else {
          clearInterval(interval);
          isRunning = false;
          onTimerEnd();
        }
      }, 1000);
    }
    isRunning = !isRunning;
  }

  function resetTimer() {
    clearInterval(interval);
    timeLeft = 0;
    isRunning = false;
  }

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }
</script>

<main class="p-4 max-w-md mx-auto text-center" class:flash={flash}>
  <h1 class="text-3xl font-bold mb-4">Timer App</h1>

  <div class="space-x-2 mb-4">
    <button class="bg-blue-500 text-white px-4 py-2 rounded" on:click={() => startTimer(30)}>30s</button>
    <button class="bg-blue-500 text-white px-4 py-2 rounded" on:click={() => startTimer(60)}>1m</button>
    <button class="bg-blue-500 text-white px-4 py-2 rounded" on:click={() => startTimer(120)}>2m</button>
  </div>

  <div class="text-5xl font-mono my-6">{formatTime(timeLeft)}</div>

  <div class="space-x-2">
    <button class="bg-green-500 text-white px-4 py-2 rounded" on:click={togglePause}>{isRunning ? 'Pause' : 'Resume'}</button>
    <button class="bg-red-500 text-white px-4 py-2 rounded" on:click={resetTimer}>Reset</button>
  </div>
</main>

<style>
  button:hover {
    opacity: 0.9;
  }

  .flash {
    animation: flash-bg 0.3s ease-in-out;
  }

  @keyframes flash-bg {
    0% { background-color: white; }
    50% { background-color: #ffeb3b; }
    100% { background-color: white; }
  }
</style>