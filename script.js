// Wait until the DOM is fully loaded before running the script
document.addEventListener("DOMContentLoaded", function() {
    // Function to calculate passive income
    function calculateIncome() {
        // Get user inputs by ID
        var investmentAmount = document.getElementById("investment").value;
        var incomeStream = document.getElementById("incomeStream").value;
        var involvementLevel = document.getElementById("involvement").value;

        // Check if the investment input is valid
        if (investmentAmount === "" || isNaN(investmentAmount) || investmentAmount <= 0) {
            alert("Please enter a valid investment amount.");
            return;
        }

        var potentialIncome = 0;

        // Basic income logic based on input
        if (incomeStream === "realEstate") {
            potentialIncome = investmentAmount * 0.08; // Assuming 8% ROI for real estate
        } else if (incomeStream === "stocks") {
            potentialIncome = investmentAmount * 0.05; // Assuming 5% ROI for stocks/dividends
        } else if (incomeStream === "digitalProducts") {
            potentialIncome = investmentAmount * 0.1; // Assuming 10% ROI for digital products
        }

        // Adjust income based on involvement level
        if (involvementLevel === "medium") {
            potentialIncome *= 1.2; // Increase income by 20% for medium involvement
        } else if (involvementLevel === "high") {
            potentialIncome *= 1.5; // Increase income by 50% for high involvement
        }

        // Display the result
        var resultText = "Estimated Passive Income: $" + potentialIncome.toFixed(2);
        document.getElementById("result").innerHTML = resultText;
    }

    // Attach the calculateIncome function to the button's click event
    document.querySelector("button").addEventListener("click", calculateIncome);
});
