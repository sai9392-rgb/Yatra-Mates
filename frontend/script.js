

// Logged-in user (saved by the login page)

let savedUser = null;

try {
    savedUser = JSON.parse(localStorage.getItem("user"));
} catch (error) {
    savedUser = null;
}

if (savedUser) {

    document.getElementById("userGreeting").innerText =
        "Hi, " + savedUser.name;

    let loginButton = document.querySelector(".login-btn");

    loginButton.innerText = "Logout";

    loginButton.onclick = function () {
        localStorage.removeItem("user");
        window.location.reload();
    };
}


// Explore Trips button

function exploreTrips() {
    document.getElementById("trips").scrollIntoView({
        behavior: "smooth"
    });
}


// Show only the trips going to a destination ("" shows all trips).
// Returns how many trips matched.

function showTrips(destination) {

    let cards = [...document.querySelectorAll(".trip-card")];

    let matching = cards.filter(function (card) {
        let title = card.querySelector("h3").innerText.toLowerCase();
        return title.includes(destination.toLowerCase());
    });

    // If no trip matches, keep showing every trip
    let visible = matching.length > 0 ? matching : cards;

    cards.forEach(function (card) {
        card.style.display = visible.includes(card) ? "" : "none";
    });

    let message = "";

    if (destination !== "" && matching.length === 0) {
        message = "No trips to " + destination +
            " yet. Here are all our trips.";
    } else if (destination !== "") {
        message = "Showing trips to " + destination + ".";
    }

    document.getElementById("tripMessage").innerText = message;
    document.getElementById("tripFilter").hidden = message === "";
    document.getElementById("showAllTrips").hidden =
        visible.length === cards.length;

    return matching.length;
}


// Search destination

function searchDestination() {

    let destination =
        document.getElementById("searchInput").value.trim();

    let result =
        document.getElementById("searchResult");


    if (destination === "") {

        result.innerText =
            "Please enter a destination.";

        return;
    }

    let found = showTrips(destination);

    if (found === 0) {

        result.innerText =
            "No trips found for " + destination + " yet.";

    } else {

        result.innerText =
            "Found " + found + " trip(s) for " + destination + ".";

        exploreTrips();
    }
}


// View destination

function viewDestination(destination) {

    showTrips(destination);
    exploreTrips();
}


// Join trip

function joinTrip(tripName) {

    if (!savedUser) {
        alert("Please log in to join a trip.");
        window.location.href = "login.html";
        return;
    }

    alert(
        "You selected the " +
        tripName +
        " trip!"
    );
}


// Budget Planner

document.getElementById("budgetForm").addEventListener("submit", function (event) {

    event.preventDefault();

    let total =
        Number(document.getElementById("travelCost").value) +
        Number(document.getElementById("stayCost").value) +
        Number(document.getElementById("foodCost").value) +
        Number(document.getElementById("otherCost").value);

    let travellers =
        Number(document.getElementById("travellers").value);

    let perPerson = Math.round(total / travellers);

    document.getElementById("budgetResult").innerText =
        "Total: ₹" + total.toLocaleString("en-IN") +
        "  |  Per person: ₹" + perPerson.toLocaleString("en-IN");
});
