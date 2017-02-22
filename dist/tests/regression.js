'use strict';var R=require('ramda'),_require=require('botmaster-fulfill'),fulfillOutgoingWare=_require.fulfillOutgoingWare,_require2=require('botmaster-test'),botmaster=_require2.botmaster,telegramMock=_require2.telegramMock,respond=_require2.respond,standardActions=require('../'),myActions={hi:{controller:function controller(){return'hi there!'}}},actions=R.merge(standardActions,myActions);describe('standard actions combined with custom actions',function(){var a,b;beforeEach(function(){return botmaster().then(function(c){b=telegramMock(c),a=c})}),it('should pass a complex three action test mixing sync and async',function(c){a.use('outgoing',fulfillOutgoingWare({actions:actions})),this.timeout(8000),respond(a)('<hi /><pause />hello<pause />there<pause /><greet tz="Europe/London" />'),a.on('error',function(d,e){return c(new Error('botmaster error: '+e))}),b.expect(['hi there!','hello','there','Good morning'],c).sendUpdate('hi bob',function(d){d&&c(new Error('supertest error: '+d))})}),afterEach(function(c){this.retries(4),process.nextTick(function(){b.cleanAll(),a.server.close(c)})})});