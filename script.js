async function convertCurrency() {
    let amount = document.getElementById("amount").value;
    let from = document.getElementById("fromCurrency").value;
    let to = document.getElementById("toCurrency").value;

    if (amount === "" || amount <= 0) {
        document.getElementById("result").innerText = "Please enter a valid amount.";
        return;
    }

    try {
        let response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
        if (!response.ok) throw new Error("Failed to fetch data");

        let data = await response.json();
        let rate = data.rates[to];
        let converted = amount * rate;

        document.getElementById("result").innerText = `Converted Amount: ${converted.toFixed(2)} ${to}`;
    } catch (error) {
        document.getElementById("result").innerText = "Error fetching rates.";
        console.error(error);
    }
}

// Run conversion automatically on input/change
document.getElementById("amount").addEventListener("input", convertCurrency);
document.getElementById("fromCurrency").addEventListener("change", convertCurrency);
document.getElementById("toCurrency").addEventListener("change", convertCurrency);
