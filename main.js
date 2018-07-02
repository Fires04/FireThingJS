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
/**
* Include required thing types
*/
var fireThing = require('./firething');
var dhtThing = require('./things/dhtOnion');
var timedRelayThing = require('./things/timedRelayOnion');
var dumbthing = require('./things/dumbthing');

/**
* Default values and topics
* fireThing(IDENTITY,[OPTIONS])
*/
var fireThingObj = new fireThing("fireplantbox", {
    updateInterval: 7000,
    subscribeTopic: '/firehouse/fireplantbox/commands/',
    publishTopic: '/firehouse/fireplantbox/status/',
    publishErrorTopic: '/firehouse/fireplantbox/error/'
});

/**
* Prepare object and insert things = functionality
*/
var dumbObj = new dumbthing('dumb1');
fireThingObj.addIotType(dumbObj);

/**
* Connect to MQTT server and start FireThingJs
*/
fireThingObj.connect('mqtt://192.168.50.4');
