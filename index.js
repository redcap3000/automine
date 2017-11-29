var exec =  require('child_process').exec;
const http = require("request");
const _ = require("underscore");

nowMining = false
 function percentDiff(v1,v2){
    if(isNaN(v1) || isNaN(v2)){
      return ''
    }
    var r = v1 - v2
    r = r / ((v1 + v2) / 2)
    return (!isNaN(r) ? (r * 100).toFixed(3) : '')
  }
  function percentChange(v1,v2){
  

    if(isNaN(v1) || isNaN(v2)){
      return ''
    }
    var num = v1 - v2
    return (num / v2) * 100
  }
whatToMine = function(){

 http.get('http://whattomine.com/coins.json',function(e,r,body){
        if(typeof r != 'undefined'){
                c = JSON.parse(r.body)
          c = c.coins
          //coins to watch
          var watchCoins = ['ZEC','ZEN','LBC','MONA','BTG']
          var prefilter = []
          var filtered = []
          // prefilter
          for(var l in c)  {
            prefilter.push(c[l])

          }
          watchCoins.filter(function(t){
            filtered.push(_.findWhere(prefilter,{tag : t}))
          })
          // do he difficulty percent diff
          var result = []
          filtered.filter(function(d){
            var obj = {}
            if(typeof d != 'undefined'){
              obj.symbol = d.tag
              obj.priceChange = percentChange(d.exchange_rate,d.exchange_rate24)
              obj.difficultyChange = percentChange(d.difficulty,d.difficulty24)
              obj.rewardChange = percentChange(d.estimated_rewards,d.estimated_rewards24)
              result.push(obj)
            }
          })
          result = _.sortBy(result,'difficultyChange')
          if(nowMining === false){
                console.log ('starting with ' + result[0].symbol)
                nowMining = result[0].symbol
                // create a script with <SYMBOL>.sh to intiate an action
		exec('./'+nowMining + '.sh',function(e,stdout,stderr){
                        console.log(stdout)
                })

          }else if(nowMining != result[0].symbol){
                nowMining = result[0].symbol
                console.log("SWITCHING to " + nowMining)
                // show time???
                exec('./'+nowMining + '.sh',function(e,stdout,stderr){
                        console.log(stdout)
                })
          }else{
                console.log(nowMining)
          }
        }else{
          console.log("Problem with what to mine response")
        }
      })

}
whatToMine()
setInterval(function(){
	whatToMine()
},1000* 60 * 2)
