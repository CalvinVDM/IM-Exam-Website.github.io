function fetchData()
{

    fetch("https://api.metalpriceapi.com/v1/latest?api_key=e3fb6b495acd372d4c89e8a2de5782db&base=USD&currencies").then(response=>{

        

    if (!response.ok){
        console.log(JSON.stringify(response));
            throw Error('Error');

    }
       return response.json()

    }).then(data =>{
        console.log(JSON.stringify(data.rates));
        const JsonString =(data.rates) 
        const JsonDisplay = document.querySelector('#app');
        //JsonDisplay.innerHTML = JSON.stringify(JsonString);
        
        let txt = [100];
        const i = 0;
        for(let x in JsonString){
            txt[i] = JsonString[x];
            i++;
        }
       
        JsonDisplay.innerHTML = i;
       
    }).catch(error=>{
    });

    
}

fetchData();



