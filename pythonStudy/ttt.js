"use strict";
let timerState = {
    isRunning: !1,
    currentTime: 0,
    currentExerciseIndex: -1,
    exercises: [],
    totalRounds: 1,
    totalCycles: 1,
    countdown: !0,
    workoutType: "hiit",
    currentRound: 1,
    currentCycle: 1
}
  , intervalId = null
  , lastTickTime = 0;
const TICK_INTERVAL = 100;
function getExerciseInfo(e) {
    return e >= 0 && e < timerState.exercises.length ? timerState.exercises[e] : null
}
function getNextExerciseInfo(e) {
    let t = e + 1;
    return t >= 0 && t < timerState.exercises.length ? timerState.exercises[t] : null
}
function formatTimeWorker(e) {
    e < 0 && (e = 0);
    let t = Math.floor(e / 60)
      , r = Math.floor(e % 60);
    return `${t.toString().padStart(2, "0")}:${r.toString().padStart(2, "0")}`
}
function sendStateUpdate() {
    let e = getExerciseInfo(timerState.currentExerciseIndex)
      , t = getNextExerciseInfo(timerState.currentExerciseIndex)
      , r = {
        currentTime: timerState.currentTime,
        formattedTime: formatTimeWorker(Math.ceil(timerState.currentTime > 0 ? timerState.currentTime : 0)),
        currentExerciseIndex: timerState.currentExerciseIndex,
        exerciseName: "Ready",
        exerciseType: null,
        exerciseDuration: 0,
        currentRound: timerState.currentRound,
        totalRounds: timerState.totalRounds,
        currentCycle: timerState.currentCycle,
        totalCycles: timerState.totalCycles,
        progress: 0,
        totalProgress: 0,
        nextExerciseName: "Workout Complete",
        nextExerciseDurationFormatted: "",
        isRunning: timerState.isRunning,
        isComplete: !1,
        workoutType: timerState.workoutType
    };
    e && (r.exerciseName = e.name || "Exercise",
    r.exerciseType = e.type || "work",
    r.exerciseDuration = e.duration || 0,
    r.exerciseDuration > 0 && (r.progress = Math.min(1, 1 - timerState.currentTime / r.exerciseDuration))),
    t && (r.nextExerciseName = t.name || "Next Exercise",
    r.nextExerciseDurationFormatted = formatTimeWorker(t.duration || 0));
    let i = 0
      , n = 0;
    if (timerState.exercises.forEach( (e, t) => {
        "prep" !== e.type && (n += e.duration || 0,
        t < timerState.currentExerciseIndex && (i += e.duration || 0))
    }
    ),
    e && "prep" !== e.type) {
        let a = Math.max(0, e.duration - timerState.currentTime);
        i += a
    }
    if (r.totalProgress = n > 0 ? Math.min(1, i / n) : 0,
    timerState.currentExerciseIndex >= timerState.exercises.length)
        r.isComplete = !0,
        r.exerciseName = "Great Job!",
        r.formattedTime = "Done!",
        r.progress = 1,
        r.totalProgress = 1;
    else if (-1 === timerState.currentExerciseIndex) {
        r.exerciseName = "Ready",
        r.formattedTime = formatTimeWorker(timerState.exercises.length > 0 && timerState.exercises[0].duration || 0);
        let o = getExerciseInfo(0);
        o ? (r.nextExerciseName = o.name || "First Exercise",
        r.nextExerciseDurationFormatted = formatTimeWorker(o.duration || 0)) : (r.nextExerciseName = "",
        r.nextExerciseDurationFormatted = "")
    }
    postMessage({
        type: "tick",
        state: r
    })
}
function advanceToNextExercise() {
    if (timerState.currentExerciseIndex++,
    timerState.currentExerciseIndex >= timerState.exercises.length) {
        completeWorkout();
        return
    }
    let e = getExerciseInfo(timerState.currentExerciseIndex);
    if (!e) {
        console.error("Worker: Invalid exercise at index", timerState.currentExerciseIndex),
        completeWorkout();
        return
    }
    if (timerState.currentTime = e.duration || 0,
    timerState.currentRound = e.round || 1,
    timerState.currentCycle = e.cycle || 1,
    postMessage({
        type: "changeBackground",
        bgType: e.type
    }),
    postMessage({
        type: "flashScreen"
    }),
    "prep" !== e.type) {
        let t = "work" === e.type ? "work" : "rest" === e.type ? "rest" : null;
        t && postMessage({
            type: "playSound",
            sound: t
        })
    }
    let r = e.name || "exercise_modal.default_exercise_name"
      , i = {};
    e.type,
    "rest" === e.type && "rest" !== r.toLowerCase() ? (r = "audio.announce_rest_with_name",
    i = {
        name: e.name || ""
    }) : "prep" === e.type ? r = "next_exercise.initial_name" : (i = {
        name: e.name || ""
    },
    r = "audio.announce_exercise_name"),
    postMessage({
        type: "speak",
        key: r,
        params: i
    }),
    sendStateUpdate(),
    lastTickTime = performance.now()
}
function tick() {
    if (!timerState.isRunning)
        return;
    let e = performance.now()
      , t = Math.min(5, (e - lastTickTime) / 1e3);
    if (lastTickTime = e,
    t <= 0)
        return;
    let r = timerState.currentTime;
    if (timerState.currentTime -= t,
    timerState.countdown) {
        let i = Math.ceil(timerState.currentTime);
        if (i <= 3 && i > 0 && i !== Math.ceil(r)) {
            postMessage({
                type: "playSound",
                sound: "countdown"
            });
            let n = getExerciseInfo(timerState.currentExerciseIndex);
            if (n && ("rest" === n.type || "prep" === n.type)) {
                let a = getNextExerciseInfo(timerState.currentExerciseIndex);
                a && "work" === a.type && 3 === i && postMessage({
                    type: "speak",
                    key: "audio.announce_next_exercise",
                    params: {
                        name: a.name || ""
                    }
                })
            } else
                "emom" === timerState.workoutType && n && "work" === n.type && 3 === i && postMessage({
                    type: "speak",
                    key: "audio.announce_3_seconds_left",
                    params: {}
                })
        }
    }
    timerState.currentTime <= 0 ? advanceToNextExercise() : sendStateUpdate()
}
function startTimer() {
    if (timerState.isRunning || !timerState.exercises || 0 === timerState.exercises.length) {
        sendStateUpdate();
        return
    }
    (-1 !== timerState.currentExerciseIndex || (advanceToNextExercise(),
    -1 !== timerState.currentExerciseIndex)) && (timerState.isRunning = !0,
    lastTickTime = performance.now(),
    clearInterval(intervalId),
    intervalId = setInterval(tick, 100),
    console.log("Worker: Timer Started"),
    sendStateUpdate())
}
function pauseTimer() {
    if (!timerState.isRunning) {
        sendStateUpdate();
        return
    }
    timerState.isRunning = !1,
    clearInterval(intervalId),
    intervalId = null,
    console.log("Worker: Timer Paused"),
    sendStateUpdate()
}
function resetTimer() {
    pauseTimer(),
    timerState.currentExerciseIndex = -1,
    timerState.currentTime = 0,
    timerState.currentRound = 1,
    timerState.currentCycle = 1,
    console.log("Worker: Timer Reset"),
    sendStateUpdate()
}
function skipExercise() {
    if (timerState.exercises && 0 !== timerState.exercises.length) {
        if (timerState.currentExerciseIndex >= timerState.exercises.length - 1) {
            completeWorkout();
            return
        }
        console.log("Worker: Skipping Exercise"),
        advanceToNextExercise()
    }
}
function completeWorkout() {
    pauseTimer(),
    timerState.currentExerciseIndex = timerState.exercises.length,
    timerState.currentTime = 0,
    console.log("Worker: Workout Completed"),
    postMessage({
        type: "playSound",
        sound: "complete"
    }),
    postMessage({
        type: "speak",
        key: "audio.announce_workout_complete"
    }),
    postMessage({
        type: "changeBackground",
        bgType: null
    }),
    sendStateUpdate(),
    postMessage({
        type: "workoutComplete"
    })
}
self.onmessage = function(e) {
    let t = e.data.command
      , r = e.data.data;
    switch (t) {
    case "init":
        timerState.exercises = r.sequence || [],
        timerState.totalRounds = r.totalRounds || 1,
        timerState.totalCycles = r.totalCycles || 1,
        timerState.countdown = r.settings?.countdown !== !1,
        timerState.workoutType = r.settings?.workoutType || "hiit",
        resetTimer();
        break;
    case "loadSequence":
        timerState.exercises = r.sequence || [],
        timerState.totalRounds = r.totalRounds || 1,
        timerState.totalCycles = r.totalCycles || 1,
        timerState.workoutType = r.workoutType || "hiit",
        timerState.isRunning && console.warn("Worker: Sequence loaded while running. Resetting timer."),
        resetTimer();
        break;
    case "start":
        startTimer();
        break;
    case "pause":
        pauseTimer();
        break;
    case "reset":
        resetTimer();
        break;
    case "skip":
        skipExercise();
        break;
    case "updateSettings":
        r.settings && (timerState.countdown = !1 !== r.settings.countdown,
        timerState.workoutType = r.settings.workoutType || "hiit");
        break;
    default:
        console.warn("Worker received unknown command:", t)
    }
}
,
console.log("Timer Worker initialized.");
