// Function to format numbers with spaces
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// Chart and calculateIncome function
let incomeChart;

function calculateIncome() {
    // Get user inputs
    const investment = parseFloat(document.getElementById("investment").value);
    const incomeStream = document.getElementById("incomeStream").value;
    const involvement = document.getElementById("involvement").value;
    const timeframe = parseInt(document.getElementById("timeframe").value);

    // Set ROI based on income stream
    let roi;
    switch (incomeStream) {
        case "rentalProperties": roi = 0.05; break;
        case "stockMarket": roi = 0.07; break;
        case "onlineBusinesses": roi = 0.10; break;
    }

    // Adjust ROI based on involvement level
    switch (involvement) {
        case "handsOff": roi *= 0.9; break;
        case "moderate": roi *= 1.0; break;
        case "active": roi *= 1.1; break;
    }

    // Calculate the compound growth for each year
    let projectedValues = [];
    let currentAmount = investment;
    for (let year = 1; year <= timeframe; year++) {
        currentAmount *= (1 + roi);
        projectedValues.push(parseFloat(currentAmount.toFixed(2)));
    }

    // Update the result
    document.getElementById("result").textContent = `Your investment will grow to $${formatNumber(currentAmount.toFixed(2))} over ${timeframe} years.`;

    // Update or create chart
    if (incomeChart) {
        incomeChart.destroy();
    }

    // Set labels to "Year" or "Month" based on the timeframe
    const labels = Array.from({ length: timeframe }, (_, i) => (timeframe > 5 ? `Year ${i + 1}` : `Month ${i + 1}`));

    const ctx = document.getElementById("incomeChart").getContext("2d");
    incomeChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: "Projected Income Growth",
