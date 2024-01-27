


const CheckBox = ({ id, type, name, handleClick, isChecked }:any) => {
   
    return (
        <label>
            <input 
            id={id}
            type={type} 
            className="checkbox" 
            name={name} 
            checked={isChecked} 
            onChange={handleClick} />
        </label>
    );
};

export default CheckBox;