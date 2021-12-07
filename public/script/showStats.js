const salesmenTable = document.querySelector("#salesmenTable");
const rows = salesmenTable.getElementsByTagName("tr");
const salesmanIdDiv = () => document.querySelector("#salesmanId").value;



async function statsOnClick(event) {
    console.log(event.target.innerHTML)
    const dataToSend = event.target.innerHTML.substring(4);
    console.log(dataToSend)
    try {
        const response = await fetch("/salesstats", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({ id: dataToSend })
        })
        if (response.ok) {
            console.log("ok")
            const stats = await response.json();
        } else {
            console.log("error")
        }
    } catch (error) {
        console.log(error.message)
    }
}
for (let row of salesmenTable.rows) {
    for (let cell of row.cells) {
        cell.onclick = statsOnClick
    }
}