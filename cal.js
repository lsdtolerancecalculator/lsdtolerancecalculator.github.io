function create(){
    const div = document.querySelector('#testing');
    div.innerHTML='';
    const col = document.createElement('div');
    col.classList.add('col');  
    const card = document.createElement('div');
    card.classList.add('card','bg-light','mb3');
    const cardbod = document.createElement('div');
    cardbod.classList.add('card-body');
    cardbod.innerHTML = '<h5 class="card-title">Same Dose</h5> <br/> <p class="card-text" id="amt2"></p>';
    div.appendChild(col);
    col.appendChild(card);
    card.appendChild(cardbod);
    const div2 = document.querySelector('#testing2');
    div2.innerHTML='';
    const col2 = document.createElement('div');
    col2.classList.add('col');  
    const card2 = document.createElement('div');
    card2.classList.add('card','bg-light','mb3');
    const cardbod2 = document.createElement('div');
    cardbod2.classList.add('card-body');
    cardbod2.innerHTML = '<h5 class="card-title">Desired Dose</h5> <br/> <p class="card-text" id="amt"></p>';
    div2.appendChild(col2);
    col2.appendChild(card2);
    card2.appendChild(cardbod2);
}
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
            document.getElementById("amt2").innerHTML = "If you take a <strong>" + y + "μg</strong> dose, it will have very little to no effectiveness at all.";
        } else {
            document.getElementById("amt2").innerHTML = "If you take a <strong>" + y + "μg</strong> dose, it will have the effectiveness of a <strong>" + dose2 + "μg</strong> dose.";
        }
        document.getElementById("amt").innerHTML = "To feel the same as your desired dose, you would need to take <strong>" + dose1 + "μg.</strong>";
    }
}
function createcalc() {
    create();
    calculate();
}



