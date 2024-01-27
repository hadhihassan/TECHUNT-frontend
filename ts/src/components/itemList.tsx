import Button from "./Button";
import Items from "./types";
type itemList = {
    items : Items[];
    setItem
}
const itemList = ({ items, setItem }) => {
    const deleteTask = (data: String) => {
        setItem((prev) => prev.filter((value) => data !== value.id))
    }
    return <>
        {items.map(data => (
            <div key={data.id} className='w-full flex justify-between items-center border-slate-600 p-2 mb-2 py-3'>
                <p>{data.title}</p>
                <Button onClick={() => deleteTask(data.id)} className={" text-white font-bold rounded"}>
                    X
                </Button>
            </div>
        ))}
    </>;
}


export default itemList;
