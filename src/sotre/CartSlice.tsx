import { createSlice } from "@reduxjs/toolkit";
 
//hadi management state redux ta5dem nafs lkhedma ta reducer w contex bah net7akmou f state mn blasa wa7da brk 
const cartSlice= createSlice({
    name:"cart",
    initialState:{
        authUser:{},
        allProduct:[],
        store:[],
        total:Number,
        payment:[],
        prod:{},
        product:[]
        
      
          
    },
    reducers:{ // add w remove edouma houwa 7wayj habina hna n'apliqiwhm f state bah yakhjdmoulna khedma 7abina tsema 7na li dernehm 
       setAuthUser:(state,action)=>{
        state.authUser=action.payload
       },
       setAllProduct:(state,action)=>{
        state.allProduct=action.payload
       },
       setStore:(state,action)=>{
        state.store=action.payload
       },
       setTotal:(state,action)=>{
        state.total=action.payload
       },
       setPayment:(state,action)=>{
        state.payment=action.payload
       },
       setProd:(state,action)=>{
        state.prod=action.payload
       },
       setProduct:(state,action)=>{
        state.product=action.payload
       },

    }
})

export const {setAllProduct , setAuthUser,setStore,setTotal,setPayment,setProd,setProduct }=cartSlice.actions;
export const cartReducer = cartSlice.reducer;