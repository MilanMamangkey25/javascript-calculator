var operators = ["+", "-", "/", "*"];

var box = null;
var last_operation_history = null;
var operator = null;
var equal = null;
var dot = null;

var firstNum = true;

var numbers = [];
var operator_value;
var last_button;
var calc_operator;

var total;

var key_combination = []
function button_number(button) {

    operator = document.getElementsByClassName("operator");
    box = document.getElementById("box");
    last_operation_history = document.getElementById("last_operation_history");
    equal = document.getElementById("equal_sign").value;
    dot = document.getElementById("dot").value;
    
    last_button = button;

    // jika tombol tidak adalah operator atau tanda =
    if (!operators.includes(button) && button!=equal){
        // jika ini adalah tombol pertama yang diklik
        if (firstNum){
            // dan itu adalah titik, tampilkan 0.
            if (button == dot){
                box.innerText = "0"+dot;
            }
            // else clear box dan tampilkan angka
            else {
                box.innerText = button;
            }
            firstNum = false;
        }
        else {

            // kembali jika nilai box adalah 0
            if (box.innerText.length == 1 && box.innerText == 0){

                if (button == dot){
                    box.innerText += button;
                }
                return;
            }
            // kembali jika box sudah memiliki titik dan tombol yang diklik adalah titik
            if (box.innerText.includes(dot) && button == dot){
                return;
            }
            // maksimum 20 angka yang diizinkan untuk input
            if (box.innerText.length == 20){
                return;
            }

            // jika ditekan titik dan box sudah memiliki tanda -, tampilkan -0.
            if (button == dot && box.innerText == "-"){
                box.innerText = "-0"+dot;
            }
            // else tambahkan angka
            else {
                box.innerText += button;
            }  
        }
    }
    // jika itu adalah operator atau tanda =
    else {

        // kembali jika operator sudah ditekan
        if (operator_value != null && button == operator_value){
            return
        }

        // tampilkan tanda minus jika itu adalah nilai pertama yang dipilih dan kembali
        if (button == "-" && box.innerText == 0){
            box.innerText = button;
            firstNum = false;
            operator_value = button
            showSelectedOperator()
            return;
        }
        // kembali jika operator minus ditekan dan sudah dicetak di layar 
        else if (operators.includes(button) && box.innerText == "-"){
            return
        }
        // kembali jika operator minus ditekan dan history sudah memiliki tanda =
        else if (button == "-" && operator_value == "-" && last_operation_history.innerText.includes("=")){
            return
        }

        // set nilai operator jika itu adalah salah satu
        if (operators.includes(button)){
            if (typeof last_operator != "undefined" && last_operator != null){
                calc_operator = last_operator
            }
            else {
                calc_operator = button
            }
            if (button == "*"){
                last_operator = "×"
            }
            else if (button == "/"){
                last_operator = "÷"
            }
            else {
                last_operator = button
            }
            operator_value = button
            firstNum = true
            showSelectedOperator()
        }

        // tambahkan angka pertama ke array numbers dan tampilkan di history
        if (numbers.length == 0){
            numbers.push(box.innerText)
            if (typeof last_operator != "undefined" && last_operator != null){
                last_operation_history.innerText = box.innerText + " " + last_operator
            }
        }
        // sisa perhitungan
        else {   
            if (numbers.length == 1){
                numbers[1] = box.innerText
            }
            var temp_num = box.innerText

            // hitung total
            if (button==equal && calc_operator != null){
                var total = calculate(numbers[0], numbers[1], calc_operator)
                box.innerText = total;

                // tambahkan angka kedua ke history
                if (!last_operation_history.innerText.includes("=")){
                    last_operation_history.innerText += " " + numbers[1] + " ="
                }

                temp_num = numbers[0]

                numbers[0] = total
                operator_value = null
                showSelectedOperator()

                // ganti angka pertama di history dengan nilai total
                var history_arr = last_operation_history.innerText.split(" ")
                history_arr[0] = temp_num
                last_operation_history.innerText = history_arr.join(" ")
            }
            // update history dengan nilai pada layar dan operator yang ditekan
            else if (calc_operator != null) {
                 last_operation_history.innerText = temp_num + " " + last_operator
                 calc_operator = button
                 numbers = []
                 numbers.push(box.innerText)
            }
        }
    }

}
 // sorot tombol operator ketika dipilih
function showSelectedOperator(){

    var elements = document.getElementsByClassName("operator");

    for (var i=0; i<elements.length; i++){
        elements[i].style.backgroundColor  = "#e68a00";
    }

    if (operator_value == "+"){
        document.getElementById("plusOp").style.backgroundColor  = "#ffd11a";
    }
    else if (operator_value == "-"){
        document.getElementById("subOp").style.backgroundColor  = "#ffd11a";
    }
    else if (operator_value == "*"){
        document.getElementById("multiOp").style.backgroundColor  = "#ffd11a";
    }
    else if (operator_value == "/"){
        document.getElementById("divOp").style.backgroundColor  = "#ffd11a";
    }
}

// fungsi untuk menghitung hasil menggunakan dua nomor dan operator
function calculate(num1, num2, operator){

    if (operator === "+"){
        total = (parseFloat)(num1)+(parseFloat)(num2)
    }
    else if (operator === "-"){
        total = (parseFloat)(num1)-(parseFloat)(num2)
    }
    else if (operator === "*"){
        total = (parseFloat)(num1)*(parseFloat)(num2)
    }
    else if (operator === "/"){
        total = (parseFloat)(num1)/(parseFloat)(num2)
    }
    else {
        if (total == box.innerText){
            return total
        }
        else {
            return box.innerText
        }
    }
    // jika total tidak bulat, tampilkan maksimal 12 tempat desimal
    if (!Number.isInteger(total)){
        total = total.toPrecision(12);
    }
    return parseFloat(total);
}

// fungsi untuk menghapus box dan mengatur ulang semuanya
function button_clear(){
    window.location.reload()
}

function backspace_remove(){

    box = document.getElementById("box");
    var elements = document.getElementsByClassName("operator");

    for (var i=0; i<elements.length; i++){
        elements[i].style.backgroundColor  = "#e68a00";
    }

    var last_num = box.innerText;
    last_num = last_num.slice(0, -1)
    
    box.innerText = last_num

    // tampilkan 0 jika semua karakter di layar dihapus
    if (box.innerText.length == 0){
        box.innerText = 0
        firstNum = true
    }

}


// fungsi untuk mengubah tanda dari nomor yang saat ini di layar
function plus_minus(){
    box = document.getElementById("box");

    // jika operator apa pun telah ditekan
    if (typeof last_operator != "undefined"){
        if (numbers.length>0){
            // jika tombol terakhir ditekan adalah operator
            if (operators.includes(last_button)){
                // jika teks yang ditampilkan hanya tanda negatif, gantikan dengan 0
                if (box.innerText == "-"){
                    box.innerText = 0
                    firstNum = true
                    return
                }
                // jika teks yang ditampilkan tidak hanya tanda negatif, gantikan dengan tanda negatif
                else {
                    box.innerText = "-"
                    firstNum = false
                }
            }
            // jika tombol terakhir ditekan bukan operator, ubah tandanya
            else {
                box.innerText = -box.innerText

                if (numbers.length==1){
                    numbers[0] = box.innerText
                }
                else {
                    numbers[1] = box.innerText
                }
            }
        }
        return
    }

    // jika teks yang ditampilkan adalah 0, gantikan dengan tanda negatif
    if (box.innerText == 0){
        box.innerText = "-"
        firstNum = false
        return
    }
    box.innerText = -box.innerText
}

// fungsi untuk menghitung akar kuadrat dari nomor yang saat ini di layar
function square_root(){
    box = document.getElementById("box");
    var square_num = Math.sqrt(box.innerText)
    box.innerText = square_num
    numbers.push(square_num)
}

// fungsi untuk menghitung pembagian 1 dengan nomor yang saat ini di layar
function division_one(){
    box = document.getElementById("box");
    var square_num = 1/box.innerText
    box.innerText = square_num
    numbers.push(square_num)
}

// fungsi untuk menghitung pangkat dari nomor yang saat ini di layar
function power_of(){
    box = document.getElementById("box");
    var square_num =Math.pow(box.innerText, 2)
    box.innerText = square_num
    numbers.push(square_num)
}

// fungsi untuk menghitung persentase dari sebuah nomor
function calculate_percentage(){
    var elements = document.getElementsByClassName("operator");
    box = document.getElementById("box");

    if (numbers.length > 0 && typeof last_operator != "undefined"){

        var perc_value = ((box.innerText / 100) * numbers[0])
        if (!Number.isInteger(perc_value)) {
            perc_value = perc_value.toFixed(2);
        }
        box.innerText = perc_value
        numbers.push(box.innerText)
    
        // tambahkan nomor kedua ke riwayat
        if (!last_operation_history.innerText.includes("=")){
            last_operation_history.innerText += " " + numbers[1] + " ="
        }
    }
    else {
        box.innerText = box.innerText/100
    }

    numbers.push(box.innerText)
    var res = calculate(numbers[0], numbers[1], last_operator)
    box.innerText = res
    operator_value = "="

    // deselect operator jika ada yang dipilih
    for (var i=0; i<elements.length; i++){
        elements[i].style.backgroundColor  = "#e68a00";
    }
}

// fungsi untuk menghapus nomor terakhir yang diketik ke layar
function clear_entry(){
    box = document.getElementById("box");

    if (numbers.length > 0 && typeof last_operator != "undefined"){
        box.innerText = 0
        var temp = numbers[0]
        numbers = []
        numbers.push(temp)
        firstNum = true;
    }
}

document.addEventListener('keydown', keyPressed);
document.addEventListener('keyup', keyReleased);

// fungsi untuk menangkap event keydown
function keyPressed(e) {
    e.preventDefault()
    var equal = document.getElementById("equal_sign").value;
    var dot = document.getElementById("dot").value;

    if (e.key == "Delete"){
        button_clear();
        return;
    }

    var isNumber = isFinite(e.key);
    var enterPress;
    var dotPress;
    var commaPress = false;

    if (e.key == "Enter"){
        enterPress = equal;
    }
    if (e.key == "."){
        dotPress = dot;
    }
    if (e.key == ","){
        commaPress = true;
    }
    
    if (isNumber || operators.includes(e.key) || e.key == "Enter" || e.key == dotPress || 
        commaPress || e.key == "Backspace"){
        if (e.key == "Enter"){
            button_number(enterPress)
        }
        else if (e.key == "Backspace"){
            document.getElementById("backspace_btn").style.backgroundColor  = "#999999";
            backspace_remove()
        }
        else if (commaPress){
            button_number(dot)
        }
        else {
            button_number(e.key) 
        }   
    }
    if (e.key) {
        key_combination[e.code] = e.key;
    }
}

// fungsi untuk menangkap event keyup
function keyReleased(e){
    if (key_combination['ControlLeft'] && key_combination['KeyV']) {
        navigator.clipboard.readText().then(text => {
            box = document.getElementById("box");
            var isNumber = isFinite(text);
            if (isNumber){
                var copy_number = text
                firstNum = true
                button_number(copy_number)
            }
        }).catch(err => {
            console.error('Gagal membaca isi clipboard: ', err);
        });
    }
    if (key_combination['ControlLeft'] && key_combination['KeyC']) {
        box = document.getElementById("box");
        navigator.clipboard.writeText( box.innerText)
    }
    key_combination = []
    e.preventDefault()
    // set warna tombol backspace kembali ke warna aslinya
    if (e.key == "Backspace"){
        document.getElementById("backspace_btn").style.backgroundColor  = "#666666";
    }
}