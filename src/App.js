import './App.css';
import React, { useState } from 'react'
import img1 from './image/theme.png'
function App() {
  // States
const[income,setIncome]=useState("")
const[incomeAmount,setIncomeAmount]=useState()
const[selectValue,setSelectValue]=useState("")
const[TotalAmount,setTotalAmount]=useState(0)
const[expenseAmount,setExpenseAmount]=useState("")
const[incomeHistory,setIncomeHistory]=useState([])
const[ExpenseHistory,setExpenseHistory]=useState([])
// const[modifyButtonValue,setmodifyButtonValue]=useState(true)
const[disable,setDisable]=useState(false)

// Taking values from input using states
  const IncomeHandler=(e)=>{
    setIncome(e.target.value)
  }
  const IncomeAmountHandler=(e)=>{
    setIncomeAmount(e.target.value)
  }

  const SelectHandler=(e)=>{
    setSelectValue(e.target.value)
  }

  // calculating Total amount
  const TotalIncomeHandler=()=>{
    if( income==="" && incomeAmount==="" ){
      alert("please enter income amount and income type")
      document.getElementById("incometype").focus();
    }
    else if(income===""){
      alert("Please Enter income type")
      document.getElementById("incometype").focus();
    }
    else if(!isNaN(income)){
      alert("Amount type should be a string")
      document.getElementById("incometype").focus();
    }
    else if(incomeAmount===""){
      alert("Please Enter income Amount")
      document.getElementById("incomeAmount").focus();
    }
    else if(isNaN(incomeAmount)){
      alert("Amount should be a number")
      document.getElementById("incomeAmount").focus();
    }
    else{
      var obj={
        income:income,
        incomeAmount:incomeAmount
      }
      var incomeAmount1=Number(incomeAmount)
      // var TotalAmount1=parseInt(TotalAmount)
      console.log(typeof(incomeAmount1));
      console.log(typeof(TotalAmount));
      incomeHistory.push(obj)
      setIncomeHistory([...incomeHistory])
      console.log(parseInt(TotalAmount+incomeAmount));
      setTotalAmount(TotalAmount+incomeAmount1)
      setIncome("")
      setIncomeAmount("")
    }
    
  }
  const ExpenseInputAmount=(e)=>{
    setExpenseAmount(e.target.value)
  }
  // calculating amount after expense
  const TotalExpenseHandler=()=>{
    var incomeAmount1=parseInt(incomeAmount)
    var expenseAmount1=parseInt(expenseAmount)
    var TotalAmount1=parseInt(TotalAmount)
    if(selectValue==="" && expenseAmount==="" && income==="" && incomeAmount===""){
      alert("please enter income amount and income type First")
      document.getElementById("incometype").focus();
    }
    else if(selectValue==="" && expenseAmount===""){
      alert("please Select Expense Type and enter amount")
      document.getElementById("selectExpense").focus();
    }
    else if(selectValue===""){
      alert("please Select Expense Type ")
      document.getElementById("selectExpense").focus();
    }
    else if(expenseAmount===""){
      alert("please enter Expense amount ")
      document.getElementById("ExpenseAmount").focus();
    }
    else if(isNaN(expenseAmount)){
      alert("Amount should be a number")
      document.getElementById("ExpenseAmount").focus();
    }
    else{
      var obj={
        id:Math.random(),
        expense:selectValue,
        Amount:expenseAmount
      }
      ExpenseHistory.push(obj)
      setDisable(false)
      setExpenseHistory([...ExpenseHistory])
      setTotalAmount(TotalAmount1-expenseAmount1)
      setExpenseAmount("")
    }
  }
  // modifying expence values
  const ModifyButtonHandler=(id)=>{ 
    for (let i = 0; i < ExpenseHistory.length; i++) {
      //Disabling the edit button
      setDisable(true)
      if(id===ExpenseHistory[i].id){
        var temp=parseInt(ExpenseHistory[i].Amount)
        setTotalAmount(TotalAmount+temp)
        setExpenseAmount(ExpenseHistory[i].Amount)
        ExpenseHistory.splice(i,1)
      } 
      
      setExpenseHistory([...ExpenseHistory])     
}
  }
  const DeleteExpenseHandler=(id)=>{
    for (let i = 0; i < ExpenseHistory.length; i++) {
      if(id===ExpenseHistory[i].id){
        var temp=parseInt(ExpenseHistory[i].Amount)
        setTotalAmount(TotalAmount+temp)
        ExpenseHistory.splice(i,1)
      }
      setExpenseHistory([...ExpenseHistory])
    }
  }
  const[theame,setTheame]=useState({backgroundColor:"white"})
  const[border,setBorder]=useState({})
  const[theameButton,settheameButton]=useState(true)
  const ThemeClickHandler=()=>{
    if(theameButton===true){
      setTheame({
        backgroundColor:"#95a4b5",
        color:"black",
      })
      settheameButton(false)
    }
    else{
      setTheame({
        backgroundColor:"white",
        color:"black",
      })
      settheameButton(true)
    }
  }
  return (
    <div className="App" style={theame}>
      <img value={theameButton} className='TheameLogo' onClick={ThemeClickHandler} src={img1} alt="" />
       <h2>Expense Manager</h2>
     <p>Your total amount is:{TotalAmount}</p>
      <div className='InputDiv'> 
      <div className="IncomeDiv">
        <label htmlFor="">Income:</label><input type="text" id='incometype' value={income} onChange={IncomeHandler}/>
        <br />
        <label htmlFor="">Amount:</label><input type="text" id='incomeAmount' value={incomeAmount} onChange={IncomeAmountHandler} />
        <button className='button' onClick={TotalIncomeHandler}>Add</button>
        
        </div>
        <div className='ExpenseDiv'>
          <label htmlFor="">Expense Type</label>
          <div className='DropDown'>
        <select name="" id="selectExpense" onChange={SelectHandler}>
          <option value="">----Choose---</option>
          <option value="Grocery">Grocery</option>
          <option value="Veggies">Veggies</option>
          <option value="Travelling">Travelling </option>
          <option value="Miscellaneous">Miscellaneous</option>
        </select>
        </div>
        <label htmlFor="">Amount:</label><input type="text" value={expenseAmount} id='ExpenseAmount' onChange={ExpenseInputAmount}/>
        <button className='button' onClick={TotalExpenseHandler}>Add</button>
        </div>
        </div>
        <div className='History'>
        <div className='IncomeHistory'>
          <h2>Income History</h2>
          <table><th>income</th>{""}{"|"}<th>Amount</th>
            {incomeHistory.map((item)=>( <tr> <td>{item.income}</td>{"|"} 
            <td>{item.incomeAmount}</td></tr>))}
          </table>
        </div>
        <div className='ExpenceHistory'>
        <h2>Expense History</h2>
          <table><th>income</th>{"|"}<th>Amount</th>{""} <th>Action</th>
            {ExpenseHistory.map((item)=>( <tr> <td>{item.expense}</td>{"|"} 
            <td>{item.Amount}</td><td><button className='ModifyButton' disabled={disable}  onClick={()=>ModifyButtonHandler(item.id)}>Modify</button></td> <td><button className='ModifyButton1' onClick={()=>DeleteExpenseHandler(item.id)}>Delete</button></td></tr>))}
          </table>
        </div>
        </div>
    </div>
  );
}

export default App;
