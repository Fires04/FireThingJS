/* 
 * Copyright 2017 David "Fires" Stein <info@davidstein.cz at http://davidstein.cz>.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

//TODO use com variable
module.exports = function (id, com) {

    this.id = typeof id !== 'undefined' ? id : '';
    this.com = typeof com !== 'undefined' ? com : 20;

    //data variables
    this.windspeed;
    this.winddirection;
    this.rainpersecond;
    this.rainperminute;
    this.rainperhour;
    this.temp1;
    this.humidity;
    this.temp2;
    this.pressure;


    var SerialPort = require('serialport');
    const parsers = SerialPort.parsers;
    var port = new SerialPort('/dev/ttyUSB0', {
        baudRate: 9600
    });
    var parser = new parsers.Readline({
        delimiter: '\n'
    });

    port.pipe(parser);
    port.on('open', () => console.log('Port open'));
    parser.on('data', function (data) {
        //TODO parse data
        let split = data.split(":");
        switch (split[0]){
            case "windspeed":
                this.windspeed = split[1].trim();
                break;
            case "winddirection":
                this.winddirection = split[1].trim();
                break;
            case "rainpersecond":
                this.rainpersecond = split[1].trim();
                break;
            case "rainperminute": 
                this.rainperminute = split[1].trim();
                break;
            case "rainperhour":
                this.rainperhour = split[1].trim();
                break;
            case "temp1":
                this.temp1 = split[1].trim();
                break;
            case "humidity": 
                this.humidity = split[1].trim();
                break;
            case "temp2":
                this.temp2 = split[1].trim();
                break;
            case "pressure":
                this.pressure = split[1].trim();
                break;
        }

    }.bind(this));


    this.cycle = function () {
        //TODO create return string
    };

    this.getStatusObj = function () {
        var statusMessage = {
            'id': this.id,
            'windspeed': this.windspeed,
            'winddirection': this.winddirection,
            'rainpersecond': this.rainpersecond,
            'rainperminute': this.rainperminute,
            'rainperhour': this.rainperhour,
            'temp1': this.temp1,
            'humidity': this.humidity,
            'temp2': this.temp2,
            'pressure': this.pressure
        };
        console.log(statusMessage);
        return statusMessage;
    };

};