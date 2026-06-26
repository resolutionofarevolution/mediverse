/* ==========================================
   MEDIVERSE
   Global JavaScript
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeCards();
    initializeButtons();
    initializeAnimations();

});


/* ==========================================
   ACTION CARDS
========================================== */

function initializeCards(){

    const cards = document.querySelectorAll(".action-card");

    cards.forEach(card => {

        card.addEventListener("click", () => {

            card.style.transform = "scale(.98)";

            setTimeout(() => {
                card.style.transform = "";
            },150);

        });

    });

}


/* ==========================================
   BUTTON EFFECTS
========================================== */

function initializeButtons(){

    const buttons = document.querySelectorAll("button,.btn");

    buttons.forEach(button=>{

        button.addEventListener("click",()=>{

            button.classList.add("clicked");

            setTimeout(()=>{
                button.classList.remove("clicked");
            },250);

        });

    });

}


/* ==========================================
   SCROLL ANIMATION
========================================== */

function initializeAnimations(){

    const observer = new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("show");

            }

        });

    },{
        threshold:0.15
    });

    document.querySelectorAll(".feature,.action-card,.hero")
        .forEach(el=>observer.observe(el));

}

/* ==========================================
UPLOAD PREVIEW
========================================== */

const fileInput = document.getElementById("prescriptionInput");

if(fileInput){

    fileInput.addEventListener("change",function(){

        const file=this.files[0];

        if(!file) return;

        const preview=document.getElementById("previewContainer");

        if(file.type.startsWith("image")){

            const reader=new FileReader();

            reader.onload=function(e){

                preview.innerHTML=`
                    <img
                        src="${e.target.result}"
                        class="preview-image"
                    >
                    <h3>${file.name}</h3>
                `;

            };

            reader.readAsDataURL(file);

        }

        else{

            preview.innerHTML=`

                <i class="fa-solid fa-file-pdf upload-big-icon"></i>

                <h3>${file.name}</h3>

            `;

        }

    });

}
/* ==========================================
   FUTURE FUNCTIONS
========================================== */

/*

Upcoming modules

✓ Upload Prescription

✓ Browse Medicines

✓ OCR Processing

✓ Medicine Detection

✓ Cart

✓ Checkout

✓ Dashboard

All functionality will be added here.

*/

/* ==========================================
PROCESSING PAGE
========================================== */

const progressBar = document.getElementById("progressFill");

if(progressBar){

    const progressText = document.getElementById("progressPercent");

    const status = document.getElementById("statusText");

    const messages = [

        "Reading prescription...",
        "Extracting doctor's notes...",
        "Detecting medicines...",
        "Checking medicine inventory...",
        "Preparing results..."

    ];

    let progress = 0;

    let index = 0;

    const timer = setInterval(() => {

        progress += 2;

        progressBar.style.width = progress + "%";

        progressText.innerHTML = progress + "%";

        if(progress % 20 === 0 && index < messages.length){

            status.innerHTML = messages[index];

            const step = document.getElementById("step"+(index+1));

            if(step){

                step.classList.add("active");

            }

            index++;

        }

        if(progress >=100){

            clearInterval(timer);

            setTimeout(()=>{

                window.location="/detected";

            },700);

        }

    },70);

}

/*========================================
WIZARD
========================================*/

let currentStep = 1;

const totalSteps = 5;

const nextBtn = document.getElementById("nextBtn");

const backBtn = document.getElementById("backBtn");

function showStep(step){


currentStep = step;

for(let i=1;i<=totalSteps;i++){

    const section =
        document.getElementById("step"+i);

    if(section){

        section.classList.remove("active-step");

    }

}

document
    .getElementById("step"+step)
    .classList
    .add("active-step");

/* Progress */

document.getElementById("stepIndicator")
    .innerHTML =
    "Step " + step + " of " + totalSteps;

document.getElementById("wizardProgress")
    .style.width =
    ((step / totalSteps) * 100) + "%";

/* Back Button */

if(step === 1){

    backBtn.style.display = "none";

}else{

    backBtn.style.display = "inline-flex";

}

/* Footer Label */

const footerLabel =
    document.getElementById("footerLabel");

/* Step Specific UI */

switch(step){

    case 1:

        footerLabel.innerHTML =
        "Review Medicines";

        nextBtn.innerHTML =
        'Continue <i class="fa-solid fa-arrow-right"></i>';

        break;

    case 2:

        footerLabel.innerHTML =
        "Delivery Address";

        nextBtn.innerHTML =
        'Continue <i class="fa-solid fa-arrow-right"></i>';

        break;

    case 3:

        footerLabel.innerHTML =
        "Contact Details";

        nextBtn.innerHTML =
        'Continue <i class="fa-solid fa-arrow-right"></i>';

        break;

    case 4:

        footerLabel.innerHTML =
        "Review Order";

        nextBtn.innerHTML =
        'Proceed to Payment <i class="fa-solid fa-arrow-right"></i>';

        break;

    case 5:

    nextBtn.innerHTML = 'Pay ₹312';

        break;

}


}


if(nextBtn){

    nextBtn.onclick=function(){

        if(currentStep<totalSteps){

            currentStep++;

            showStep(currentStep);

        }

    }

}

if(backBtn){

    backBtn.onclick=function(){

        if(currentStep>1){

            currentStep--;

            showStep(currentStep);

        }

    }

}

showStep(1);


/* ==========================================
MEDIVERSE ADDRESS STEP
========================================== */

function mediverseToggleAddressStep2() {

    const form = document.getElementById(
        "mediverseAddressFormStep2"
    );

    if (
        form.style.display === "none" ||
        form.style.display === ""
    ) {

        form.style.display = "block";

    } else {

        form.style.display = "none";

    }

}

/* Step 5 */

function mediverseProcessPayment(){


document.getElementById("step5").style.display = "none";

document.getElementById(
    "mediverseSuccessScreen"
).style.display = "block";

setTimeout(function(){

    document.getElementById(
        "successLoader"
    ).style.display = "none";

    document.getElementById(
        "successCheckmark"
    ).style.display = "block";

    document.getElementById(
        "successTitle"
    ).innerText =
    "Order Confirmed";

    document.getElementById(
        "successSubtitle"
    ).innerText =
    "Estimated delivery in 25-35 minutes";

},3000);


}
function mediverseProcessPayment() {

    const payBtn = document.getElementById("payBtn");

    // Prevent multiple clicks
    if (payBtn.disabled) return;

    payBtn.disabled = true;
    payBtn.innerHTML = "Processing...";

    // Hide checkout step
    document.getElementById("step5").style.display = "none";

    // Show success screen
    document.getElementById("mediverseSuccessScreen").style.display = "flex";

    // Reset success screen
    document.getElementById("successLoader").style.display = "block";
    document.getElementById("successCheckmark").style.display = "none";

    document.getElementById("successTitle").innerText =
        "Processing Payment...";

    document.getElementById("successSubtitle").innerText =
        "Please wait while we confirm your order";

    document.querySelector(".track-order-btn").style.display = "none";

    // Simulate payment processing
    setTimeout(function () {

        document.getElementById("successLoader").style.display = "none";
        document.getElementById("successCheckmark").style.display = "block";

        document.getElementById("successTitle").innerText =
            "Order Confirmed!";

        document.getElementById("successSubtitle").innerText =
            "Estimated delivery in 25-35 minutes";

        document.querySelector(".track-order-btn").style.display =
            "inline-block";

    }, 2000);
}


// Track Order Button
document.querySelector(".track-order-btn").addEventListener("click", function () {

    // Replace with your tracking page
    window.location.href = "/track-order";

});