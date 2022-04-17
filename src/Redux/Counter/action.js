


const ADD_COUNT = 'ADD_COUNT';
const SUB_COUNT = 'SUB_COUNT';

const addCount = (payload) =>({type : ADD_COUNT, payload});
const subCount = (payload) =>({type : SUB_COUNT, payload});

export {addCount, subCount, ADD_COUNT, SUB_COUNT}