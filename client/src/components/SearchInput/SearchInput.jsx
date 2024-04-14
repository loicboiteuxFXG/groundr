import {IoSearchSharp} from "react-icons/io5";

const SearchInput = () => {
     return (
         <div>
             <form className="search">
                 <input type="text" placeholder="Rechercher" className="form-control"/>
                 <button type="submit" className="btnSearch rounded-circle">
                     <IoSearchSharp style={{width:"100%", height:"100%"}}/>
                 </button>
             </form>
         </div>
     )
}

export default SearchInput