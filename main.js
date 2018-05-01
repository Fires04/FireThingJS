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

var fireThing = require('./firething');
//var dhtThing = require('./things/dhtOnion');
//var dumbThing = require('./things/dumbthing');
//var relayThing = require('./things/relayOnion');
var fireWeatherStation = require('./things/fireWeatherStation');
//var timedRelayThing = require('./things/timedRelayOnion');

var fireThingObj = new fireThing("fireweatherstation", {
    updateInterval: 3000,
    subscribeTopic: '/firehouse/garden/fireweatherstation/commands/',
    publishTopic: '/firehouse/garden/fireweatherstation/status/',
    publishErrorTopic: '/firehouse/garden/fireweatherstation/error/'
});

//var dumbThingObj = new dumbThing('dumb1');
//fireThingObj.addIotType(dumbThingObj);

var weatherObj = new fireWeatherStation('weather');
fireThingObj.addIotType(weatherObj);

//var dhtObj = new dhtThing('dht1');
//fireThingObj.addIotType(dhtObj);
//
//var relayObj = new relayThing('relay');
//fireThingObj.addIotType(relayObj);

fireThingObj.connect('mqtt://192.168.50.246');
