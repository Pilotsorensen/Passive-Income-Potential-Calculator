// Function to calculate compound growth
function calculateIncome() {
    var investmentAmount = document.getElementById("investment").value;
    var incomeStream = document.getElementById("incomeStream").value;
    var involvementLevel = document.getElementById("involvement").value;

    if (investmentAmount === "" || isNaN(investmentAmount) || investmentAmount <= 0) {
        alert("Please enter a valid investment amount.");
        return;
    }

    // Define ROI based on income stream
    var annualROI = 0;
    if (incomeStream === "rentalProperties") {
        annualROI = 0.05;  // 5% ROI for rental properties
    } else if (incomeStream === "stockMarket") {
        annualROI = 0.07;  // 7% ROI for stock market investments
    } else if (incomeStream === "onlineBusinesses") {
        annualROI = 0.10;  // 10% ROI for online businesses
    }

    // Adjust ROI based on involvement level
    if (involvementLevel === "moderate") {
        annualROI *= 1.15;  // 15% more return for moderate involvement
    } else if (involvementLevel === "active") {
        annualROI *= 1.3;  // 30% more return for active involvement
    }

    var months = 120;  // 10 years = 120 months
    var growthData = [];
    var currentAmount = parseFloat(investmentAmount);

    // Calculate monthly compounding over 120 months (10 years)
    for (var i = 1; i <= months; i++) {
        currentAmount *= (1 + annualROI / 12);  // Compounding monthly
        growthData.push({ month: i, value: currentAmount.toFixed(2) });
    }

    // Display the result as an estimate
    var resultText = `Estimated passive income after 10 years: $${currentAmount.toFixed(2)}`;
    document.getElementById("result").innerHTML = resultText;

    // Create the graph
    createGraph(growthData);
}

// Function to create a graph using Chart.js
function createGraph(growthData) {
    var ctx = document.getElementById('incomeChart').getContext('2d');
    var labels = growthData.map(function(data) { return "Month " + data.month; });
    var data = growthData.map(function(data) { return data.value; });

    var chart = new Chart(ctx, {
        type: 'line', // Line graph
        data: {
            labels: labels,
            datasets: [{
                label: 'Investment Growth',
                data: data,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false,
                tension: 0.2 // Smooth lines
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                            size: 14,
                            family: 'Arial'
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        maxRotation: 45,
                        minRotation: 45
                    },
                    title: {
                        display: true,
                        text: 'Months'
                    }
                },
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Investment Value ($)'
                    }
                }
            }
        }
    });
}
