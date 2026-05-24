// =========================
// TARGET DATE & TIME
// Bangladesh Time (GMT+6)
// 24 May 2026 • 11:59:59 PM
// =========================

const targetDate = new Date("2026-05-24T23:13:59+06:00");


// =========================
// ELEMENTS
// =========================

const countdownScreen = document.getElementById("countdownScreen");

const birthdayContent = document.getElementById("birthdayContent");

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

const wishCard = document.getElementById("wishCard");

const wishTitle = document.getElementById("wishTitle");

const wishMessage = document.getElementById("wishMessage");

const dots = document.querySelectorAll(".dot");

const toast = document.getElementById("toast");


// =========================
// HARD CODED WISHES
// =========================

const wishes = [

    {
        from: "Jaan 💖",
        message:
            "Happy Birthday আমার জান পাখি ❤️তুই শুধু আমার ছোট বোন না, তুই আমার comfort person। তোর সাথে ঝগড়া করি, মজা করি, আবার তোকেই সবচেয়ে বেশি ভালোবাসি সেটা তুই খুব ভালোই জানিস। আল্লাহ তোকে সবসময় ভালো রাখুক, সুস্থ রাখুক, জ্ঞান-বুদ্ধি দান করুক, সারা জীবন সুখে আর শান্তিতে রাখুক, আর তোর জীবনে অনেক শুধু সুন্দর সুন্দর মুহূর্ত আসুক। I  you sooo much Jan Pakhi 💖"
    },


    {
        from: "Mimi 🎉",
        message:
            "Happy Birthday! 🎉 Another year older, but don't worry — you’re still younger than you’ll be next year 😎 Hope your day is full of cake, zero responsibilities, and people pretending they remembered without Facebook telling them. Have the best one yet!"
    },

    

    {
        from: "Raku 🌸",
        message:
            "Happy birthday, big sis 🖤 Many happy returns of the day! Another year older, wiser… (which is just a fancy way of saying you’re slowly turning into a grandma 😭) and, somehow still functioning without a system crash —--- truly impressive 👏 And hey, whenever life gets annoying, your lil bro is always here to listen to the rants 🫡 Now go enjoy your day and have the amazing birthday you deserve 🎉"
    },

    {
        from: "Rin ✨",
        message:
            "Happy birthday ❤️ Tho you raid 50% of my wardrobe and 100% of my patience, i hope this year brightens your life with happiness and enlightens your knowledge enough to take my top tier relationship advice and stop picking the most random people to date. Anyways I'll still be here when you fuck up and come crying, love you the most."
    },

    {
        from: "Annsha 🎈",
        message:
            "happy birthday!! honestly missing you like crazy today. living far away sucks but i’m literally still living off the core memories we made jokhon dhakay chilam.  adore you so much, hope you have the most amazing day."
    },

    {
        from: "Rat 💖",
        message:
            "May Allah bless you all the happiness you deserve."
    }

];


// =========================
// CURRENT WISH INDEX
// =========================

let currentWish = 0;


// =========================
// UPDATE WISH CARD
// =========================

function updateWish(index) {

    const wish = wishes[index];

    wishTitle.textContent = `Wish from ${wish.from}`;

    wishMessage.textContent = wish.message;

    dots.forEach((dot, i) => {

        dot.classList.remove("active");

        if (i === index) {
            dot.classList.add("active");
        }

    });

}


// =========================
// CARD CLICK
// =========================

wishCard.addEventListener("click", () => {

    currentWish++;

    if (currentWish >= wishes.length) {
        currentWish = 0;
    }

    updateWish(currentWish);

});


// =========================
// TOAST
// =========================

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}


// =========================
// CONFETTI
// Only appears briefly
// after countdown ends
// =========================

const canvas = document.getElementById("confettiCanvas");

const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;

canvas.height = window.innerHeight;

let confettiPieces = [];

let confettiAnimation = null;

let confettiStarted = false;


// CREATE CONFETTI

function createConfetti() {

    confettiPieces = [];

    for (let i = 0; i < 150; i++) {

        confettiPieces.push({

            x: Math.random() * canvas.width,

            y: Math.random() * canvas.height,

            size: Math.random() * 8 + 4,

            speed: Math.random() * 3 + 2,

            color: `hsl(${Math.random() * 360}, 100%, 70%)`,

            rotation: Math.random() * 360

        });

    }

}


// START CONFETTI

function startConfetti() {

    // Prevent multiple triggers
    if (confettiStarted) return;

    confettiStarted = true;

    createConfetti();

    canvas.style.opacity = "1";

    drawConfetti();

    // Fade away after 6 seconds
    setTimeout(() => {

        canvas.style.transition = "opacity 2s ease";

        canvas.style.opacity = "0";

    }, 6000);

    // Stop animation completely
    setTimeout(() => {

        cancelAnimationFrame(confettiAnimation);

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

    }, 8000);

}


// DRAW CONFETTI

function drawConfetti() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    confettiPieces.forEach(piece => {

        ctx.save();

        ctx.translate(piece.x, piece.y);

        ctx.rotate(piece.rotation);

        ctx.fillStyle = piece.color;

        ctx.fillRect(
            -piece.size / 2,
            -piece.size / 2,
            piece.size,
            piece.size
        );

        ctx.restore();

        piece.y += piece.speed;

        piece.rotation += 0.03;

    });

    confettiAnimation =
        requestAnimationFrame(drawConfetti);

}


// =========================
// COUNTDOWN
// =========================

let birthdayShown = false;

function updateCountdown() {

    const now = new Date();

    const difference = targetDate - now;

    // BEFORE TARGET TIME
    if (difference > 0) {

        countdownScreen.classList.remove("hidden");

        birthdayContent.classList.add("hidden");

        const days = Math.floor(
            difference / (1000 * 60 * 60 * 24)
        );

        const hours = Math.floor(
            (difference % (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );

        const minutes = Math.floor(
            (difference % (1000 * 60 * 60)) /
            (1000 * 60)
        );

        const seconds = Math.floor(
            (difference % (1000 * 60)) /
            1000
        );

        daysEl.textContent =
            String(days).padStart(2, "0");

        hoursEl.textContent =
            String(hours).padStart(2, "0");

        minutesEl.textContent =
            String(minutes).padStart(2, "0");

        secondsEl.textContent =
            String(seconds).padStart(2, "0");

    }

    // AFTER TARGET TIME
    else {

        // Prevent repeating
        if (!birthdayShown) {

            birthdayShown = true;

            // Completely remove countdown
            countdownScreen.remove();

            // Show birthday content
            birthdayContent.classList.remove("hidden");

            // Trigger confetti once
            startConfetti();

            // Birthday toast
            setTimeout(() => {

                showToast("🎉 Happy Birthday!");

            }, 800);

        }

    }

}


// =========================
// INITIALIZE
// =========================

updateCountdown();

setInterval(updateCountdown, 1000);

updateWish(currentWish);


// =========================
// RESIZE CANVAS
// =========================

window.addEventListener("resize", () => {

    canvas.width = window.innerWidth;

    canvas.height = window.innerHeight;

});