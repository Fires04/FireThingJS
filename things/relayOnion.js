/* 
 * Copyright 2018 David "Fires" Stein <info@davidstein.cz at http://davidstein.cz>.
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

module.exports = function (id, pin) {

    this.id = typeof id  !== 'undefined' ?  id  : '';
    this.pin = typeof pin  !== 'undefined' ?  pin  : '6';
    var gpio = require('/usr/bin/onoff-node/onoff.js').Gpio;
    this.gpioRelay = new gpio(this.pin, 'out');  //RELAY


    this.cycle = function () {

    };

    this.getStatusObj = function () {
        var statusMessage = {
            'id': this.id,
            'relayStatus': this.getGPIOStatus(this.gpioRelay)
        };
        return statusMessage;
    };

    this.getGPIOStatus = function (GPIO) {
        if (GPIO.readSync() === 0) {
            return false;
        } else {
            return true;
        }
    };

    this.relayOn = function(){
        gpioRelay.writeSync(0);
    };
    
    this.relayOff = function(){
        gpioRelay.writeSync(1);
    };

};

