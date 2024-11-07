// Function to format numbers with spaces between thousands
function formatNumber(num) {
    return num.toLocaleString('en', { useGrouping: true });
}

// Function to calculate passive income and generate graph
function calculateIncome() {
    // Get the user input values
    const investment = parseFloat(document.getElementById('investment').value);
    const incomeStream = document.getElementById('incomeStream').value;
    const involvement = document.getElementById('involvement').value;

    if (isNaN(investment) || investment <= 0) {
        document.getElementById('result').innerHTML = "Please enter a valid initial investment.";
        return;
    }

    // Define the ROI based on the selected income stream
    let roi = 0;
    if (incomeStream === "rentalProperties") {
        roi = 0.05;  // 5% ROI for rental properties
    } else if (incomeStream === "stockMarket") {
        roi = 0.07;  // 7% ROI for stock market investments
    } else if (incomeStream === "onlineBusinesses") {
        roi = 0.10;  // 10% ROI for online businesses
    }

    // Define the involvement factor (affects growth rate)
    let involvementFactor = 1;
    if (involvement === "handsOff") {
        involvementFactor = 1;  // Low involvement, no change to ROI
    } else if (involvement === "moderate") {
        involvementFactor = 1.2;  // Moderate involvement, boost ROI slightly
    } else if (involvement === "active") {
        involvementFactor = 1.5;  // Active involvement, boost ROI significantly
    }

    // Calculate the adjusted ROI
    const adjustedRoi = roi * involvementFactor;

    // Prepare the data for the graph (20 years)
    let yearlyProjections = [];
    let currentAmount = investment;
    for (let year = 1; year <= 20; year++) {
        currentAmount += currentAmount * adjustedRoi;
        yearlyProjections.push(currentAmount);
    }

    // Display result as the total after 20 years with formatted number
    document.getElementById('result').innerHTML = `After 20 years, your investment will grow to $${formatNumber(currentAmount.toFixed(2))}.`;

    // Generate the graph using Chart.js
    const ctx = document.getElementById('incomeChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: 20 }, (_, i) => i + 1),  // 20 years (labels 1 to 20)
            datasets: [{
                label: 'Projected Income',
                data: yearlyProjections,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Years'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Income ($)'
                    },
                    ticks: {
                        callback: function(value) {
                            return formatNumber(value); // Format y-axis values with spaces
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return `$${formatNumber(tooltipItem.raw.toFixed(2))}`;  // Format tooltip values
                        }
                    }
                }
            },
            animation: {
                duration: 1000,
            }
        }
    });
}

// Event listeners to update the result and graph dynamically when input changes
document.getElementById('investment').addEventListener('input', calculateIncome);
document.getElementById('incomeStream').addEventListener('change', calculateIncome);
document.getElementById('involvement').addEventListener('change', calculateIncome);
