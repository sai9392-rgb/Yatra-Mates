

function loginMessage() {
    alert("Login page will be available soon!");
}


// Explore Trips button

function exploreTrips() {
    document.getElementById("trips").scrollIntoView({
        behavior: "smooth"
    });
}


// Search destination

function searchDestination() {

    let destination =
        document.getElementById("searchInput").value;

    let result =
        document.getElementById("searchResult");


    if (destination === "") {

        result.innerText =
            "Please enter a destination.";

    } else {

        result.innerText =
            "Searching trips for " + destination + "...";
    }
}


// View destination

function viewDestination(destination) {

    alert(
        "Showing available trips for " +
        destination
    );
}


// Join trip

function joinTrip(tripName) {

    alert(
        "You selected the " +
        tripName +
        " trip!"
    );
}