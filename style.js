
window.onload = function () {
    displayRegistrations();
};


function selectEvent(eventName) {
    document.getElementById("event").value = eventName;

    document
        .getElementById("register")
        .scrollIntoView({
            behavior: "smooth"
        });
}



function searchEvent() {

    let input = document
        .getElementById("search")
        .value
        .toLowerCase();

    let cards = document.querySelectorAll(".event-card");

    cards.forEach(function(card){

        let title = card.querySelector("h3")
        .innerText
        .toLowerCase();

        if(title.includes(input))
        {
            card.style.display = "block";
        }
        else
        {
            card.style.display = "none";
        }

    });

}


document
.getElementById("eventForm")
.addEventListener("submit", function(e){

    e.preventDefault();

    let name =
    document.getElementById("name").value.trim();

    let email =
    document.getElementById("email").value.trim();

    let phone =
    document.getElementById("phone").value.trim();

    let event =
    document.getElementById("event").value.trim();

    // Validation

    if(name=="" || email=="" || phone=="" || event=="")
    {
        alert("Please fill all fields.");
        return;
    }

    let emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailPattern.test(email))
    {
        alert("Enter valid Email.");
        return;
    }

    let phonePattern =
    /^[0-9]{10}$/;

    if(!phonePattern.test(phone))
    {
        alert("Enter valid 10 digit Mobile Number.");
        return;
    }

    let registration = {

        name:name,
        email:email,
        phone:phone,
        event:event

    };

    let registrations =
    JSON.parse(localStorage.getItem("registrations"))
    || [];

    registrations.push(registration);

    localStorage.setItem(
        "registrations",
        JSON.stringify(registrations)
    );

    alert("Registration Successful!");

    document
    .getElementById("eventForm")
    .reset();

    displayRegistrations();

});



function displayRegistrations(){

    let registrationList =
    document.getElementById("registrationList");

    registrationList.innerHTML="";

    let registrations =
    JSON.parse(localStorage.getItem("registrations"))
    || [];

    if(registrations.length==0)
    {

        registrationList.innerHTML =
        "<p>No Registration Found.</p>";

        return;

    }

    registrations.forEach(function(item,index){

        registrationList.innerHTML +=

        `
        <div class="registration-card">

        <h3>${item.event}</h3>

        <p><strong>Name :</strong> ${item.name}</p>

        <p><strong>Email :</strong> ${item.email}</p>

        <p><strong>Phone :</strong> ${item.phone}</p>

        <button onclick="deleteRegistration(${index})">

        Delete

        </button>

        </div>

        `;

    });

}



function deleteRegistration(index){

    let registrations =
    JSON.parse(localStorage.getItem("registrations"))
    || [];

    let confirmDelete =
    confirm("Are you sure?");

    if(confirmDelete)
    {

        registrations.splice(index,1);

        localStorage.setItem(
            "registrations",
            JSON.stringify(registrations)
        );

        displayRegistrations();

    }

}


let contactForm =
document.querySelector(".contact form");

contactForm.addEventListener("submit",function(e){

    e.preventDefault();

    let inputs =
    contactForm.querySelectorAll("input, textarea");

    let valid = true;

    inputs.forEach(function(input){

        if(input.value.trim()=="")
        {
            valid=false;
        }

    });

    if(valid)
    {

        alert("Message Sent Successfully!");

        contactForm.reset();

    }
    else
    {

        alert("Please fill all fields.");

    }

});



window.addEventListener("scroll", function(){

    if(window.scrollY > 300)
    {
        document.body.style.scrollBehavior="smooth";
    }

});



console.log("Community Event Management Portal");
console.log("Designed by Ashwini Rajdev");