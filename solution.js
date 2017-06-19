function getEncodedObj(string, numberRails){
  var arr = [];
  var result = {};
  var tracker = 0;
  var trackerDirection = "up";
  string.split("").map(function(v){
    arr.push([tracker, v]);
    if(trackerDirection === "up"){
      if(tracker + 1 > numberRails - 1){
        tracker -= 1;
        trackerDirection = "down";
      } else if (tracker + 1 <= numberRails - 1){
        tracker += 1;
      }
    } else if (trackerDirection === "down"){
      if(tracker - 1 < 0){
        tracker += 1;
       trackerDirection = "up";
      } else if(tracker - 1 >= 0){
       tracker -= 1;
      }
    }
  })
  for(var i = 0; i < arr.length; i++){
    if(result[arr[i][0]]){
      result[arr[i][0]].push(arr[i][1])
    } else {
      result[arr[i][0]] = [arr[i][1]];
    }
  }
  return result;
}

function encodeRailFenceCipher(string, numberRails) {
  var solution = [];
  var result = getEncodedObj(string, numberRails);
  for(var key in result){
    for(var s = 0; s < result[key].length; s++){
      solution.push(result[key][s])
    }
  }
  return solution.join("");
}

function decodeRailFenceCipher(string, numberRails){
  var decoded = []
  var strModified = string.split("");
  var tracker2 = 0;
  var tracker2Direction = "up";
  var lengths = [];
  var s = [];
  var result = getEncodedObj(string, numberRails);

  for(var key in result){
    lengths.push(result[key].length)
  }
  for(var t = 0; t < lengths.length; t++){
    s.push(strModified.splice(0, lengths[t]));
  }
  while(s.join("").length !== 0){
    decoded.push(s[tracker2][0]);
    s[tracker2].shift();
    if(tracker2Direction === "up"){
      if(tracker2 + 1 > s.length - 1){
        tracker2--;
        tracker2Direction = "down"
      } else if(tracker2 + 1 <= s.length - 1){
        tracker2++;
      }
    } else if(tracker2Direction === "down"){
      if(tracker2 - 1 < 0){
        tracker2++;
        tracker2Direction = "up"
      } else if(tracker2 - 1 >= 0){
        tracker2--;
      }
    }
  }
  return decoded.join("");
}
