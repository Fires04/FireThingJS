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

module.exports = function (id, pin, startTime, endTime) {

    this.id = typeof id !== 'undefined' ? id : '';
    this.pin = typeof pin !== 'undefined' ? pin : '0';
    this.startTime = typeof startTime !== 'undefined' ? startTime : new Date(1970, 1, 1, 5, 0);
    this.endTime = typeof endTime !== 'undefined' ? endTime : new Date(1970, 1, 1, 22, 0);
    var gpio = require('/usr/bin/onoff-node/onoff.js').Gpio;
    this.gpioRelay = new gpio(this.pin, 'out');  //RELAY


    this.cycle = function () {
        if(this.isInSchedule(this.startTime,this.endTime)){
            this.relayOn();
        }else{
            this.relayOff();
        }
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
            return true;
        } else {
            return false;
        }
    };

    this.relayOn = function () {
        this.gpioRelay.writeSync(0);
    };

    this.relayOff = function () {
        this.gpioRelay.writeSync(1);
    };

    /**
     * @param {Date} dateStart 
     * @param {Date} dateEnd 
     * @returns {bool} Return true if now is between start and end
     */
    this.isInSchedule = function(dateStart, dateEnd) {
        var now = new Date();
        now.setFullYear(1970, 1, 1);
        dateStart.setFullYear(1970, 1, 1);
        dateEnd.setFullYear(1970, 1, 1);
        if (now >= dateStart && now <= dateEnd) {
            return true;
        } else {
            return false;
        }
    }

};

