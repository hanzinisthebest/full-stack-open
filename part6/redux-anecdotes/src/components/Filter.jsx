import { setFilter } from "../reducers/filterReducer";
import { useDispatch } from "react-redux";

const Filter = () => {
    const dispatch = useDispatch();
    const handleFilter = (event) => {
        event.preventDefault();
        const filter = event.target.value;
        dispatch(setFilter(filter));
    }
    return (
        <div>
            filter <input onChange={handleFilter} />
        </div>
    )
}

export default Filter