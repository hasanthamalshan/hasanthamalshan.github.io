let home_para = document.getElementById("home-paragraph");
let submit_btn = document.getElementById("submit-btn");
let submit_btn_check = document.getElementById("submit-btn-check");
let submit_btn_spinner = document.getElementById("submit-btn-spinner");
let home_checking_block = document.getElementById("home-checking-block");
let home_results_block = document.getElementById("home-results-block");

window.onload = function() { 
    // submit_btn_spinner.style.display = "none"
}

function generateRandomValue() {
    return Math.random();
} 

function roundToTwoDecimalPlaces(number) {
    return Number(number.toFixed(2));
}

function processInputlink(link){

    try{
        let splitted_url = link.split("/");
        let title_url = splitted_url[5].split("?", 1);
        let title_url_splitted = title_url[0].split("-");
    
        let job_id = title_url_splitted.slice(-1)[0];
    
        return job_id;
    }catch(e){
        return e;
    }
}

let onClickCheck = () =>{

    submit_btn.disabled = true;
    submit_btn_check.style.display = "none";
    home_para.style.display = "none";
    submit_btn_spinner.style.display = "block";
    home_checking_block.style.display = "block";

    let link = document.getElementById("search").value;

    let jobId = processInputlink(link);

    let isValidJobId = /^\d+$/.test(jobId);

    if(isValidJobId){
        fetch('http://127.0.0.1:8000/check/' + jobId)
        .then(response => response.json())
        .then(data => {
            // console.log(JSON.stringify(data));

            const randomValue = generateRandomValue();
            let percentage = Math.round(roundToTwoDecimalPlaces(randomValue) * 100);

            if( percentage <= 25 ){
                home_results_block.style.color = "#a22b0a";
            }else if( percentage <= 50 ){
                home_results_block.style.color = "#c06607";
            }else if( percentage <= 75 ){
                home_results_block.style.color = "#f6ce08";
            }else{
                home_results_block.style.color = "#0aa263";
            }

            home_results_block.textContent = percentage + "%"

            home_para.textContent = data.description
            home_para.style.display = "block";

            document.getElementById("search").value = ""
            submit_btn.disabled = false;
            submit_btn_check.style.display = "block"
            home_results_block.style.display = "block";
            submit_btn_spinner.style.display = "none"
            home_checking_block.style.display = "none";
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            submit_btn.disabled = false;
            submit_btn_check.style.display = "block";
            home_para.style.display = "block";
            submit_btn_spinner.style.display = "none";
            home_checking_block.style.display = "none";
            home_results_block.style.display = "none";
        });

    }else{
        console.error('Looks like an invalid job url...');
        submit_btn.disabled = false;
        submit_btn_check.style.display = "block";
        home_para.style.display = "block";
        submit_btn_spinner.style.display = "none";
        home_checking_block.style.display = "none";
        home_results_block.style.display = "none";
    }  
}