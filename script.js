const questions = [
"Makanan favorit yang gak pernah bikin bosen?",
"Minuman favorit?",
"Tempat favorit buat healing?",
"Lagu yang lagi sering diputar?",
"Weekend ideal?",
"Kebiasaan unik?",
"Hal paling impulsif?",
"Love language?",
"Barang wajib dibawa?",
"Tim kuah ramen habis atau sisa?",
"Hal yang bikin ilfeel?",
"Hal paling annoying saat chat?",
"Kalau bad mood biasanya gimana?",
"Hal yang gak bisa ditoleransi dalam hubungan?",
"Kebiasaan makan yang bikin ilfeel?",
"Pelajaran hidup paling berharga?",
"Safe space menurutmu?",
"Cara membagi waktu pasangan dan hobi?",
"First impression tentang Jabun?",
"Destinasi impian bareng pasangan?"
];

let current = 0;
let answers = JSON.parse(localStorage.getItem("andriAnswers")) || new Array(20).fill("");

const landing = document.getElementById("landing");
const quiz = document.getElementById("quiz");
const finish = document.getElementById("finish");

const startBtn = document.getElementById("startBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const questionTitle = document.getElementById("questionTitle");
const answer = document.getElementById("answer");

const progressBar = document.getElementById("progressBar");
const questionNumber = document.getElementById("questionNumber");
const percent = document.getElementById("percent");

const copyBtn = document.getElementById("copyBtn");
const waBtn = document.getElementById("waBtn");

startBtn.addEventListener("click", () => {
    landing.classList.remove("active");
    quiz.classList.add("active");
    loadQuestion();
});

function loadQuestion(){

    questionTitle.innerText = (current+1)+". "+questions[current];

    answer.value = answers[current];

    questionNumber.innerText =
    (current+1)+" / "+questions.length;

    const progress =
    ((current+1)/questions.length)*100;

    progressBar.style.width = progress+"%";

    percent.innerText = Math.round(progress)+"%";

    prevBtn.style.display =
    current===0 ? "none" : "block";

    nextBtn.innerText =
    current===questions.length-1
    ? "Finish ❤️"
    : "Next →";

}answer.addEventListener("input", () => {
    answers[current] = answer.value;
    localStorage.setItem(
        "andriAnswers",
        JSON.stringify(answers)
    );
});

nextBtn.addEventListener("click", () => {

    answers[current] = answer.value;

    localStorage.setItem(
        "andriAnswers",
        JSON.stringify(answers)
    );

    if(current < questions.length-1){

        current++;
        loadQuestion();

    }else{

        quiz.classList.remove("active");
        finish.classList.add("active");

    }

});

prevBtn.addEventListener("click", () => {

    answers[current] = answer.value;

    localStorage.setItem(
        "andriAnswers",
        JSON.stringify(answers)
    );

    if(current>0){

        current--;
        loadQuestion();

    }

});

copyBtn.addEventListener("click",()=>{

    let text = "☕ Andri's Space\n\n";

    questions.forEach((q,i)=>{

        text += (i+1)+". "+q+"\n";
        text += answers[i]+"\n\n";

    });

    navigator.clipboard.writeText(text);

    copyBtn.innerText = "✅ Berhasil Dicopy";

    setTimeout(()=>{

        copyBtn.innerText="📋 Copy Jawaban";

    },2000);

});waBtn.addEventListener("click", () => {

    let text = "☕ *Andri's Space*%0A%0A";

    questions.forEach((q, i) => {

        text += "*" + (i + 1) + ". " + q + "*%0A";
        text += (answers[i] || "-") + "%0A%0A";

    });

    // GANTI DENGAN NOMOR WHATSAPP JABUN
    const phone = "6281268104866";

    window.open(
        `https://wa.me/${phone}?text=${text}`,
        "_blank"
    );

});

window.addEventListener("beforeunload", () => {

    answers[current] = answer.value;

    localStorage.setItem(
        "andriAnswers",
        JSON.stringify(answers)
    );

});

if(localStorage.getItem("andriAnswers")){

    answers = JSON.parse(
        localStorage.getItem("andriAnswers")
    );

}
