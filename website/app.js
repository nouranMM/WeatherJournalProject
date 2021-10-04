
/* Global Variables */
let zip=document.querySelector('#zip');
let feelID=document.querySelector('#feelings');
let btngenerate=document.querySelector("#generate")

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
  console.log(newDate); 
  
// Personal API Key for OpenWeatherMap API

const apiURL='https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey='&appid=88d2f0143175e3228f3f06c6e8e73db5';

// Event listener to add function to existing HTML DOM element
btngenerate.addEventListener('click',clickEvent);


/* Function called by event listener */
function clickEvent()
{
     zipValue = zip.value;
     content= feelID.value;
     getTemp(apiURL,zipValue,apiKey)

     .then(function (data){
        postData('/addData', { Date:newDate , Temperature:data.main.temp , Content:content});

        getProjectData();
     })

}

/* Function to GET Web API Data*/
const getTemp = async (apiURL,zipValue,apiKey)=>
{
    const resTemp = await fetch(apiURL+zipValue+apiKey)
    try
    {
        const data = await resTemp.json();
        console.log(data);
        return data;

    }
    catch(error){
        console.log("Can't bring data",error);

    }


}

/* Function to POST data */
const postData = async (url, data = {})=>{
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/JSON'
    },
    body: JSON.stringify(data)       
  });

    try {
      const newData = await response.json();
      return newData;
    }catch(error) {
        console.log('Can not bring the new data',error);
    }
};



/* Function to GET Project Data */
let dateInfo=document.querySelector('#date');
let tempInfo=document.querySelector('#temp');
let contentInfo=document.querySelector('#content');

console.log(dateInfo);

const getProjectData = async() => {
    const request = await fetch('/all');
    try{
        const entryData =await request.json();
        console.log(entryData);
        dateInfo.innerHTML+= entryData.Date;
        tempInfo.innerHTML+=entryData.Temperature;
        contentInfo.innerHTML+=entryData.Content;

    }
    catch(error){
        console.log("Can not print the final Information",error);
    }
};
