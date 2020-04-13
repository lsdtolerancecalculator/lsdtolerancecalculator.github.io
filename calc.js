function calculate() {
    var x = document.getElementById("lastdose").value;
    var y = document.getElementById("desiredose").value;
    var n = document.getElementById("daysince").value;

    if (n > 12) {
        alert('"Days Since" must be lower than 12.');
        return false;
    } else if (n < 0) {
        alert('"Days Since" must be greater than 0.');
        return false;
    } else {
        var dose = ((280.059565 * (Math.pow(n, -0.412565956))) * (x / 100) - x);
        var dose1 = parseFloat(y) + parseFloat(dose);
        var dose2 = parseFloat(y) - parseFloat(dose);
        if (dose2 < 0) {
            document.getElementById("amt2").innerHTML = "If you take a " + y + "μg dose, it will have very little to no effectiveness at all.";
        } else {
            document.getElementById("amt2").innerHTML = "If you take a " + y + "μg dose, it will have the effectiveness of a " + dose2 + "μg dose.";
        }
        document.getElementById("amt").innerHTML = "To feel the same as your desired dose, you would need to take " + dose1 + "μg.";
    }
}