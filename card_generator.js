async function generateCard() {
    document.getElementById("cardContainer").style.display = "block";

    // Get all input values
    let playerName = document.getElementById("name").value;
    let playerspeciality = document.getElementById("specialty").value;
    let playerRatings = document.getElementById("emoji").value;
    let playerimg = document.getElementById("image").value;
    let teamimage = document.getElementById("team").value;
    let fantasypoints = document.getElementById("points").value;
    let matchesplayed = document.getElementById("match").value;
    let totalruns = document.getElementById("runs").value;
    let highscore = document.getElementById("score").value;
    let wicketstaken = document.getElementById("wickets").value;
    let battingavg = document.getElementById("avg").value;
    let bowlingavg = document.getElementById("average").value;
    let countryName = document.getElementById("country").value.trim();

    // Update player card fields
    document.getElementById("playerName").innerText = playerName;
    document.getElementById("playerspeciality").innerText = playerspeciality;
    document.getElementById("playerimage").src = playerimg;
    document.getElementById("teamimage").src = teamimage;
    document.getElementById("fantasypoints").innerText = fantasypoints;
    document.getElementById("matchesplayed").innerText = `${matchesplayed} Matches`;
    document.getElementById("wicketstaken").innerText = `${wicketstaken} Wickets`;
    document.getElementById("totalruns").innerText = `RUNS ${totalruns}`;
    document.getElementById("highscore").innerText = `HI SCORE ${highscore}`;
    document.getElementById("battingavg").innerText = battingavg;
    document.getElementById("bowlingavg").innerText = bowlingavg;
    // Generate stars based on user input
    let stars = "";
    for (let i = 0; i < playerRatings; i++) {
        stars += "⭐";
    }
    document.querySelector(".block5 h4").innerText = stars;

    //fetch player image
   async function removeBackground(imageUrl) {
        const apiKey = "EKMq8JZtfqu9GpECnhSyEpoe"; // replace with your key
        const formData = new FormData();
        formData.append("image_url", imageUrl);
        formData.append("size", "auto");

        const response = await fetch("https://api.remove.bg/v1.0/removebg", {
            method: "POST",
            headers: {
                "X-Api-Key": apiKey
            },
            body: formData
        });

        if (!response.ok) throw new Error("Failed to remove background");
        const blob = await response.blob();
        return URL.createObjectURL(blob);
    }

    try {
        const cleanPlayerImage = await removeBackground(playerimg);
        document.getElementById("playerimage").src = cleanPlayerImage;
    } catch (err) {
        alert("Failed to remove background from player image. Showing original image.");
        console.error(err);
        document.getElementById("playerimage").src = playerimg;
    }

    // Fetch country flag
    if (countryName) {
        try {
            const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
            if (!response.ok) throw new Error("Country not found");

            const data = await response.json();
            const country = data[0];

            document.getElementById("countryimage").src = country.flags.svg;
        } catch (err) {
            alert("Country not found. Please check spelling.");
            console.error(err);
        }
    }
}
