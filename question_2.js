const fs = require('fs');
const csv=require('csvtojson')
const async = require('async');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;  


function readFile(value){
    return new Promise(async function(resolve, reject) {
      if(value == undefined) value = {};
        
        const csvFilePath='./data0.csv';
        const csvFilePath_1='./data1.csv';
        const jsonArray=await csv().fromFile(csvFilePath);
        const jsonArray_2=await csv().fromFile(csvFilePath_1);
        let array = jsonArray;
        for(let i=0;i<jsonArray_2.length;i++){
            array.push(jsonArray_2[i]);
        }
        var date_sort_asc = function (string1, string2) {
            let context = string1['time_exchange;time_coinapi;guid;price;base_amount;taker_side']
            let context_2 = string2['time_exchange;time_coinapi;guid;price;base_amount;taker_side']
            let date1 = context.slice(0,28);
            let date2= context.slice(0,28);
            if (date1 > date2) return 1;
            if (date1 < date2) return -1;
            return 0;
          };

          array.sort(date_sort_asc);
          let result = [];
          array.forEach(file=>{
              let sub = file['time_exchange;time_coinapi;guid;price;base_amount;taker_side'].split(';');
              let obj = {
                  "time_exchange":sub[0],
                  "time_coinapi":sub[1],
                  "guid":sub[2],
                  "price":sub[3],
                  "base_amount":sub[4],
                  "taker_side":sub[5]
              }
              result.push(obj);
          })
        const csvWriter = createCsvWriter({  
            path: './result.csv',
            header: [
                {id: 'time_exchange', title: 'time_exchange'},
                {id: 'time_coinapi', title: 'time_coinapi'},
                {id: 'guid', title: 'guid'},
                {id: 'price', title: 'price'},
                {id: 'base_amount', title: 'base_amount'},
                {id: 'taker_side', title: 'taker_side'},

            ]
            });

        csvWriter  
        .writeRecords(result)
        .then(()=> console.log('The CSV file was written successfully'));

        })
}

readFile();


  