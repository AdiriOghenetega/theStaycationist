export const dayOfYear= (currentdate)=>{
  return  Math.floor((currentdate - new Date(currentdate.getFullYear(), 0, 1)) / (1000 * 60 * 60 * 24)+1);
}

