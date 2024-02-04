(async function Main(){

    const form = document.getElementById("my_form");
    const name_input = document.getElementById("first_name");
    const result_div = document.getElementById("result");

    form.addEventListener("submit", async function(e){
        e.preventDefault();
        let resp = await api('greet', {name: name_input.value});
        let msg = resp.success ? resp.response : `ERROR: <pre>${resp.message}</pre>`;
        result_div.innerHTML = msg;
    });

    const math_form = document.getElementById("math_form");
    const num1 = document.getElementById("num1");
    const num2 = document.getElementById("num2");
    const math_result = document.getElementById("math_result");

    math_form.addEventListener("submit", async function(e){
        e.preventDefault();
        let action = document.querySelector(`input[name="operator"]:checked`).value;
        let resp = await api(action, {num1: num1.value, num2: num2.value});
        let msg = resp.success ? resp.response : `ERROR: <pre>${resp.message}</pre>`;
        math_result.innerHTML = msg;
    });

    async function api(action, data){
        let params = new FormData();
        try{
            params.append("action", action);
            Object.keys(data).forEach(key=>params.append(key, data[key]));
            let res = await fetch("./api/index.php", {
                method: "POST",
                body: params
            }).then(r=>r.json());
            return res;
        }catch(e){
            alert("Error: Invalid response from the server.");
        }
    }

})();