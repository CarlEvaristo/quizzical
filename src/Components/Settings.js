import React from  "react"

export default function Settings({handleClick, handleChange, settings}) {
    return(
        <>
            <h2>Game Settings</h2>
            <form onSubmit={handleClick}>
                <label htmlFor="Amount">Number of questions:</label>
                <input type="number" id="Amount" name="amount" min="1" max="20" value={settings.amount} onChange={handleChange} required></input>

                <label htmlFor="Category">Select Category:</label>
                <select 
                    id="Category"
                    value={settings.category}		//=> REACT STATE BEPAALT VALUE VAN INPUT.
                    onChange={handleChange}
                    name="category"			        //=> LET OP: NAME MOET GELIJK ZIJN AAN REACT STATE
                    required
                >
                    <option value="">-- Choose --</option>  
                    <option value="9">General Knowledge</option>
                    <option value="10">Entertainment: Books</option>
                    <option value="11">Entertainment: Film</option>
                    <option value="12">Entertainment: Music</option>
                    <option value="14">Entertainment: Television</option>
                    <option value="15">Entertainment: Video Games</option>
                    <option value="16">Entertainment: Board Games</option>
                    <option value="17">Science & Nature</option>
                    <option value="18">Science: Computers</option>
                    <option value="19">Science: Mathematics</option>
                    <option value="20">Mythology</option>
                    <option value="21">Sports</option>
                    <option value="22">Geography</option>
                    <option value="23">History</option>
                    <option value="25">Art</option>
                </select>

                <label htmlFor="Difficulty">Select Difficulty:</label>
                <select 
                    id="Difficulty"
                    value={settings.difficulty}		//=> REACT STATE BEPAALT VALUE VAN INPUT.
                    onChange={handleChange}
                    name="difficulty"			        //=> LET OP: NAME MOET GELIJK ZIJN AAN REACT STATE
                    required
                >
                    <option value="">-- Choose --</option>  
                    <option value="easy">Easy</option>        
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>


                <button className="mainBtn">Submit</button>
            </form>
        </>
    )
}
