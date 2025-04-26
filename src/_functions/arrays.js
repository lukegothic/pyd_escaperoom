export function sortBy(arr, f){
  for (var i=arr.length;i;){
    var o = arr[--i];
    arr[i] = [].concat(f.call(o,o,i),o);
  }
  arr.sort(function(a,b){
    for (var i=0,len=a.length;i<len;++i){
      if (a[i]!==b[i]) return a[i]<b[i]?-1:1;
    }
    return 0;
  });
  for (var j=arr.length;j;){
    arr[--j]=arr[j][arr[j].length-1];
  }
  return arr;
}
