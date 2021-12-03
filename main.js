import fs from 'fs'
import https from 'https'
import fetch from 'node-fetch'
//'use strict';
/*
const fs = require('fs');
const https = require('https');
const fetch = require('node-fetch')
*/
process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}


const url = "https://jsonmock.hackerrank.com/api/football_matches?competition=UEFA%20Champions%20League"

const consumeAPI = async (year, page) => {

    try{
        return await (await fetch(url+`&year=${year}&page=${page}`)).json()
    }catch(e){

    }
}

const iterateArray = (array, teams) =>{
    array.forEach(match => {
        if(!teams.find(ts => ts == match.team1)){
            teams.push(match.team1)
        }
        if(!teams.find(ts => ts == match.team2)){
            teams.push(match.team2)
        }
    })
}

async function getTeams(year, k) {
    // write your code here
    // API endpoint template: https://jsonmock.hackerrank.com/api/football_matches?competition=UEFA%20Champions%20League&year=<YEAR>&page=<PAGE_NUMBER>
    const teams = []
    try{
        const api = await consumeAPI(year,1)
        for(let i = 1; i <= api.total_pages; i++){
            if(i == 1){
                iterateArray(api.data,teams)
            }else{
                iterateArray(await consumeAPI(year,i).data,teams)
            }
        }
    }catch(e){

    }finally{
        return teams.sort();
    }
}

async function main() {
  //const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const year = 2013;
  const k = 6;

  const teams = await getTeams(year, k);

  for (const team of teams) {
    //ws.write(`${team}\n`);
    console.log(team)
  }

}


main()