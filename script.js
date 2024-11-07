// Function to format numbers with spaces (e.g., 1 000 000)
function formatNumber(num) {
    return num.toLocaleString('en-US');
}

// Function to calculate passive income
function calculateIncome() {
    const investmentAmount = parseFloat(document.getElementById('investment').value);
    const incomeStream = document.getElementById('incomeStream').value;
    const involvementLevel = document.getElementById('involvement').value;

    if (isNaN(investmentAmount) || investmentAmount <= 0) {
        alert("Please enter a valid investment amount.");
        return;
    }

    // Determine ROI based on income stream selected
    let roi = 0;
    if (incomeStream === 'rentalProperties') {
        roi = 0.05; // 5% ROI
    } else if (incomeStream === 'stockMarket') {
        roi = 0.07; // 7% ROI
    } else if (incomeStream === 'onlineBusinesses') {
        roi = 0.1;  // 10% ROI
    }

    // Adjust ROI based on level of involvement
    if (involvementLevel === 'moderate') {
        roi += 0.02;  // +2% for moderate involvement
    } else if (involvementLevel === 'active') {
        roi += 0.05;  // +5% for active involvement
    }

    // Calculate projected income for the next 20 years
    let years = 20;
    let projectedValues = [];
    let currentValue = investmentAmount;

    for (let i = 1; i <= years; i++) {
        currentValue += currentValue * roi; // Compound growth
        projectedValues.push(currentValue);
    }

    // Update result text with formatted numbers
    document.getElementById('result').innerHTML = `Your investment will grow to $${formatNumber(currentValue.toFixed(2))} in 20 years.`;
    document.getElementById('result').style.display = "block"; // Show the result

    // Update the chart
    const ctx = document.getElementById('incomeChart').getContext('2d');
    const incomeChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: 20 }, (_, i) => `Year ${i + 1}`), // Labels for years
            datasets: [{
                label: 'Projected Growth',
                data: projectedValues.map(value => value.toFixed(2)),
                borderColor: '#4CAF50',
                fill: false,
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    ticks: {
                        callback: function(value) {
                            return formatNumber(value); // Format y-axis labels with spaces
                        }
                    }
                }
            }
        });
}
