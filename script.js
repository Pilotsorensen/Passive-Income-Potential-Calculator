function calculateIncome() {
    // Get values from the input fields
    const investment = parseFloat(document.getElementById("investment").value);
    const incomeStream = document.getElementById("incomeStream").value;
    const involvement = document.getElementById("involvement").value;

    // Set the ROI based on the income stream selected
    let roi = 0;
    if (incomeStream === "rentalProperties") {
        roi = 0.05; // 5% ROI for rental properties
    } else if (incomeStream === "stockMarket") {
        roi = 0.07; // 7% ROI for stock market
    } else if (incomeStream === "onlineBusinesses") {
        roi = 0.10; // 10% ROI for online businesses
    }

    // Adjust the ROI based on the level of involvement
    if (involvement === "moderate") {
        roi *= 1.2; // Increase ROI by 20% for moderate involvement
    } else if (involvement === "active") {
        roi *= 1.5; // Increase ROI by 50% for active involvement
    }

    // Calculate the projected income for the next 20 years
    const years = 20;
    const projectedValues = [];
    let currentValue = investment;
    
    for (let year = 1; year <= years; year++) {
        currentValue += currentValue * roi;
        projectedValues.push(currentValue);
    }

    // Format the result
    const formattedResult = formatNumber(currentValue.toFixed(2));
    document.getElementById("result").style.display = "block";
    document.getElementById("result").innerHTML = `Your investment will grow to: $${formattedResult}`;

    // Display the chart
    updateChart(projectedValues);
}

function formatNumber(number) {
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, " "); // Adds space between numbers like 1 000 000
}

// Update the chart with new data
function updateChart(projectedValues) {
    const ctx = document.getElementById('incomeChart').getContext('2d');
    
    // Destroy previous chart if it exists
    if (window.incomeChart) {
        window.incomeChart.destroy();
    }

    // Create a new chart
    window.incomeChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: 20 }, (_, i) => `Year ${i + 1}`),
            datasets: [{
                label: 'Investment Growth',
                data: projectedValues,
                borderColor: '#4CAF50', // Green color for the line
                fill: false,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false // Hide the legend
                }
            },
            scales: {
                y: {
                    beginAtZero: false, // Start from 0
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString(); // Format the y-axis labels with commas
                        }
                    }
                }
            }
        });
}
